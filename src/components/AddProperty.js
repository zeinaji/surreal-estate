import React, { useState } from "react";
import "../styles/AddProperty.css";

import addProperty from "../requests/add-property";
import Alert from "./Alert";

const AddProperty = () => {
  const initialState = {
    fields: {
      title: "",
      city: "Manchester",
      type: "Flat",
      bedrooms: 0,
      bathrooms: 0,
      price: 0,
      email: "",
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };

  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

  const handleAddProperty = async (event) => {
    event.preventDefault();
    const response = await addProperty(fields);
    if (response.status === 201) {
      setAlert({ message: "Property added successfully", isSuccess: true });
    } else {
      setAlert({
        message: "There has been an error, please try again late!",
        isSuccess: false,
      });
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    if (name === "price") {
      setFields({ ...fields, [name]: parseInt(value) });
    } else {
      setFields({ ...fields, [name]: value });
    }
    console.log(typeof fields.price);
  };
  return (
    <div className="add-property">
      {alert.message && (
        <Alert message={alert.message} success={alert.isSuccess} />
      )}
      <form onSubmit={handleAddProperty} className="add-form">
        <label>
          Title:
          <input
            id="title"
            // type="text"
            name="title"
            placeholder="Title"
            required
            value={fields.title}
            onChange={handleFieldChange}
          />
        </label>

        <label>
          Type:
          <select
            className="select-css"
            id="type"
            name="type"
            value={fields.type}
            onChange={handleFieldChange}
          >
            <option>Flat</option>
            <option>Detached</option>
            <option>Semi-Detached</option>
            <option>Terraced</option>
            <option>End of Terrace</option>
            <option>Cottage</option>
            <option>Bungalow</option>
          </select>
        </label>

        <label>
          Bedrooms:
          <input
            id="bedrooms"
            // type="number"
            name="bedrooms"
            placeholder="Bedrooms number"
            required
            value={fields.bedrooms}
            onChange={handleFieldChange}
          />
        </label>

        <label>
          Bathrooms:
          <input
            id="bathrooms"
            name="bathrooms"
            //type="number"
            placeholder="Bathrooms number"
            required
            value={fields.bathrooms}
            onChange={handleFieldChange}
          />
        </label>

        <label>
          Price: £
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            // required
            // min="0"
            // step="1"
            value={fields.price}
            onChange={handleFieldChange}
          />
        </label>

        <label>
          City
          <select
            className="select-css"
            id="city"
            name="city"
            value={fields.city}
            onChange={handleFieldChange}
          >
            <option>Manchester</option>
            <option>Leeds</option>
            <option>Sheffield</option>
            <option>Liverpool</option>
          </select>
        </label>

        <label>
          Email:
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@hotmail.com"
            required
            value={fields.email}
            onChange={handleFieldChange}
          />
        </label>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
