
import React, {useContext, useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import mpesa from '../../assets/img/mpesa-3.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Context } from '../../context/store';
import { useNavigate } from 'react-router-dom';
import Notify from '../utils/Notify';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";

const Signup = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const [_, dispatch] = useContext(Context);
    const navigate = useNavigate();

    const initialValues = {
        msisdn: '',
        password: '',
        password2: '',
        created_by:"web"
    }

    const handleSubmit = values => {
        let endpoint = '/v2/auth/signup';
        setIsLoading(true);
        let data = {msisdn:values.msisdn, password: values.password}

        makeRequest({url: endpoint, method: 'POST', data: data, api_version:2}).then(([status, response]) => {
            setMessage(response?.message);
            dispatch({type: "SET", key: "regmsisdn", payload: values?.msisdn})
            if([200, 201, 204].includes(status)){
                Notify({status: 200, message: "Registration successful. Please Verify the code sent to your phone"})
                setTimeout(() => {
                }, 3000);
                navigate("/verify-account");
            } else {
                Notify({status: 400, message: "Error Making registration"})
                setIsLoading(false);
            }
            
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Please enter four or more characters for password";
        }

        if (values.password2 != values.password) {
            errors.password2 = "Passwords don't match";
        }

        return errors
    }

    const handleKeyPress = (event, submitForm) => {
        if (event.key == 'Enter') {
            event.preventDefault();
            submitForm(); 
        }
    };


    const FormTitle = () => {
        return (
            <div className='col-md-12 border-b border-gray-200 uppercase p-4 text-center'>
                <h4 className="inline-block">
                    CREATE AN ACCOUNT
                </h4>
            </div>
        )
    }

    const MySignupForm = (props) => {
        const { errors, values, setFieldValue, submitForm } = props;
        const [showPassword, setShowPassword] = useState(false);
        const [showPassword2, setShowPassword2] = useState(false);

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form>
                <div className="pt-0">
                    <div className="row form-block">
                        <div className='text-center'>
                            <h1 className='std-title'>Join Surebet</h1>
                            <p className='text-xl'>Home to the best Odds, instant Payouts and many bonuses</p>
                        </div>
                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <input
                                    value={values.msisdn}
                                    className="form-control block px-3 py-3 w-full rounded-2xl std-input "
                                    id="msisdn"
                                    name="msisdn"
                                    type="text"
                                    placeholder='Phone number'
                                    onChange={ev => onFieldChanged(ev)}
                                    onKeyPress={ev => handleKeyPress(ev, submitForm)}
                                />
                                {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                            </div>
                        </div>

                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12 relative">
                                <label>Password</label>
                                <div className="relative">
                                    <input
                                        value={values.password}
                                        className="block px-3 py-3 w-full rounded-2xl std-input form-control"
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
                                        onKeyPress={ev => handleKeyPress(ev, submitForm)}
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>
                                {errors.password && <div className='text-danger'> {errors.password} </div>}
                            </div>
                        </div>

                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12 relative">
                                <label>Repeat Password</label>
                                <div className="relative">
                                    <input
                                        value={values.password2}
                                        className="block px-3 py-3 w-full rounded-2xl std-input form-control"
                                        id="password2"
                                        name="password2"
                                        type={showPassword2 ? 'text' : 'password'}
                                        placeholder='Repeat password'
                                        onChange={ev => onFieldChanged(ev)}
                                        onKeyPress={ev => handleKeyPress(ev, submitForm)}
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                                        onClick={() => setShowPassword2(!showPassword2)}
                                    >
                                        {showPassword2 ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>
                                {errors.password2 && <div className='text-danger'> {errors.password2} </div>}
                            </div>
                        </div>

                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="">
                                <button type="submit"
                                    className={`btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button font-bold`}
                                    disabled={isLoading}
                                    >
                                    Signup
                                </button>
                            </div>
                            <Link to="/login" title="Already Registered?" className='mt-4 text-2xl hover:underline'>
                                <span className="font-[500]">Have an account? Login here</span>
                            </Link>
                        </div>

                        <div className='disclaimer mt-5 text-center'>
                            <p>
                                By registering for an account, you agree to our <Link to={"/terms"}>Terms of Use,</Link> <Link to={"/privacy-policy"}>Privacy Policy</Link> and Responsible Gambling Policy.
                            </p>
                            <p className='mt-4'>
                                You must be 18yrs and above in order to sign up.
                            </p>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const SignupForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MySignupForm {...props} />}/>
        );
    }

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

    };

    return (
        <React.Fragment>

            
                    <div className='signup-container' >
                    <div className='col-md-12 border-b border-gray-200 uppercase p-4 text-center'>
                    <h4 className="inline-block">
                                CREATE AN ACCOUNT
                            </h4>
                        </div>
                        <div className='std-medium-width-block'>
                            <div className="col-md-12 mt-2 p-2 std-boxed-form-page" 
                                style={{}}
                            >

                                {message ? <Alert/>:""}
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <SignupForm/>
                                </div>
                            </div>
                        </div>
                    </div>
        </React.Fragment>
    );
}

export default Signup;
