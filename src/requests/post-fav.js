import axios from "axios";

const postFavourite = async (propertyId, userID) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/Favourite",
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
