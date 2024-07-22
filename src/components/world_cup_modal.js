import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import worldcup from '../assets/img/world_cup.png'
import {LazyLoadImage} from 'react-lazy-load-image-component';


const WorldCupModal = (props) => {
    const [show, setShow] = useState(true);
    return (
        <>
            <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w world-cup-ad"
            aria-labelledby="contained-modal-title-vcenter">
                <a href="/competition/79/8085/18585">
                    <Modal.Body>
                        <LazyLoadImage
                            className="d-block w-100"
                            src={worldcup}
                            alt="majesticbet" />
                        
                    </Modal.Body>
                </a>
            </Modal>
        </>
    )
}

export default WorldCupModal
