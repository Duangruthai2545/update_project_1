import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductEdit from "../components/ProductEdit";

export default function ProductHome(props) {
  const [product, setProduct] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);
  const [el, setEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const elString = localStorage.getItem("el");
    if (elString) {
      const el = JSON.parse(elString);
      setEl(el);
    }
  }, []);

  useEffect(() => {
    if (el) {
      const run = async () => {
        try {
          let token = localStorage.getItem("token");
          const rs = await axios.get(
            `http://localhost:8889/product/?WarehouseId=${el.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setProduct(rs.data.products);
        } catch (error) {
          console.error(error);
        }
      };
      run();
    }
  }, [trigger, el]);

  const openModal = (id) => {
    let idx = product.findIndex((el) => el.id === id);
    setEditIdx(idx);
    document.getElementById("my_modal_2").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_2").close();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = product.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="ml-2">
          <button className="btn bg-yellow-400 hover:bg-yellow-600 border-none btn-info pl-2 pr-2 mt-2">
        ย้อนกลับ
          </button>
        </Link>
        <div className="flex flex-1 justify-center">
          <div className=" text-2px mt-2 text-blue border-none font-bold ml-2">
          
          </div>
        </div>
        <div className="flex justify-end mr-2">
          <div className="flex justify-between items-center w-96">
            <input
              type="text"
              
              placeholder="  ค้นหาสถานที่"
              className="border border-blue-100 rounded-md px-2 py-3 mr-2 mt-2"
              value={searchTerm}
              onChange={handleSearch}
              
            />
            <Link
              to={{
                pathname: "/addproduct",
                search: `?productId=${el ? el.id : ""}&warehouseId=${
                  el ? el.id : ""
                }`,
              }}
              className="text-blue-900 hover:underline"
            >
              {/* <button className="btn bg-green-500 hover:bg-green-600 text-white btn-info pl-16 pr-16 mt-2">
             เพิ่มสถานที่
              </button> */}
            </Link>
          </div>
        </div>
      </div>
      <div className="ml-auto mr-auto p-8 min-h-[36rem] shadow-2xl rounded-xl bg-slate-100 w-[90%]">
        <ProductEdit
          el={product[editIdx]}
          closeModal={closeModal}
          setTrigger={setTrigger}
        />
        <div className="grid grid-cols-3 gap-3">
          {filteredProducts &&
            filteredProducts.map((el) => (
              <ProductCard
                key={el.id}
                el={el}
                openModal={openModal}
                setTrigger={setTrigger}
              />
              
            ))}
        </div>
        
      </div>
    </div>
  );
}
