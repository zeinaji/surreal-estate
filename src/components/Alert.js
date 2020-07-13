import React from "react";
import PropTypes from "prop-types";
import "../styles/Alert.css";

const Alert = ({ message, success }) => {
  return (
    <div className={`alert ${success ? "success" : "fail"}`}>{message}</div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
};

Alert.defaultProps = {
  success: false,
};

export default Alert;
