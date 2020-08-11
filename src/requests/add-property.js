import axios from "axios";

const postProperty = async (property) => {
  try {
    const response = await axios.post(
      "https://surreal-estate1.herokuapp.com/api/v1/PropertyListing",
      property
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export default postProperty;
