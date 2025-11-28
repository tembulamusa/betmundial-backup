import React from "react";
import { FiCheckCircle } from "react-icons/fi";

import PlayStore from '../../../assets/img/general-website/google-play-badge.png';
import AppStore from '../../../assets/img/general-website/appstore_badge.svg';
import AppBanner from '../../../assets/img/banner/App.png';

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));

const MobileApp = () => {
    return (
        <>
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className=' inline-block'>
                    betmundial APP
                </h4>
            </div>

            <div className='std-medium-width-block'>

                <div className="block">
                    <div className="w-full justify-center items-center">

                        <h3>Download Today and Enjoy bonuses of Upto 500 !</h3>

                        <div className="flex gap-2 items-center mt-2">
                            <a href="#" target="_blank" className="btn img">
                                <img src={PlayStore} alt="Google Play Store" className="w-38 h-16" />
                            </a>
                            <a href="#" target="_blank" className="btn img">
                                <img src={AppStore} alt="Apple App Store" className="w-38 h-16" />
                            </a>
                        </div>

                        <ul className="block my-4">

                            <li className="flex items-center my-2">
                                <FiCheckCircle className="text-custom-red mr-2" />
                                Stream LIVE games
                            </li>
                            <li className="flex items-center my-2">
                                <FiCheckCircle className="text-custom-red mr-2" />
                                Play 4 virtual leagues
                            </li>
                            <li className="flex items-center my-2">
                                <FiCheckCircle className="text-custom-red mr-2" />
                                Lighter and faster
                            </li>
                            <li className="flex items-center my-2">
                                <FiCheckCircle className="text-custom-red mr-2" />
                                Share betslip
                            </li>
                            <li className="flex items-center my-2">
                                <FiCheckCircle className="text-custom-red mr-2" />
                                Light &amp; dark mode
                            </li>
                            <li className="flex items-center my-2">
                                <FiCheckCircle className="text-custom-red mr-2" />
                                Instant notifications
                            </li>
                        </ul>


                    </div>

                    <div className="d-block w-100 mt-4">
                        <img className="hero" src={AppBanner} alt="App Banner" />
                    </div>

                </div>

            </div>

        </>
    );
}

export default MobileApp;
