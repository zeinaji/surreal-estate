import axios from "axios";

const postFavourite = async (propertyId, userID) => {
  try {
    const response = await axios.post(
      "https://surreal-estate1.herokuapp.com/api/v1/Favourite",
      {
        propertyListing: propertyId,
        fbUserId: userID,
      }
    );
    return response;
  } catch (err) {
    return err.response.status;
  }
};

export default postFavourite;
