import React, {useState, useEffect, useContext, useCallback} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Formik, Field, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import {Context} from '../../context/store';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import {
    Link,
    useNavigate,
} from 'react-router-dom';

const BodyLogin = (props) => {
    const [isLoading, setIsLoading] = useState(null)
    const [message, setMessage] = useState(null);
    const [, dispatch] = useContext(Context);
    // const {user} = props;
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const navigate = useNavigate();
    
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
        if ([200, 201, 204].includes(message.status)) {
            setLocalStorage('user', message.user);
            setUser(message.user);
            dispatch({type:"SET", key: "user", payload: message?.user});
            dispatch({type:"SET", key:"showloginmodal", payload:false});
            navigate("/");
            toast.success(`🚀 ${message.message || "Login successful"}`, options);
        } else {
            toast.error(`🦄 ${message.message}`, options);
        }

    };

    const dispatchUser = useCallback(() => {
        if (message !== null) {
            Notify(message);
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

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])


    const MyLoginForm = (props) => {
        const {isValid, errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <div className='mt-5 mx-auto w-11/12' style={{ maxWidth: '600px'}}>
                <Form className="">
                    <Row>
                        <div className="">
                            <label className='modal-label'>Mobile Phone</label>
                            <input type="text"
                                name="msisdn"
                                className={`form-control block px-3 py-3 w-full rounded-2xl std-input ${errors.msisdn && 'text-danger'} `}
                                data-action="grow"
                                placeholder={errors.msisdn || "07xxxxxxxx"}
                                onChange={ev => onFieldChanged(ev)}
                                value={values.msisdn}
                            />
                            <br/>
                            
                        </div>
                        <div className="">
                            <label className='modal-label'>Password</label>
                            <input type="password"
                                       name="password"
                                       className={`block px-3 py-3 w-full rounded-2xl form-control std-input ${errors.password && 'text-danger'} `}
                                       data-action="grow"
                                       placeholder={errors.password || "Password"}
                                       onChange={ev => onFieldChanged(ev)}
                                       value={values.password}
                                />
                                
                                
                            <br/>
                            <input type="hidden" name="ref" value="{props.refURL}"/>
                            

                            
                        </div>
                        <span className="">
                            <label><input type="checkbox" name="remember" value="1"/>Remember me</label>
                        </span>
                        <div>
                            <button
                            className={`btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button`}
                            type="submit" style={{marginTop: "10px",
                        padding: "5px", fontSize: "14px"}}>
                                {isLoading ? <span>Logging In ...</span> : <span>Login</span>}
                                </button>
                        </div>        

                        <Link to="/forgot-password" title="Forgot password">
                            <span className="">Forgot Password?</span>
                        </Link>
                        <div className="col-sm-2">
                            <Link className="" to="/signup" title="Join now">
                                <span className="register-label">Register now!</span>
                            </Link>
                        </div>
                    </Row>
                </Form>
            </div>
        );
    }

    const LoginForm = (props) => {
        return (
            <>
            {user &&
                <div className='px-2 text-center py-5'>
                    <div className='text-2xl'>You are already logged in.</div>
                    <div className='mt-2'>
                    <Link to={"/"} className='btn mr-3  w-[] btn-default rounded-md bg-gray-100'>Go Home</Link>
                    <Link to={"/logout"} className='btn btn-danger'>Logout</Link>
                    </div>
                </div>
            }
            {!user && <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
            >{(props) => <MyLoginForm {...props} />}</Formik> }
            </>
            
        );
    }

    return (
        <>
            <ToastContainer/>
            <LoginForm/>
        </>
                
    )
}
export default React.memo(BodyLogin);