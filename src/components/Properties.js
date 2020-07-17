import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import getProperties from "../requests/get-properties";
import "../styles/properties.css";

const Properties = () => {
  const initialState = {
    properties: [],
    message: "",
    location: "",
  };
  const [message, setMessage] = useState(initialState.message);
  const [properties, setProperties] = useState([initialState.properties]);

  const location = useLocation();

  useEffect(() => {
    const { search } = location;

    const fetchData = async () => {
      const response = await getProperties(search);
      if (response.status === 200) {
        setProperties(response.data);
      } else {
        setMessage("This has not been successful");
      }
    };
    fetchData();
  }, [location]);

  if (!message) {
    return (
      <div className="properties">
        <SideBar />
        <div className="properties-list">
          {properties.map((property) => (
            <PropertyCard key={properties.indexOf(property)} {...property} />
          ))}
        </div>
      </div>
    );
  } else {
    return <Alert message={message} success={false} />;
  }
};

export default Properties;
