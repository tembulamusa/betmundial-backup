import React, {useState, useContext, useEffect} from 'react';

import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import mpesa from '../../../assets/img/mpesa.png'
import {Context} from '../../../context/store';
import Notify from '../../utils/Notify';
import Accordion from 'react-bootstrap/Accordion';
import '../../../assets/css/accordion.react.css';
import StdTable from '../../utils/std-table';
import { Link } from 'react-router-dom';
import { GoAlertFill } from "react-icons/go";


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
                
                <div className="form-group row d-flex justify-content-center mt-4">
                    
                    <div className="row">
                        <label className=''>Amount to Deposit</label>
                        {message && <div className='mt-3 font-bold'><Alert/></div> }
                        <input
                            onChange={ev => onFieldChanged(ev)}
                            style={{borderTopRightRadius:"0px", borderBottomRightRadius:"0px"}}
                            className="text-dark deposit-input form-control !w-9/12 input-field"
                            id="amount"
                            name="amount"
                            type="text"
                            value={values.amount}
                            placeholder='Enter Amount'
                        />
                        {errors.amount && <div className='text-danger'> {errors.amount} </div>}
                        <button
                            disabled={isLoading}
                            style={{borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}
                            className='btn btn-lg btn-primary bg-primary !w-3/12 deposit-withdraw-button'>
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

        const DepositSelfService = (props) => {

            return (
                <Link to={"/self-service"}>
                    <div className='flex'>
                        <GoAlertFill className='text-3xl mr-4 align-middle mt' size={30}/>
                        <div className=''>
                            <div className='font-bold'>Missing Deposit</div>
                            <div className='block font-[500] opacity-70'>Deposit not reflecting? sort your missing deposit here</div>
                        </div>
                    </div>
                </Link>
            )
        }

        return (
            <>
                <Form className="rounded border-0">
                    <div className="pt-0">
                        <div className="row px-3">
                            <div className='col-6 text-center'>
                                <img src={mpesa} alt=""/>
                            </div>

                            <div className='col-6'>
                                <div className='font-bold text-gray-400 md:text-right'>{state?.user?.msisdn}</div>
                            </div>
                        </div>
                        <hr className='my-2'/>
                        <div className='row'>
                            <div className='col-md-6'>
                                <DepositFormFields onFieldChanged={onFieldChanged} values={values} errors={errors}/>
                                
                                <div className='md:hidden'><DepositSelfService /></div>

                                <Accordion 
                                className="accordion mt-4"
                                defaultActiveKey={0}
                                allowMultipleExpanded={false}
                                // uuid = {}
                                >
                                    <Accordion.Item eventKey={0}>
                                        <Accordion.Header className='capitalize'>
                                            <span className='capitalize'>Deposit via paybill number (599488)</span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <PaymentInstructions/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                            <div className='col-md-6 mt-4 hidden md:block pl-5'><DepositSelfService /></div>
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
