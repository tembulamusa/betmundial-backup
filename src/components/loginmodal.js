import React, {useContext, useEffect} from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../context/store"
import "../App.css";
import BodyLogin from './header/mobile-login';



const LoginModal = (props) => {
    
    const [state, dispatch] = useContext(Context);
    
    return (
        <>
            <Modal
            show={state?.showloginmodal === true}
            onHide={() => dispatch({type:"SET", key:"showloginmodal", payload:false})}
            dialog className="popover-login-modal"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="no-header">
                      <Modal.Title>LOGIN IN TO SUREBET</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-0">
                        <BodyLogin />
                    </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal;
