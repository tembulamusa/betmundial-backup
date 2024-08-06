import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars } from "react-icons/fa";


function MobileMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <span class="inline-block">
      
      <FaBars variant="toggle-menu" size={25} onClick={handleShow} className='inline-block'/>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h1>obile Menu is</h1>
        </Offcanvas.Body>
      </Offcanvas>
    </span>
  );
}

export default MobileMenu;