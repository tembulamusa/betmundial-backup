import React, {useState, useCallback, useEffect} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import { useNavigate } from 'react-router-dom';
import Notify from '../../utils/Notify';

const ResetPassword = (props) => {

    const [message, setMessage] = useState(null);
    const [otp_sent, setOtpSent] = useState(false)
    const [msisdn, setMsisdn] = useState('')
    const navigate = useNavigate();

    const initialValues = {
        msisdn: '',
    }

    const initialResetFormValues = {
        id: '',
        verificationCode: '',
        password: '',
        repeat_password: ''
    }
    
    const handleSubmit = values => {
        setMsisdn(values.msisdn)
        let endpoint = '/v2/auth/forgot-password';
        makeRequest({url: endpoint, method: 'POST', data: values, api_version:2}).then(([status, response]) => {
            if(status === 200){
                console.log("THE RESET STUFF::: == ", response);
                if(response?.status == 200) 
                    {
                        setMessage({status:200, message: "Verification verification Code sent to your phone number"});
                        setOtpSent(true);
                    } else {
                        setMessage({status: 400, message: response?.result})
                    }
                
            } else {
                setMessage(response?.error)
            }
            
        })
    }
    const handleSubmitPasswordReset = values => {
        values.msisdn = msisdn;
        values = {msisdn: msisdn, verification_code: values.verificationCode, password:values.password}

        let endpoint = '/v2/auth/reset-password';
        makeRequest({url: endpoint, method: 'POST', data: values, api_version:2}).then(([status, response]) => {
            
            if ([200, 201].includes(status)) {

                if (response?.status == 200) {
                    Notify({status: 200, message:"Password reset successfully. Login to continue"})
                    navigate("/login");
                } else {
                    setMessage({status: 400, message: "Error occured. Wrong or stale code used."})
                }
            } else {
                setMessage({status:status, message: response?.error?.message})
            }
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        return errors
    }

    const validatePasswordReset = password_reset_values => {

        let password_reset_errors = {}

        if (!password_reset_values.verificationCode) {
            password_reset_errors.verificationCode = "Please enter your One Time Pin (OTP)"
        }

        if (password_reset_values.verificationCode.length < 4) {
            password_reset_errors.verificationCode = "Your OTP should be greater than 4 numbers."
        }

        if (!password_reset_values.password) {
            password_reset_errors.password = "Please enter your new password"
        }

        if (!password_reset_values.repeat_password) {
            password_reset_errors.repeat_password = "Please enter your password confirmation"
        }

        if (password_reset_values.password !== password_reset_values.repeat_password) {
            password_reset_errors.repeat_password = "The passwords do not match. Please enter the password you entered above."
        }

        return password_reset_errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    RECOVER YOUR ACCOUNT
                </h4>
            </div>
        )
    }

    const MyOtpForm = (props) => {
        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form className={`${otp_sent ? 'd-none' : 'd-block'}`}>
                <div className="pt-0">
                    <div className="row">
                        <div className="form-group row d-flex justify-content-center mt-2">
                            <div className="col-md-12">
                                <label>msisdn Number</label>
                                <input
                                    value={values.msisdn}
                                    className="text-dark deposit-input form-control col-md-12 input-field"
                                    id="msisdn"
                                    name="msisdn"
                                    type="text"
                                    placeholder='Phone number'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                            </div>
                        </div>

                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="col-md-3">
                                <button type="submit"
                                        onClick={submitForm}
                                        className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                                    Send OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const MyPasswordResetForm = (props) => {

        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form className={`${otp_sent ? 'd-block' : 'd-none'}`}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-12">
                                <div className="form-group row d-flex justify-content-center mt-3">
                                    <input
                                        value={msisdn}
                                        className="mb-3 block text-dark deposit-input form-control col-md-12 input-field"
                                        name="msisdn"
                                        type="text"
                                        disabled={true}
                                    />
                                    <label className='block mt-2'>OTP</label>
                                    <input
                                        value={values.verificationCode}
                                        className="text-dark deposit-input form-control col-md-12 input-field"
                                        id="otp"
                                        name="verificationCode"
                                        type="text"
                                        placeholder='OTP'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.verificationCode && <div className='text-danger'>
                                        {errors.verificationCode}
                                    </div>}
                                </div>
                            </div>
                            <div className="form-group row d-flex justify-content-center mt-5">
                                <div className="col-md-6">
                                    <label>Password</label>
                                    <input
                                        value={values.password}
                                        className="text-dark deposit-input form-control col-md-12 input-field"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.password && <div className='text-danger'>
                                        {errors.password}
                                    </div>}
                                </div>
                                <div className="col-md-6">
                                    <label>Confirm Password</label>
                                    <input
                                        value={values.repeat_password}
                                        className="text-dark deposit-input form-control col-md-12 input-field"
                                        id="confirm_password"
                                        name="repeat_password"
                                        type="password"
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.repeat_password &&
                                        <div className='text-danger'>
                                            {errors.repeat_password}
                                        </div>}
                                </div>
                            </div>

                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="col-md-3">
                                <button type="submit"
                                        onClick={submitForm}
                                        className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const OptForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
            >{(props) => <MyOtpForm {...props} />}</Formik>
        );
    }
    const PasswordResetForm = (props) => {
        return (
            <Formik
                initialValues={initialResetFormValues}
                onSubmit={handleSubmitPasswordReset}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validatePasswordReset}
            >{(props) => <MyPasswordResetForm {...props} />}</Formik>
        );
    }

    const Alert = (props) => {
        let c = message?.status === (200 || 201) ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message?.message}</div>);

    };

    return (
        <React.Fragment>
            <div className="homepage">
                <FormTitle/>
                <div className="col-md-12 mt-2 p-2 px-4">
                    {message && <Alert/>}
                    <div className="pb-0" data-backdrop="static">
                        <OptForm/>
                        <PasswordResetForm/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ResetPassword;
