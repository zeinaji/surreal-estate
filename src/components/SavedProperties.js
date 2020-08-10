import React, { useState, useEffect } from "react";
import getSaved from "../requests/get-saved";
import removeProperties from "../requests/remove-properties";
import "../styles/SavedProperties.css";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";

const SavedProperties = ({ userID, onLogout, onLogin }) => {
  const facebookButton = userID ? (
    <button onClick={onLogout} className="sign-out-saved">
      Sign Out
    </button>
  ) : (
    <FacebookLogin
      callback={onLogin}
      appId="593615441355063"
      cssClass="facebook-saved"
    />
  );

  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userID);
        const response = await getSaved(userID);
        setFavourites(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [favourites]);

  const handleRemove = async (favouriteId) => {
    await removeProperties(favouriteId);
  };

  return (
    <div className="saved-properties">
      {!userID && (
        <div className="login">
          <h1>Login to view saved Properties</h1>
          {facebookButton}
        </div>
      )}
      {userID && !favourites.length && (
        <div
          className="noFavs"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              alignSelf: "center",
              color: "white",
              textAlign: "center",
              width: "100%",
            }}
          >
            There are currently no saved properties!
          </h1>
          <Link
            class="btn"
            to="/view-properties"
            style={{ alignSelf: "center", border: "none" }}
          >
            Properties
          </Link>
        </div>
      )}
      {userID && favourites.length > 0 && (
        <div className="favourite-list">
          {favourites.map((favourite) => (
            <div className="favourite" key={favourites.indexOf(favourite)}>
              <p>{favourite.propertyListing.title}</p>
              <button
                onClick={() => handleRemove(favourite._id)}
                className="remove"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;
