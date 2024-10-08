import React, {useState, useEffect, useContext, useCallback} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Formik, Field, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import {Context} from '../../context/store';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setLocalStorage, getFromLocalStorage} from '../utils/local-storage';
import { Link } from 'react-router-dom';

const HeaderLogin = (props) => {
    const [isLoading, setIsLoading] = useState(null)
    const [message, setMessage] = useState(null);
    const [user, ] = useState(getFromLocalStorage("user"));
    const {setUser} = props;

    const initialValues = {
        msisdn: "",
        password: ""
    }

    const Notify = (message) => {
        let options = {
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 673738 /* this is hack to prevent multiple toasts */
        }
        if (message.status === 200) {
            toast.success(`${message.message || "Login Successful"}`, options);
        } else {
            toast.error(`${message.message || "error logging in"}`, options);
        }

    };

    const dispatchUser = useCallback(() => {
        if (message !== null) {
            if (message?.status !== 200) {
                Notify(message);
            }

            if (message.status == 200) {
                setLocalStorage('user', message.user);
                setUser(message.user);
            }

        }
    }, [message])

    useEffect(() => {
        dispatchUser();
    }, [dispatchUser]);

    const handleSubmit = values => {
        let endpoint = '/v2/auth/login';
        setIsLoading(true)
        makeRequest({url: endpoint, method: 'POST', data: values, api_version:2}).then(([status, response]) => {
            setIsLoading(false)
            if (status === 200 || status == 201 || status == 204) {
                setMessage({user:response?.data, status:200});
            } else {
                let message = {
                    status: status,
                    message: response?.message || "Error attempting to login"
                };
                Notify(message);
            }
        })
    }


    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Invalid phone number'
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Invalid password";
        }

        return errors
    }


    const MyLoginForm = (props) => {
        const {isValid, errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <>
                <Form className="header-login-form">
                    <Row>
                        <div className='col-md-9'>
                            <div className='float-end'>
                            <div className="input-group">
                                <input type="text"
                                    name="msisdn"
                                    className={`top-login-input-field ${errors.msisdn && 'text-danger'} !px-2 !py-2`}
                                    // style={{borderRight:"1px solid #dddddd"}}
                                    data-action="grow"
                                    placeholder={errors.msisdn || "07xxxxxxx"}
                                    onChange={ev => onFieldChanged(ev)}
                                    value={values.msisdn}
                                />
                                <input type="password"
                                    name="password"
                                    className={`top-login-input-field ${errors.password && 'text-danger'} !px-2 !py-2`}
                                    style={{borderLeft:"1px solid #cccccc"}}
                                    data-action="grow"
                                    placeholder={errors.password || "Password"}
                                    onChange={ev => onFieldChanged(ev)}
                                    value={values.password}
                                />
                                <button className="btn-default top-login-btn btn text-white font-bold uppercase !py-3" type="submit">
                                    {isLoading ? <span>Login ..</span> : <span className='font-bold'>Login</span>}
                                </button>

                                
                            </div>
                                
                            <div className="">
                                
                                <span className="sticky-hidden">
                                    <label>
                                    <input type="hidden" name="remember" value="1"/> 
                                        <Link className="m-lg-2" to="/verify-account" title="Verify Account">
                                            <span className="register-label">registered?, Verify</span>
                                        </Link>
                                    </label>
                                    <input type="hidden" name="ref" value="{props.refURL}"/>
                                    <Link to="/forgot-password" title="Reset password" className='ml-4'>
                                        <span className="sticky-hidden">Forgot Password?</span>
                                    </Link>
                                </span>
                                
                            </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <Link className="top-login-btn btn yellow-btn ml-3" to="/signup" title="Join now" style={{ fontSize: "13px", fontWeight: "bold"}}>
                                <span className="register-labl uppercase">Register</span>
                            </Link>
                        </div>
                    </Row>
                </Form>
            </>
        );
    }

    const LoginForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
            >{(props) => <MyLoginForm {...props} />}</Formik>
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
