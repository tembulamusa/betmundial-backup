import React, {useEffect, useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/local-storage';

const ForgotPassword = (props) => {

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const [msisdn, setMsisdn] = useState('')
    const user = getFromLocalStorage("user")
    const navigate = useNavigate();

    const initialValues = {
        msisdn: '',
    }
    const handleSubmit = values => {
        setMsisdn(values.msisdn);
        let endpoint = '/v2/auth/forgot-password';
        makeRequest({url: endpoint, method: 'POST', data: values, api_version:2}).then(([status, response]) => {
            console.log("THE RESET PASSWORD STUFF::::::", response)
            
            
            // setSuccess(status === 200 || status === 201);
            // setMessage(response.success.message);
            // setOtpSent(true)
            // setResetID(response.success.id)
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        return errors
    }

    useEffect(() => {if (user){navigate("/")}}, [])

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
            <Form className={``}>
                <div className="pt-0">
                    <div className="row">
                        <div className="form-group row d-flex justify-content-center mt-5">
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
    

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

    };

    return (
        <React.Fragment>
            <div className="homepage">
                <FormTitle/>
                <div className="col-md-12 mt-2 p-2">
                    {user ? 
                        <div>
                            <div className=''>You are already logged. You cannot reset your password</div>
                        </div> : <div>
                        {message && <Alert/>}
                            <div className="modal-body pb-0" data-backdrop="static">
                                <OptForm/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default ForgotPassword;
