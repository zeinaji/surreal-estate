import React, { useState } from "react";
import "../styles/AddProperty.css";

const AddProperty = () => {
  const initialState = {
    fields: {
      title: "",
      city: "Manchester",
      type: "Flat",
      bedrooms: "",
      bathrooms: "",
      price: "",
      email: "",
    },
  };

  const [fields, setFields] = useState(initialState.fields);

  const handleAddProperty = (event) => {
    event.preventDefault();
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };
  return (
    <div className="add-property">
      <form onSubmit={handleAddProperty}>
        <label>
          Title:
          <input
            id-="title"
            type="text"
            name="title"
            placeholder="Title"
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
            <option value="flat">Flat</option>
            <option value="detached">Detached</option>
            <option value="semi-detached">Semi-Detached</option>
            <option value="terraced">Terraced</option>
            <option value="end-of-terrace">End of Terrace</option>
            <option value="cottage">Cottage</option>
            <option value="bungalow">Bungalow</option>
          </select>
        </label>

        <label>
          Bedrooms:
          <input
            id-="bedrooms"
            type="number"
            name="bedrooms"
            placeholder="Bedrooms number"
            value={fields.bedrooms}
            onChange={handleFieldChange}
          />
        </label>

        <label>
          Bathrooms:
          <input
            id-="bathrooms"
            name="bathrooms"
            type="number"
            placeholder="Bathrooms number"
            value={fields.bathrooms}
            onChange={handleFieldChange}
          />
        </label>

        <label>
          Price: £
          <input
            id-="price"
            name="price"
            type="number"
            placeholder="Price"
            min="0.01"
            step="0.01"
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
            <option value="manchester">Manchester</option>
            <option value="leeds">Leeds</option>
            <option value="sheffield">Sheffield</option>
            <option value="liverpool">Liverpool</option>
          </select>
        </label>

        <label>
          Email:
          <input
            id-="email"
            name="email"
            type="email"
            placeholder="example@hotmail.com"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProperty;
