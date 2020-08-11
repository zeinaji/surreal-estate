import axios from "axios";

const removeProperties = (favouriteId) => {
  axios
    .delete(
      `https://surreal-estate1.herokuapp.com/api/v1/Favourite/${favouriteId}/?populate=propertyListing`
    )

    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default removeProperties;
