import React, {useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Context} from '../../context/store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const HeaderLogin = (props) => {
    const [, dispatch] = useContext(Context)

   

    // an independent function that runs every 1 minute to check for user session
    // and request a refresh. However, currently, we are just requesting a relogin
    
    const MyLoginForm = (props) => {
       
        return (
            <>
                <div className="header">
                    <div className='onboard float-end'>
                        <button className="e font-black mr-4 top-login-btn btn" onClick={() => dispatch({type:"SET", key:"showloginmodal", payload:true})}>Login</button>
                        <Link className="top-login-btn btn yellow-btn ml-3" to="/signup" title="Join now" style={{ fontSize: "13px", fontWeight: "bold"}}>
                            <span className="register-labl uppercase">Register</span>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    const LoginForm = (props) => {
        return (
             <MyLoginForm />
        );
    }

    return (
        <Container className="top-login-section">
        {/* <Row className="" style={{float: "right"}}>
                <div className="col-12">
                    <a className="" href="/signup" title="Join now">
                        <span className="register-label">Register now!</span>
                    </a>
                    <a className="m-lg-2 badge bg-success" href="/verify-account" title="Verify Account">
                        <span className="register-label">Verify Account</span>
                    </a>
                </div>
            </Row> */}
            <Row style={{marginBottom:"10px"}}>                
                    <ToastContainer/>                   
                    <LoginForm/>
                    
            </Row>
        </Container>
    )
}
export default React.memo(HeaderLogin);
