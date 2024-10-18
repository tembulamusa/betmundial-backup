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


const Signup = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const [_, dispatch] = useContext(Context);
    const navigate = useNavigate();

    const initialValues = {
        msisdn: '',
        password: '',
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

        return errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    SIGNUP | CREATE A NEW ACCOUNT
                </h4>
            </div>
        )
    }

    const MySignupForm = (props) => {
        const {errors, values, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form>
                <div className="pt-0">
                    <div className="row">
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
                                />
                                {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                            </div>
                        </div>

                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Password</label>
                                <input
                                    value={values.password}
                                    className="block px-3 py-3 w-full rounded-2xl std-input form-control"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Password'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.password && <div className='text-danger'> {errors.password} </div>}
                            </div>
                        </div>
                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="">
                                <button type="submit"
                                    className={`btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button`}
                                    disabled={isLoading}
                                    >
                                    Signup
                                </button>
                            </div>
                            <Link to="/login" title="Already Registered?">
                                <span className="" style={{ marginTop: '60px' }}>Already Registered?</span>
                            </Link>
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
                        <div className='col-md-12 primary-bg p-4 text-center'>
                            <h4 className="inline-block">
                                Signup/Register
                            </h4>
                        </div>
                        <div className="col-md-12 mt-2 p-2" 
                            style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)', marginTop: '50px' }}
                        >
                            {message ? <Alert/>:""}
                            <div className="modal-body pb-0" data-backdrop="static">
                                <SignupForm/>
                            </div>
                        </div>
                        </div>
        </React.Fragment>
    );
}

export default Signup;
