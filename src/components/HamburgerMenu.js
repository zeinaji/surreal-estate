import React from "react";
import { Link } from "react-router-dom";
import "../styles/HamburgerMenu.css";

const HamburgerMenu = () => {
  const removeMenu = () => {
    const checkBoxElement = (document.querySelector(
      ".toggler"
    ).checked = false);
  };
  return (
    <>
      <div className="menu-wrap">
        <input type="checkbox" className="toggler" />
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu">
          <div>
            <div>
              <ul>
                <li>
                  <Link to="/" onClick={removeMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/view-properties" onClick={removeMenu}>
                    View Properties
                  </Link>
                </li>
                <li>
                  <Link to="/add-property" onClick={removeMenu}>
                    Add Property
                  </Link>
                </li>
                <li>
                  <Link to="/saved-properties" onClick={removeMenu}>
                    Saved Properties
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/*} <header class="showcase">
        <div class="container showcase-inner">
          <h1>Welcome</h1>
          <p>Lorem ipsum dolor sit amet consecteteur</p>
          <a href="#" class="btn">
            Read More
          </a>
        </div>
  </header> */}
    </>
  );
};

export default HamburgerMenu;
