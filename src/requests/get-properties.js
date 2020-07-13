import axios from "axios";

const getProperties = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/PropertyListing"
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default getProperties;
