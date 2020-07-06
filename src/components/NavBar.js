import React from "react";
import "../styles/NavBar.css";
import logo from "../property.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="wrapper">
        <nav className="navbar">
          <img className="logo" src={logo} alt="logo" />
          <ul className="navbar-links">
            <li className="navabar-links-item surreal-estate">
              Surreal Estate
            </li>
            <Link className="navabar-links-item" to="/">
              View Properties
            </Link>
            <Link className="navabar-links-item" to="/add-property">
              Add a Property
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
