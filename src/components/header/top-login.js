import React, {useContext, useState} from 'react'
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
        const [isFocused, setIsFocused] = useState(false); 
       
        return (
            <>
                <div className="header">
                    <div className="onboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            onFocus={() => setIsFocused(true)} 
                            onBlur={() => setIsFocused(false)} 
                            style={{ 
                                padding: '5px 30px 5px 10px', 
                                borderRadius: '5px', 
                                border: '1px solid #ccc', 
                                backgroundColor: isFocused ? '#fff' : 'transparent', 
                                marginRight: '1rem' 
                            }} 
                        />
                        
                        <button 
                            className="e font-black mr-4 top-login-btn btn" 
                            onClick={() => dispatch({ type: "SET", key: "showloginmodal", payload: true })}
                            style={{ marginRight: '1rem' }}  
                        >
                            Login
                        </button>

                        <Link 
                            className="top-login-btn btn yellow-btn" 
                            to="/signup" 
                            title="Join now" 
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                            <span className="register-labl uppercase">Register</span>
                        </Link>
                    </div>
                </div>
            </>
        );
    };

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
