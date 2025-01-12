import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { BACKEND_URL } from '../config';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  let navigate = useNavigate();
  const handelsubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      let response = await axios.post(`${BACKEND_URL}user/signup`, {
        username: username,
        password: password
      });
      console.log(response);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      if (response.status == 201) {
        navigate('/');
      }
      setloading(false)
    } catch (err) {
      console.log(err);
      setloading(false);
      alert("please enter correct fields");
    }
  }


  // <div className='d-flex justify-content-center align-items-center vh-100'>
  //     <Spinner />
  // </div>

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">SignUp</h2>
              <p>
                <Link to={"/login"}>Already have an account ? Lets Login</Link>
              </p>
              <form onSubmit={handelsubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    {loading ? <Spinner /> : "SignUp"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
