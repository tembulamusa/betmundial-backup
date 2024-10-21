import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"


const Footer = (props) => {
//#24367e
    return (
        <footer className="footer-custom">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-white">
                    <h5 className='text-2x uppercase font-bld'>Surebet</h5>
                    <ul>
                        <li className="text-white">
                            BOX 2772 - 00606, NAIROBI
                        </li>
                        <li className="">
                            <a href="mailto:customercare@surebet.co.ke">
                                <FontAwesomeIcon icon={faEnvelope}/> customercare@surebet.co.ke
                            </a>
                        </li>
                        <li className="footer-icon">
                            <a href="https://www.facebook.com/kesurebet">
                                <FontAwesomeIcon icon={faFacebook}/> Facebook
                            </a>
                        </li>
                        <li className="footer-icon">
                            <a href="https://x.com/SurebetsKenya">
                                <FontAwesomeIcon icon={faTwitter}/> Twitter/X
                            </a>
                        </li>
                        <li className="footer-icon">
                            <a href="https://www.instagram.com/surebet_ke">
                                <FontAwesomeIcon icon={faInstagram}/> Instagram
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <h5>TERMS AND CONDITIONS</h5>
                    <ul>
                        <li className="">
                            <a href="/terms-and-conditions">Terms and Conditions</a>
                        </li>
                        <li className="">
                            <a href="/responsible-gambling">Responsible Gambling</a>
                        </li>
                        <li className="">
                            <a href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="">
                            <a href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="">
                            <a href="/how-to-play">How To Play</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <h5>LEGAL</h5>
                    <ul>
                        <li className="text-danger">
                            You must be 18 Years+ to use this website.
                        </li>
                        <li className="">
                            <a href="/dispute-resolution">Dispute Resolution</a>
                        </li>
                        <li className="">
                            <a href="/anti-money-laundering">Anti-money Laundering</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <h5>LICENSING</h5>
                    <hr/>
                    <p>
                    Surebet is Trademark of Risecom Limited. Risecom Limited is authorized and regulated by Betting Control and Licencing Board of Kenya (BCLB) under the betting, lotteries and gaming Act, Cap 131 under Licence No. 0000738
                    </p>
                </div>
            </div>
            <div className="container" id="navbar-collapse-main">
                <div className="footer-bottom text-center">
                    Copyright &copy; {new Date().getFullYear()} All rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
