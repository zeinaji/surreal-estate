import axios from "axios";

const removeProperties = (favouriteId) => {
  axios
    .delete(
      `http://localhost:4000/api/v1/Favourite/${favouriteId}/?populate=propertyListing`
    )

    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default removeProperties;
