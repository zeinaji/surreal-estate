import axios from "axios";

const getProperties = async (city) => {
  try {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const response = await axios.get(
      `http://localhost:4000/api/v1/PropertyListing/${city}`,
      { cancelToken: source.token }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export default getProperties;
