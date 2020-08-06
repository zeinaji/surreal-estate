import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    /* <div className="home-page">
      <div className="welcome">
        <p>Welcome to Surreal Estate. Please login to save properties</p>
      </div>
  </div>*/
    <header class="showcase">
      <div class="container showcase-inner">
        <h1>Welcome</h1>
        <p>Make sure you login to save properties!</p>
        <Link class="btn" to="/view-properties">
          Properties
        </Link>
      </div>
    </header>
  );
};

export default Home;
