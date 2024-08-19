import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from './utils/fetch-request';
import {getFromLocalStorage} from './utils/local-storage'; 
import { Context } from "../context/store"
import "../App.css";

import BodyLogin from './header/mobile-login';



const LoginModal = (props) => {
    const user = getFromLocalStorage("user");
    const app_name = "desktop-web";
    const [state, dispatch] = useContext(Context);

    return (
        <>
            <Modal
            show={state?.showloginmodal === true}
            onHide={() => dispatch({type:"SET", key:"showloginmodal", payload:false})}
            dialogClassName="modal-90w popover-login-modal"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="primary-bg">
                      <Modal.Title>BIKO SPORTS LOGIN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BodyLogin />
                    </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal;
