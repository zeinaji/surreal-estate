import axios from "axios";

const postProperty = async (property) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/PropertyListing",
      property
    );
    return response.status;
  } catch (err) {
    console.log(err.response.status);
    return err.response.status;
  }
};

export default postProperty;
