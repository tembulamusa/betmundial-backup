import React, {useState, useContext, useEffect} from 'react';
import {Formik, Form} from 'formik';
import mpesa from '../../assets/img/mpesa.png'
import {Context} from '../../context/store';
import { Modal } from "react-bootstrap";
import makeRequest from '../utils/fetch-request';
import Alert from '../utils/alert';


const DepositModal = (props) => {

    const [state, dispatch] = useContext(Context);
    const [success, setSuccess] = useState(false);
    const [depositMessage, setDepositMessage] = useState(state?.promptdepositrequest?.message);
    const [isLoading, setIsLoading] = useState(false);
    const [directDepositPromt, setDirectDepositPrompt] = useState(false);
    const [amount, setAmount] = useState(state?.promptdepositrequest?.payableAmt)
    const [closeButton, setCloseButton] = useState(false);

    const initialValues = {
        amount: state?.promptdepositrequest?.payableAmt,
        msisdn: state?.user?.msisdn || ''
    }


    useEffect(() => {
        setDepositMessage(state?.promptdepositrequest?.message);
    }, [state?.promptdepositrequest?.message]);

    const handleSubmit = values => {
        let endpoint = '/v2/deposits/stk/new';
        setIsLoading(true);
        setDepositMessage(null);
        setSuccess(false)
        makeRequest({url: endpoint, method: 'POST', data: values, api_version:3}).then(([status, response]) => {
            if(status == 200) {
                setSuccess(true)
                setDepositMessage({status: 200, message: "Check your phone and enter pin to complete deposit"})
            } else {
                setDepositMessage({status: 400, message: "Error pushing stk. Please deposit directly"});
                setDirectDepositPrompt(true)
                setIsLoading(false)
            }
        })
    }

    

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.amount || values.amount < state.promptdepositrequest?.payableAmt || values.amount > 70000) {
            errors.amount = `Please enter amount between KES ${state.promptdepositrequest?.payableAmt} and KES 70,000.00`;
        }
        return errors
    }
    

    
    const DepositFormFields = (props) => {
        const {values, errors, onFieldChanged} = props;
        return (
            <>
                
                <div className="form-group row d-flex justify-content-center mt-4">
                    {depositMessage && <div className='my-3 font-bold'><Alert message={depositMessage} font={"light"}/></div> }

                    <div className="row">
                        <div className=''>
                        <input
                            onChange={ev => onFieldChanged(ev)}
                            style={{}}
                            className="text-dark deposit-input form-control  input-field"
                            id="amount"
                            name="amount"
                            type="text"
                            value={values.amount}
                            placeholder='Enter Amount'
                        />
                        {errors.amount && <div className='text-danger'> {errors.amount} </div>}
                        </div>

                        <input
                            onChange={ev => onFieldChanged(ev)}
                            style={{}}
                            className="text-dark deposit-input form-control  input-field"
                            id="msisdn"
                            name="msisdn"
                            type="hidden"
                            value={state?.user?.msisdn}
                        />
                        <div className='col-8'>
                            <button
                                disabled={isLoading}
                                style={{}}
                                className='w-full btn btn-lg btn-primary bg-primary deposit-withdraw-butto font-[500]'>
                                {isLoading ? "wait..." : "Deposit"}
                            </button>
                        </div>
                        <div className='col-4'>
                            <div
                                onClick={() => dispatch({type:"DEL", key:"promptdepositrequest"})}
                                className='w-full btn btn-lg btn-primary btn-warning deposit-withdraw-butto font-[500]'>
                                {closeButton ? "Cancel" : "Close"}
                            </div></div>
                        
                    </div>
                </div>
            </>
        )
    }


    
    const MyDepositForm = (props) => {
        const {errors, values, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
            // if (field == "amount") {
            //     setAmount(value);
            // }

        }
        
        return (
            <Form className="rounded border-0">
                <div className="pt-0">
                    <div className="row px-3">
                        <div className='text-center'>
                            <img src={mpesa} alt=""/>
                        </div>

                        
                    </div>
                    <hr className='my-2'/>
                    <div className='row'>
                        <div className=''>
                            <DepositFormFields onFieldChanged={onFieldChanged} values={values} errors={errors}/>
                        </div>

                    </div>
                </div>
            </Form>
        );
    }

    const DepositForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MyDepositForm {...props} />}/>
        );
    }

    return (
        <Modal
            show={state?.promptdepositrequest?.show}
            onHide={() => dispatch({type:"DEL", key:"promptdepositrequest"})}
            dialog className="popover-login-modal"
            aria-labelledby="contained-modal-title-vcenter">
                     {/* <Modal.Header closeButton className="no-header">
                      <Modal.Title>Deposit</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body className="p-4">
                        <Alert message={{status:400, message: "Insufficient Balance"}} />
                        <div className='row mt-5'>
                            <div className='col-7'><a href='/deposit' className='p-3 w-[200px] btn btn-primary btn-lg bold uppercase'>Click to Deposit</a></div>
                            <div className='col-5'><button className='p-3 w-[100px] btn btn-lg bold uppercase btn btn-default' onClick={() => dispatch({type:"DEL", key:"promptdepositrequest"})}>Close</button></div>
                        </div>
                    </Modal.Body>
            </Modal>
        
        
    )
}

export default DepositModal
