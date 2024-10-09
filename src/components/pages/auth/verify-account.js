import React, {useContext, useEffect, useRef, useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import { Context } from '../../../context/store';
import { useNavigate } from 'react-router-dom';
import Notify from '../../utils/Notify';
import Alert from '../../utils/alert';

const VerifyAccount = (props) => {

    const [message, setMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const verifyRef = useRef();
    const [disabledResend, setDisabledResend] = useState(false);
    const [state, _] = useContext(Context);
    const navigate = useNavigate();

    const initialValues = {
        msisdn: state?.regmsisdn,
        code: ''
    }

    const handleSubmit = values => {
        let endpoint = '/v2/auth/verify';
        setIsLoading(true);
        console.log(values);
        makeRequest({url: endpoint, method: 'POST', data: values, api_version:2}).then(([status, response]) => {
            if ([200, 201].includes(status)) {
                if (response?.status == 200) {
                    Notify({status: 200, message:"Password reset successfully. Login to continue"})
                    navigate("/login");
                } else {
                    setMessage({status: 400, message: "Code invalid"})
                }
            } else {
                setMessage({status:status, message: response?.error?.message})
            }


            setIsLoading(false);

            
        })
    }

    const validate = values => {

        let errors = {}


        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.code || values.code.length < 4) {
            errors.code = "Please enter four or more characters for code";
        }

        return errors
    }

    const resendOTP = () => {

        let endpoint = '/v2/auth/verification-code';

        let values = {
            msisdn: state?.regmsisdn
        }

        makeRequest({url: endpoint, method: 'POST', data: values, api_version:2}).then(([status, response]) => {
            if ([200, 201].includes(status)) {
                if (response?.status == 200) {
                    Notify({status: 200, message:"Verification code send to phone"})
                } else {
                    setMessage({status: 400, message: "Error fetching code"})
                }
            } else {
                setMessage({status:status, message: "Error fetching code"})
            } 
        })
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
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
                
                <div className="pt-0 px-2">
                    <div className="row">                        
                        <div className='col-md-12 col-sm-12'>{message && <Alert message={message}/>}</div>
                            <div className="col-md-12">
                                <label>msisdn Number</label>
                                <div className="row">
                                    <div className="col-12">
                                        <input
                                            value={state?.regmsisdn}
                                            className="block px-3 py-3 w-full rounded-2xl std-input form-control"
                                            id="msisdn"
                                            name="msisdn"
                                            type="text"
                                            placeholder='Phone number'
                                            disabled = {true}
                                            onChange={ev => onFieldChanged(ev)}
                                        />
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
                                    type="text"
                                    placeholder='Code'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.code && <div className='text-danger'> {errors.code} </div>}
                            </div>

                            <div className="col-12 my-2">
                                <span className=''>
                                    Didn't receive code? 
                                </span>
                                <button onClick={() => resendOTP()} type={"button"}
                                        className='btn text-white ml-2 btn-sm !bg-green-500 hover:opacity-70' disabled={disabledResend}>Click Resend Code
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

    

    return (
        <>
            <FormTitle/>
            <div className="col-md-12 mt-2 p-2">
                {message && <Alert/>}
                <div className="pb-0" data-backdrop="static">
                    <VerifyAccountForm/>
                </div>
            </div>
        </>

                        
    );
}

export default VerifyAccount;
