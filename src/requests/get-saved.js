import axios from "axios";

const getSaved = async (userID) => {
  try {
    const response = await axios.get(
      `https://surreal-estate1.herokuapp.com/api/v1/Favourite?query={"fbUserId":${userID}}&populate=propertyListing`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export default getSaved;
