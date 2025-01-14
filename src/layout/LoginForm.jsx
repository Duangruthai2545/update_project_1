import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username : '', 
    password : ''
  });

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post('http://localhost:8889/auth/login', input);
      console.log(rs.data.token);
      localStorage.setItem('token', rs.data.token);
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      });
      console.log(rs1.data);
      setUser(rs1.data);
      
    } catch(err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 bg-blue-100">
        <div className="text-center">
          <div className="text-3xl mb-5">D-Trip</div>
          <div className="text-3xl mb-5">online Trip</div>
        </div>

        <form className="flex flex-col gap-2 justify-center items-center" onSubmit={hdlSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text"></span>
            </div>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered w-full max-w-xs"
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text"></span>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-outline btn-info mt-7">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
