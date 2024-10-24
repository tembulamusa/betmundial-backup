import React, {useContext, useState} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Context} from '../../context/store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import { faUser, faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderLogin = (props) => {
    const [, dispatch] = useContext(Context)


   

    // an independent function that runs every 1 minute to check for user session
    // and request a refresh. However, currently, we are just requesting a relogin
    
    const MyLoginForm = (props) => {
        const [isFocused, setIsFocused] = useState(false); 
       
        return (
            <>
                <div className="header-login-links uppercase">
                    <div className="onboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: "7px" }}>                    
                   
                    <div 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                padding: '5px 10px',  
                                backgroundColor: 'transparent', 
                                marginRight: '1rem',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={() => setIsFocused(true)} 
                            onMouseLeave={() => setIsFocused(false)}

                            className='top-item'
                        >
                            <FaSearch style={{ color: '#fff', fontSize: '16px' }} />
                        </div>

                        <div className='hidden md:inline-block top-item'>
                            <Link
                            to={{ pathname: "/deposit" }} >
                            <span className="font-black mr-4 top-login-btn btn text-white">
                            <span className=" space-icons text-yellow"> <FontAwesomeIcon icon={faCoins} className='secondary-text' /></span> Deposit 
                            </span>
                            </Link>
                        </div>
                        
                        <button 
                            className="mr-4  top-item uppercase top-login-btn text-white btn" 
                            onClick={() => dispatch({ type: "SET", key: "showloginmodal", payload: true })}
                            style={{ marginRight: '1rem' }}  
                        >
                            Login
                        </button>

                        <Link 
                            className="top-login-btn btn red-bg top-item" 
                            to="/signup" 
                            title="Join now" 
                            style={{ }}
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
        <Container className="">
            <ToastContainer/>                   
            <LoginForm/>
        </Container>
    )
}
export default React.memo(HeaderLogin);
