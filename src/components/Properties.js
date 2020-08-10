import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import getProperties from "../requests/get-properties";
import postFavourite from "../requests/post-fav";
import removeProperties from "../requests/remove-properties";
import "../styles/properties.css";
import axios from "axios";

const Properties = ({ userID }) => {
  const initialState = {
    properties: [],
    message: "",
    location: "",
    loading: false,
  };
  const [loading, setLoading] = useState(initialState.loading);
  const [message, setMessage] = useState(initialState.message);
  const [properties, setProperties] = useState([initialState.properties]);

  const location = useLocation();

  useEffect(() => {
    const { search } = location;
    setLoading(true);
    const fetchData = async () => {
      const response = await getProperties(search);
      if (response.status === 200) {
        setProperties(response.data);
        setLoading(false);
      } else {
        setMessage("There has been an error, please try again later!");
      }
    };
    fetchData();
  }, [location]);

  const handleSaveProperty = async (propertyId) => {
    const response = await postFavourite(propertyId, userID);
  };

  const handleRemoveProperty = async (propertyId) => {
    try {
      console.log(propertyId);
      const res = await axios({
        method: "DELETE",
        url: `http://localhost:4000/api/v1/Favourite/?query={"propertyListing":"${propertyId}"}`,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    /*axios
      .delete(`http://localhost:4000/api/v1/Favourite`, {
        data: {
          propertyListing: "5f0c413b4c997d1b3836a4a1",
          fbUserId: "10223452074595770",
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => console.log(error));*/
  };
  if (!message) {
    return (
      <div className="properties">
        <SideBar />
        {loading && <div className="loading">Loading...</div>}

        {!loading && (
          <>
            <div className="properties-list">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  {...property}
                  fbUserId={userID}
                  onSave={handleSaveProperty}
                  onRemove={handleRemoveProperty}
                />
              ))}
            </div>
          </>
        )}
        <div
          className="footer"
          style={{
            backgroundColor: "rgb(139, 192, 185, 0.2)",
            height: "100px",
            width: "98.5%",
            position: "absolute",
            color: "rgb(53, 175, 212)",
            bottom: "0px",
            right: "10px",
            left: "10px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <p style={{ marginRight: "3px" }}>Icons made by</p>
          <a
            style={{ color: "rgb(53, 175, 212)" }}
            href="https://www.flaticon.com/authors/kiranshastry"
            title="Kiranshastry"
          >
            Kiranshastry
          </a>
          <p style={{ marginRight: "3px" }}>from</p>
          <a
            style={{ color: "rgb(53, 175, 212)" }}
            href="https://www.flaticon.com/"
            title="Flaticon"
          >
            {" "}
            www.flaticon.com
          </a>
        </div>
      </div>
    );
  } else {
    return <h1 className="error-message">{message}</h1>;
  }
};

export default Properties;
