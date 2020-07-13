import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import getProperties from "../requests/get-properties";
import "../styles/properties.css";

const Properties = () => {
  const initialState = {
    properties: [],
    message: "",
  };
  const [message, setMessage] = useState(initialState.message);
  const [properties, setProperties] = useState([initialState.properties]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProperties();
      if (response.status === 200) {
        setProperties(response.data);
      } else {
        setMessage("This has not been successful");
      }
    };
    fetchData();
  }, []);

  if (!message) {
    return (
      <div className="properties">
        {properties.map((property) => (
          <PropertyCard key={parseInt(property._id)} {...property} />
        ))}
      </div>
    );
  } else {
    return <Alert message={message} success={false} />;
  }
};

export default Properties;
