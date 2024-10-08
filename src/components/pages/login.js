import React, {useContext, useEffect, useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import mpesa from '../../assets/img/mpesa-3.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Context } from '../../context/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Alert from '../utils/alert';

const Header = React.lazy(() => import('../header/header'));
const SideBar = React.lazy(() => import('../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../right/index'));
const Footer = React.lazy(() => import('../footer/footer'));
const BodyLogin = React.lazy(() => import('../header/mobile-login'));

const Login = (props) => {
    const [state, ] = useContext(Context);
    const [alertMessage, setAlertMessage] = useState({});
    const navigate = useNavigate();
    const [searchParams, ] = useSearchParams();
    searchParams.get("successfulReset");

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    Login
                </h4>
            </div>
        )
    }

    useEffect(() => {
        if(state?.user) {
            navigate("/")
        }
    }, [])

   

    return (
        <React.Fragment>

            
                        <div className="">
                        <div className='col-md-12 primary-bg p-4 text-center'>
                            <h4 className="inline-block">
                               Login
                            </h4>
                        </div>
                            <div className="col-md-12">
                                <BodyLogin/>
                            </div>
                        </div>
        </React.Fragment>
    );
}

export default Login;