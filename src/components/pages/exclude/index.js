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
            
            <div className='std-medium-width-block'>
                <div className="col-md-12 py-5 px-4">
                    <p>
                        This self-exclusion page provides you with the option to take a break from
                        gambling activities for a specific period of time. By utilizing this feature,
                        you can restrict your access to our platform, preventing yourself from placing bets
                        and engaging in gambling activities.
                    </p>

                    <div className="flex flex-col items-center gap-5 mt-12">                   
                        <div className="form-group">
                            <label>Your phone number:</label>
                            <span className="phone-number font-bold ml-2">
                                {state?.user?.msisdn}
                            </span>
                        </div>

                        <div className="form-group text-center mt-5">
                            <label className="block mb-2 text-xl">
                                Select period of exclusion:
                            </label>
                            <select className="custom-select w-full p-2 text-xl">
                                <option value="">Select a period</option>
                                <option value="6">6 months</option>
                                <option value="12">1 year</option>
                                <option value="24">2 years</option>
                                <option value="-1">Indefinitely</option>
                            </select>
                        </div>

                        <button
                            className="my-3 w-full block capitalize secondary-bg bg-custom-red p-3 font-bold border-none text-white uppercase hover:opacity-80 rounded-2xl h-20" 
                        >
                            Exclude me from betting
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Exclude;
