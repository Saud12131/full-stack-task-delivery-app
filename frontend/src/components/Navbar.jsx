import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // For toggling navbar
  let navigate = useNavigate();
  let token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `${BACKEND_URL}Menu/searchitem?name=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          navigate(`/search?name=${searchQuery}`);
        }
      } catch (err) {
        console.log("Search failed", err);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light mb-3 mt-2 fw-bold border rounded p-2">
      <div className="container">
        <a className="navbar-brand" href="/">Share a Bite</a>

        {/* Toggler for collapsing navbar */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Search */}
        <div className={`collapse navbar-collapse ${isNavCollapsed ? 'collapse' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/myorders">My Orders</a>
            </li>
            {token && (
              <li className="nav-item">
                <a className="nav-link" href="/createitem">Create Item</a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/cart">My Cart</a>
            </li>
            {!token && (
              <li className="nav-item">
                <button className="btn btn-outline-primary me-2 fw-bold" onClick={() => navigate("/login")}>
                  Login
                </button>
              </li>
            )}
            {token ? (
              <li className="nav-item">
                <button className="btn btn-danger fw-bold" onClick={logout}>
                  LogOut
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-primary fw-bold" onClick={() => navigate("/signup")}>
                  Sign Up
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Search Input */}
        <form className="d-flex ms-lg-3 mt-3 mt-lg-0" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish..."
            style={{
              backgroundColor: 'transparent',
              borderRadius: '8px',
              border: '1px solid #ccc',
              padding: '8px 12px',
              width: '200px',
              textAlign: 'center',
            }}
          />
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center justify-content-center"
            style={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              padding: 0,
            }}
          >
            <Search size={20} className="text-white" />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
