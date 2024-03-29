import axios from 'axios';
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input);
      console.log(rs);
      if (rs.status === 200) {
        alert('Register Successful');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 bg-gray-200" style={{ backgroundImage: `url('')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="text-3xl mb-5 text-center">D-Trip online Trip</div>
        <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
          <label className="form-control">
            <div className="label">
              <span className="label-text"></span>
            </div>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered input-small"           
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text"></span>
            </div>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered input-small" 
              name="email"
              value={input.email}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text"></span>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-small" 
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text"></span>
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered input-small" 
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
            />
          </label>
          <div className="flex justify-center gap-5">
            <button type="submit" className="btn btn-outline btn-info">Submit</button>
            <button type="reset" className="btn btn-outline btn-warning">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
