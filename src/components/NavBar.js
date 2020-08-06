import React from "react";
import "../styles/NavBar.css";
import logo from "../house.png";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import HamburgerMenu from "./HamburgerMenu";

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
      <nav className="navbar">
        <div>
          <HamburgerMenu />
          <div className="without-menu">
            <img className="logo" src={logo} alt="logo" />
            <ul className="navbar-links">
              <Link className="navabar-links-item surreal-estate" to="/">
                Surreal Estate
              </Link>
              {/*<Link className="navabar-links-item" to="/">
            View Properties
          </Link>
          <Link className="navabar-links-item" to="/add-property">
            Add a Property
          </Link>
          <Link className="nabvar-links-item" to="/saved-properties">
            Saved Properties
  </Link>*/}
              <li id="facebook-login" style={{ borderRadius: "5px" }}>
                {facebookButton}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
