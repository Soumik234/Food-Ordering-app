import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  const styles = {
    color: "white",
    textAlign: "center",
    margin: "50px",
  };

  return (
    <>
      <h1 style={styles}>
        Thank you for your purchase!
        <br></br>
        <Link to="/">Return to Home Page</Link>
      </h1>
    </>
  );
};

export default Success;
