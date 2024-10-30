import React from "react";
import { Modal } from "react-bootstrap";

const PromoModal = ({ show, handleClose, promo }) => {
  if (!promo) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{promo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={promo.image} alt={promo.title} className="w-full rounded mb-3" />
        <p>{promo.description}</p>
      </Modal.Body>
    </Modal>
  );
};

export default PromoModal;
