import React from "react";
import { Modal } from "react-bootstrap";

import comingsoon from '../../../assets/img/general-website/coming-soon.avif';

const ComingSoon = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Coming Soon! Stay tuned to experience it.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img 
          src={comingsoon} 
          alt="Coming Soon" 
          className="w-full max-h-96 rounded mb-3 object-cover" 
        />
      </Modal.Body>
    </Modal>
  );
};

export default ComingSoon;
