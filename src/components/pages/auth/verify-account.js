import React, {useContext, useRef, useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import { Context } from '../../../context/store';

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../../right/index'));
const Footer = React.lazy(() => import('../../footer/footer'));

const VerifyAccount = (props) => {

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const verifyRef = useRef();
    const [state, _] = useContext(Context);

    const initialValues = {
        mobile: state?.regmsisdn,
        code: ''
    }

    const handleSubmit = values => {
        let endpoint = '/v1/verify';
        setIsLoading(true);
        console.log(values);
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201)
            setMessage(response.success ? response.success.message : response.error.message);
            response.success ? setSuccess(true) : setSuccess(false);
            setIsLoading(false);
            if (response.success) {
                let timer = setInterval(() => {
                    clearInterval(timer)
                    window.location.href = "/login"
                }, 3000);
            }
            
        }).catch((err) => {

        })
    }

    const validate = values => {

        let errors = {}


        if (!values.mobile || !values.mobile.match(/(254|0|)?[71]\d{8}/g)) {
            errors.mobile = 'Please enter a valid phone number'
        }

        if (!values.code || values.code.length < 4) {
            errors.code = "Please enter four or more characters for code";
        }

        return errors
    }

    const resendOTP = () => {

        let endpoint = '/v1/code';

        let values = {
            mobile: verifyRef.current.values.mobile
        }

        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response.success ? response.success.message : response.error.message);
            response.error ? setSuccess(false) : setSuccess(true)
        })
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 page-title p-4 text-center'>
                <h4 className="inline-block">
                    Verify Account
                </h4>
            </div>
        )
    }

    const MyVerifyAccountForm = (props) => {
        const {errors, values, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <form onReset={props.handleReset} onSubmit={props.handleSubmit} {...props} >
                
                <div className="pt-0">
                    <div className="row">
                        <hr/>
                        <div className='alert alert-success'>
                            Thanks for registering. Kindly check your phone for the sms and enter code in the field below
                        </div>
                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <div className="row">
                                    <div className="col-12">
                                        <input
                                            value={state?.regmsisdn}
                                            className="block px-3 py-3 w-full rounded-2xl std-input form-control"
                                            id="mobile"
                                            name="mobile"
                                            type="text"
                                            placeholder='Phone number'
                                            disabled = {true}
                                            onChange={ev => onFieldChanged(ev)}
                                        />
                                    </div>
                                    
                                </div>

                            </div>
                        </div>

                        <div className="form-group row d-flex  mt-5">
                            <div className="col-12">
                                <label>Code (OTP)</label>
                                <input
                                    value={values.code}
                                    className="block px-3 py-3 w-full rounded-2xl std-input form-control"
                                    id="code"
                                    name="code"
                                    type="code"
                                    placeholder='Code'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.code && <div className='text-danger'> {errors.code} </div>}
                            </div>

                            <div className="col-12 my-2">
                                <span className=''>
                                    Didn't receive code? Resend Code
                                </span>
                                <button onClick={() => resendOTP()} type={"button"}
                                        className='btn text-white ml-2 btn-sm bg-green-500'>Resend OTP
                                </button>
                            </div>
                        </div>
                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="col-12">
                                <button type="submit"
                                        disabled = {isLoading}
                                        className={`btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button`}>
                                        {isLoading === false? "Verify Account" : "verifying..."}
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </form>
        );
    }

    const VerifyAccountForm = (props) => {
        return (
            <Formik
                innerRef={verifyRef}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validator={validate} >
                    {props => <MyVerifyAccountForm {...props} />}
                </Formik>
            
        );
    }

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

    };

    return (
        <>
            <FormTitle/>
            <div className="col-md-12 mt-2 p-2">
                {message && <Alert/>}
                <div className="modal-body pb-0" data-backdrop="static">
                    <VerifyAccountForm/>
                </div>
            </div>
        </>

                        
    );
}

export default VerifyAccount;
