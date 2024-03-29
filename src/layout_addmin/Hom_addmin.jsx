import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WareHouseEdit from "../components/WareHouseEdit";
import WareHouseCard from "../components/WareHouseCard_addmin";

export default function UserHome() {
  const [house, setHouse] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8889/ware", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHouse(rs.data.ware);
    };
    run();
  }, [trigger]);

  const openModal = (id) => {
    let idx = house.findIndex((el) => el.id === id);
    setEditIdx(idx);
    document.getElementById("my_modal_2").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_2").close();
  };

  return (
    <div className="bg-gray-blue-100"> 
      <div className="flex justify-between items-center mb-4">
        <div className="text-center text-3px ml-40 text- font-bold flex-grow">
          D-Trip onlineTrip
        </div>
        <div className="mr-2">
          <Link to="/new">
            {/* <button className="btn bg-green-500 hover:bg-green-600 border-none text-white pl-16 pr-16 mt-2">
              เพิ่มภูมิภาค
            </button> */}
          </Link>
        </div>
      </div>
      <div className=" ">
        <WareHouseEdit
          el={house[editIdx]}
          closeModal={closeModal}
          setTrigger={setTrigger}
        />
        <div className="grid grid-cols-3 gap-3">
          {house.map((el) => (
            <WareHouseCard
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
