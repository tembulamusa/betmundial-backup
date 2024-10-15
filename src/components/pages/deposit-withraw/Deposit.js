import React, {useState, useContext, useEffect} from 'react';

import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import mpesa from '../../../assets/img/mpesa.png'
import {Context} from '../../../context/store';
import Notify from '../../utils/Notify';
import Accordion from 'react-bootstrap/Accordion';
import '../../../assets/css/accordion.react.css';
import StdTable from '../../utils/std-table';


const Deposit = (props) => {

    const [state, dispatch] = useContext(Context);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pastDeposits, setPastDeposits] = useState([]);
    const [tableHeaders, ] = useState(["Date", "Amount", "Surebet Balance"])
    
    const initialValues = {
        amount: '',
        msisdn: state?.user?.msisdn || ''
    }

    const handleSubmit = values => {
        let endpoint = '/v2/deposits/stk/new';
        setIsLoading(true);
        setMessage(null);
        setSuccess(false)
        makeRequest({url: endpoint, method: 'POST', data: values, api_version:3}).then(([status, response]) => {
            

            if(status == 200) {
                setSuccess(true)
                setMessage({status: 200, message: "Check your phone and enter pin to complete deposit"})
            } else {
                setMessage({status: 400, message: "Error pushing stk. Please deposit directly"})
                Notify({status: 400, message:"Error making a deposit. Seek custome care support"})
            }
            setIsLoading(false)
        })
    }

    const requestUserDeposits = () => {
        let endpoint = '/v2/deposits';
        
        makeRequest({url: endpoint, method: 'GET', api_version:3}).then(([status, response]) => {
            

            if(status == 200) {
                setPastDeposits(response?.data?.deposits)
            } else {
                Notify({status: 400, message:"Error fetching deposits"})
            }
            setIsLoading(false)
        })

    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.amount || values.amount < 1 || values.amount > 70000) {
            errors.amount = "Please enter amount between KES 1.00 and KES 70,000.00";
        }
        return errors
    }
    const pollBal = () => {
        const pollBalID = setInterval(function(){
            dispatch({type:"SET", key:"toggleuserbalance", payload: state?.toggleuserbalance ? !state?.toggleuserbalance : true}) 
        }, 3000)

        // stop polling after 1 minute
        
        setTimeout(function(){clearInterval(pollBalID)}, 60000)

    }
    
        // Upon loading this page call the function that polls for balance every 3 seconds and then stops after 1 minute
        

    const FormTitle = () => {
        return (
            <div className='col-md-12 bg-primary p-4 text-center'>
                <h4 className="inline-block">
                    DEPOSIT FUNDS (MOBILE MONEY)
                </h4>
            </div>
        )
    }


    const DepositFormFields = (props) => {
        const {values, errors, onFieldChanged} = props;

        return (
            <>
                <div className="form-group row d-flex justify-content-center">
                    <div className="col-md-12">
                        <label>Phone Number</label>
                        <input
                            className="text-dark deposit-input form-control input-field"
                            id="msisdn"
                            name="msisdn"
                            type="text"
                            value={values.msisdn}
                            readOnly={true}
                        />
                        {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center mt-4">
                    <div className="col-md-12">
                        <label>Amount to Deposit</label>
                        <input
                            onChange={ev => onFieldChanged(ev)}
                            className="text-dark deposit-input form-control col-md-12 input-field"
                            id="amount"
                            name="amount"
                            type="text"
                            value={values.amount}
                            placeholder='Enter Amount'
                        />
                        {errors.amount && <div className='text-danger'> {errors.amount} </div>}
                    </div>
                </div>
                {message && <div className='mt-3 font-bold'><Alert/></div> }
                <div className="form-group row d-flex justify-content-left mb-4">
                    <div className="col-md-3">
                        <button
                            disabled={isLoading}
                            className='btn btn-lg btn-primary mt-3 col-md-12 deposit-withdraw-button'>
                            {isLoading ? "wait..." : "Deposit"}
                        </button>
                    </div>
                </div>
            </>
        )
    }


    const PaymentInstructions = (props) => {
        return (
            <>
                <h2 className='text-2x text-gray-700 mt-2 font-[500]'>Deposit Instructions</h2>
                <div className="container">
                    <div className="row">
                        <div className="col"> 1. Enter the amount you want to deposit.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 2. Click on the deposit button.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 3. Check your phone for an M-Pesa Request.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 4. Enter your M-Pesa Pin to confirm the transaction.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 5. On successful payment, you will receive an M-Pesa
                            Confirmation.
                        </div>
                    </div>
                </div>

                <hr className='my-3'/>

                <div className='' id='pay-via-mobile'>
                    <h2 className='text-2x text-gray-700 font-[500] mb-3 '>Direct Mpesa Deposit</h2>
                    <div className="row">
                        <div className="col"> 1. Go to Mpesa.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 2. Select Lipa na mpesa</div>
                    </div>
                    <div className="row">
                        <div className="col"> 3. Enter Paybill number: <span className='text-2x font-bold'>599488</span></div>
                    </div>
                    <div className="row">
                        <div className="col"> 4. Account Number: <span className='text-2x font-bold'>Enter your phone number</span></div>
                    </div>
                    <div className="row">
                        <div className="col"> 5. Enter Amount</div>
                    </div>
                    <div className="row">
                        <div className="col"> 5. Enter PIN and accept</div>
                    </div>

                </div>

            </>
        );
    }
    const MyDepositForm = (props) => {
        const {errors, values, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }

        return (
            <>
                <Form className="rounded border-0">
                    <div className="pt-0">
                        <div className="row">
                            <div className='col-md-7 text-center'>
                                <img src={mpesa} alt=""/>
                            </div>
                            <hr/>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <DepositFormFields onFieldChanged={onFieldChanged} values={values} errors={errors}/>
                                    
                                    <hr className='my-5'/>
                                    <div className=''>
                                        <Accordion
                                        className='accordion'>
                                            <Accordion.Item eventKey={2}>
                                                <Accordion.Header>
                                                    <h1 className='capitalize font-[500]'>missing Deposit?</h1>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <input
                                                        className='text-dark deposit-input form-control col-md-12 input-field'
                                                        placeholder='Enter Mpesa Code'
                                                    />
                                                    <button className='btn btn-lg btn-primary mt-3 col-md-12 deposit-withdraw-button'>Check Status</button>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <Accordion 
                                    className="accordion mt-4"
                                    defaultActiveKey={0}
                                    allowMultipleExpanded={false}
                                    // uuid = {}
                                    >
                                        <Accordion.Item eventKey={1}>
                                            <Accordion.Header>
                                                Deposit via paybil number
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <PaymentInstructions/> 
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </Form>

                {/* The deposits table */}
                <div></div>
            </>
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

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<>{message && <div role="alert" className={`rounded-md fade alert alert-${c} show`}>{message?.message}</div>} </>);

    };

    return (
        <React.Fragment>
            <div className="homepage">
                <FormTitle/>
                <div className="col-md-12 mt-2  p-2">
                    <div className="pb-0" data-backdrop="static">
                        <DepositForm/>
                    </div>
                </div>
                <div className='mx-2 mt-3'>
                    <StdTable headers={tableHeaders} data={pastDeposits} emptymessage="No Deposits. Please make your first deposit"/>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Deposit
