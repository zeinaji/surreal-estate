import React, { useState, useEffect } from "react";
import "../styles/PropertyCard.css";
import logo from "../house.png";
import getSaved from "../requests/get-saved";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
const faStarSolid = require("@fortawesome/free-solid-svg-icons/faStar");
const faStarReg = require("@fortawesome/free-regular-svg-icons/faStar");

const PropertyCard = ({
  _id,
  title,
  type,
  bathrooms,
  bedrooms,
  price,
  city,
  email,
  fbUserId,
  onSave,
  onRemove,
}) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSaved(fbUserId);

        if (response.status === 200) {
          const isSaved = response.data.some(
            (property) => _id === property.propertyListing._id
          );

          if (isSaved) {
            setSaved(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [saved]);

  return (
    <div className="property-card">
      <img className="logo" src={logo} alt="logo" />
      <div className="title">{title}</div>
      <div className="type-city">{`${type} - ${city}`}</div>
      <div className="bathrooms">
        <FontAwesomeIcon icon={faBath} />
        {bathrooms}
      </div>
      <div className="bedrooms">
        <FontAwesomeIcon icon={faBed} />
        {bedrooms}
      </div>
      <div className="price">{`£${price}`}</div>

      <div className="email">
        <a className="email-link" href={`mailto:${email}`}>
          <FontAwesomeIcon className="envelope" icon={faEnvelope} />
          Email
        </a>
      </div>
      {fbUserId && !saved && (
        <a
          className="favourite-link"
          href="#"
          onClick={() => {
            onSave(_id);
            setSaved(true);
          }}
        >
          <FontAwesomeIcon className="star" icon={faStarReg.faStar} /> Save
        </a>
      )}
      {fbUserId && saved && (
        <a
          className="favourite-link"
          href="#"
          onClick={() => {
            onRemove(_id);
            setSaved(false);
          }}
        >
          <FontAwesomeIcon className="star" icon={faStarSolid.faStar} /> Saved
        </a>
      )}
    </div>
  );
};

export default PropertyCard;
