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
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 673738 /* this is hack to prevent multiple toasts */
        }
        if (message.status === 200) {
            toast.success(`${message.message}`, options);
        } else {
            toast.error(`${message.message}`, options);
        }

    };

    const dispatchUser = useCallback(() => {
        if (message !== null) {
            Notify(message);

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
        let endpoint = '/v1/login';
        setIsLoading(true)
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {

            setIsLoading(false)
            if (status === 200 || status == 201 || status == 204) {
                setMessage(response);
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
                        <div className='col-9'>
                            <div className="input-group">
                                <input type="text"
                                    name="msisdn"
                                    className={`top-login-input-field ${errors.msisdn && 'text-danger'} px-2 py-2`}
                                    // style={{borderRight:"1px solid #dddddd"}}
                                    data-action="grow"
                                    placeholder={errors.msisdn || "+254........."}
                                    onChange={ev => onFieldChanged(ev)}
                                    value={values.msisdn}
                                />
                                <input type="password"
                                    name="password"
                                    className={`top-login-input-field ${errors.password && 'text-danger'} px-2 py-2`}
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
                                        <a className="m-lg-2" href="/verify-account" title="Verify Account">
                                            <span className="register-label">registered?, Verify</span>
                                        </a>
                                    </label>
                                    <input type="hidden" name="ref" value="{props.refURL}"/>
                                    <a href="/reset-password" title="Reset password" className='ml-4'>
                                        <span className="sticky-hidden">Forgot Password?</span>
                                    </a>
                                </span>
                                
                            </div>
                        </div>
                        <div className="col-3">
                            <a className="top-login-btn btn yellow-btn ml-3" href="/signup" title="Join now" style={{ fontSize: "13px", fontWeight: "bold"}}>
                                <span className="register-label uppercase">Register</span>
                            </a>
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
                <Col xs={3}className="d-inline-flex justify-content-center" style={{margin:"auto"}}>
                    

                    
                </Col>
                <Col xs={6}>
                    <ToastContainer/>
                    
                    <LoginForm/>
                    
                </Col>
            </Row>
        </Container>
    )
}
export default React.memo(HeaderLogin);
