import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/store";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import StdTable from "../utils/std-table";
import makeRequest from "../utils/fetch-request";

const CheckMpesaDepositStatus = (props) => {
    const [state, dispatch] = useContext(Context);
    

    const CheckMpesaDepositStatusForm = (props) => {
        const [fakeMessage, setFakeMessage] = useState(false);
        const [mpesa_code] = useState("")
        const initialValues = { mpesa_code: '' };

        const handleSubmit = (values, { setSubmitting }) => {
            // Validate the code first
            if(mpesa_code.length > 2) {
                setFakeMessage(true);
            }
        };

        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="pt-0">
                            <div className="row form-block">
                                <div className='text-center'>
                                    

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}> 
                                        <p>
                                            Need to check if your deposit has reflected? Copy the 
                                            MPESA message you received and paste it in the field below.
                                        </p>
                                    </div>
                                    <div className="col-md-12 py-5">
                                        {fakeMessage && <div className="mb-3 alert alert-danger">You'll receive a message shortly! contact support on </div>}
                                        <div className="col-md-12">
                                            <label style={{ display: 'block', textAlign: 'left' }}>MPESA Message Code</label>
                                            <Field
                                                placeholder="eg EDK98G76HHKB"
                                                as="textarea"
                                                name="mpesa_code"
                                                className="form-control block py-3 rounded-2xl std-input"                                 
                                                rows={4} 
                                                style={{
                                                    resize: 'none', 
                                                }} 
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            className={`btn btn-lg btn-primary mt-5 deposit-withdraw-button font-bold`} 
                                            disabled={isSubmitting}
                                        >
                                            Check Now
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }


    const PastUserDeposits = (props) => {
        const [pastDeposits, setPastDeposits] = useState(null);
        const [tableHeaders, ] = useState(["Date", "Amount", "Surebet Balance"]);

        const requestUserDeposits = () => {
            let endpoint = '/v1/deposits';
            
            makeRequest({url: endpoint, method: 'GET', api_version:3}).then(([status, response]) => {
                
                if(status == 200) {
                    setPastDeposits(response?.data?.deposits)
                }
            })
    
        }

        useEffect(() => {requestUserDeposits()}, [])
        return(
            <>
                {pastDeposits &&
                    <>
                        <h1 className="text-2xl text-gray-600 my-2">Past Deposits</h1>
                        <StdTable headers={tableHeaders} data={pastDeposits} emptymessage="No Deposits. Please make your first deposit"/>
                    </>
                }
                
            </>
        )
    }
    return (
        <>
            <Modal
            show={state?.showcheckmpesadepositstatus === true}
            onHide={() => dispatch({type:"SET", key:"showcheckmpesadepositstatus", payload:false})}
            dialog className="popover-login-modal"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="no-header">
                      <Modal.Title>Confirm Mpesa Deposit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <CheckMpesaDepositStatusForm />

                        {/* Check past deposits */}
                        {state?.user && <PastUserDeposits />}
                    </Modal.Body>
            </Modal>
        </>
    )

}

export default React.memo(CheckMpesaDepositStatus)