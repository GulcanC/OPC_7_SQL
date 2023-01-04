import React from "react";

import SpinnerReact from "react-bootstrap/Spinner";

const Spinner = ({ spinnerType }) => {
  return (
    <SpinnerReact
      animation="grow"
      variant="info"
      role="status"
      aria-hidden="true"
      size={spinnerType === "button" && "sm"}
      className={`mx-auto ${spinnerType !== "button" && "my-5"}`}
    >
      <span className="visually-hidden">Loading ...</span>
    </SpinnerReact>
  );
};

export default Spinner;
