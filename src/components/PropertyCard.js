import React from "react";
import "../styles/PropertyCard.css";
import logo from "../property.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const PropertyCard = ({
  title,
  type,
  bathrooms,
  bedrooms,
  price,
  city,
  email,
}) => {
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

      {/* <form method="post" action={`mailto:${email}`}>
        <input type="submit" value={logo} />
  </form> */}
    </div>
  );
};

export default PropertyCard;
