import React from 'react';
import { Formik, Form, Field } from 'formik';

const CheckDepositStatus = () => {
    const initialValues = { msisdn: '' };

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            setSubmitting(false); 
        }, 1000);
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
                                <div className='col-md-12 primary-bg p-4 text-center'>
                                    <h4 className="inline-block">
                                        Check Deposit Status
                                    </h4>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '50px' }}> 
                                    <p style={{ width: '50%', textAlign: 'center', margin: '0 auto' }}>
                                        Need to check if your deposit has reflected? Copy the 
                                        MPESA message you received and paste it in the field below.
                                    </p>
                                </div>
                                <div className="col-md-12 py-5 px-4">
                                    <div className="col-md-12">
                                        <label style={{ display: 'block', textAlign: 'center' }}>MPESA Message</label>
                                        <Field
                                            as="textarea"
                                            name="msisdn"
                                            className="form-control block px-3 py-3 rounded-2xl std-input"                                 
                                            rows={4} 
                                            style={{
                                                width: '50%',
                                                margin: '0 auto', 
                                                resize: 'none', 
                                            }} 
                                        />
                                    </div>
                                </div>

                                <div>
                                <div className="d-flex justify-content-center">
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
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CheckDepositStatus;
