import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import logo from './logo.png';

const Navbar = () => {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success('You are logged out');
    navigate('/login');
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#ffffff' }}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="home-pic" style={{ width: '219px', height: '70px' }} />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="user-actions">
                <p className="user_name">{loginUser && loginUser.name}</p>
                <button className="btn log_btn btn-success" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
