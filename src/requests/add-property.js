import axios from "axios";

const postProperty = async (property) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/PropertyListing",
      property
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export default postProperty;
