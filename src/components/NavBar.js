import React from "react";
import "../styles/NavBar.css";
import logo from "../property.png";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

function NavBar({ onLogin, userID, onLogout }) {
  const facebookButton = userID ? (
    <button onClick={onLogout} className="sign-out">
      Sign Out
    </button>
  ) : (
    <FacebookLogin callback={onLogin} appId="593615441355063" />
  );
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
            <li className="facebook-login">{facebookButton}</li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
