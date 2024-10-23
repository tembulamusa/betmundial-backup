import React, { useContext } from 'react';
import { Context } from '../../../context/store';

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));

const Exclude = () => {
    const [state] = useContext(Context);
    return (
        <>
            <div className='col-md-12 bg-primary p-4 text-center profound-text'>
                <h4 className="inline-block">Self exclusion</h4>
            </div>
            <div className="col-md-12 py-5 px-4">
                <p>
                    This self-exclusion page provides you with the option to take a break from
                    gambling activities for a specific period of time. By utilizing this feature,
                    you can restrict your access to our platform, preventing yourself from placing bets
                    and engaging in gambling activities.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '50px' }}>                   
                    <div className="form-group">
                        <label>Your phone number:</label>
                        <span className="phone-number" style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                            {state?.user?.msisdn}
                        </span>
                    </div>

                    <div className="form-group" style={{ textAlign: 'center', marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem' }}>
                            Select period of exclusion:
                        </label>
                        <select className="custom-select" style={{ width: '100%', padding: '10px', fontSize: '1.2rem' }}>
                            <option value="">Select a period</option>
                            <option value="6">6 months</option>
                            <option value="12">1 year</option>
                            <option value="24">2 years</option>
                            <option value="-1">Indefinitely</option>
                        </select>
                    </div>


                    <button className="tf-btn" style={{ backgroundColor: 'red', color: 'white', fontSize: '1.2rem', padding: '12px 24px', border: 'none', borderRadius: '5px', width: '50%' }}>
                        Exclude me from betting
                    </button>
                </div>
            </div>
        </>
    );
};

export default Exclude;
