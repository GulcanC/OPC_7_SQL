//  react bootstrap modal

import React from "react";
import { useState, useEffect } from "react";
// import react bootstrap modal component
import Modal from "react-bootstrap/Modal";

const TokenModal = ({ setToken }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    !show && setToken(false);
  }, [setToken, show]);
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Your session has expired</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please log in again!</Modal.Body>
    </Modal>
  );
};

export default TokenModal;
