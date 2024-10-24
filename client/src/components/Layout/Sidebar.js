import React from "react";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="sidebar">
      <nav className="navbar navbar-light">
        <ul className="sidebar-nav">
          <li><NavLink className="nav-link" aria-current="page" to="/" style={{marginBottom:"19px"}}> DashBoard</NavLink></li>
          
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Resume Building
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><NavLink className="dropdown-item" style={{ backgroundColor: "#495057", color: "white", marginBottom: "15px" }} to="/register">Build Resume</NavLink></li>
              <li><NavLink className="dropdown-item" style={{ backgroundColor: "#495057", color: "white", marginBottom: "15px" }} to="/generate">Cover Letter</NavLink></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Productivity
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><NavLink className="dropdown-item" style={{ backgroundColor: "#495057", color: "white", marginBottom: "15px" }} to="/plans">Task Planner</NavLink></li>
              <li><NavLink className="dropdown-item" style={{ backgroundColor: "#495057", color: "white", marginBottom: "15px" }} to="/note">Rental Management</NavLink></li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/starter">About Us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/connect">Contact us</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
