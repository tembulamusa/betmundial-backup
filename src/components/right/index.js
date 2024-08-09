import React, {useState, useContext, useEffect, useCallback} from 'react';
import QuickLogin from './quick-login';
import CompanyInfo from './company-info';
import BetSlip from './betslip';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Badge} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Context } from '../../context/store';
import {
    getBetslip,
    getJackpotBetslip,
} from '../utils/betslip';
import Mpesa from "../../assets/img/mpesa-1.png";
import Airtelmoney from "../../assets/img/airtelmoney.png";
import { useLocation } from 'react-router-dom';

const AlertMessage = (props) => {
    return (
        <div className={`alert alert-dismissible ${props.classname}`} role='alert'>
            <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span
                aria-hidden='true'>×</span>
            </button>
            {props.message}
        </div>
    )
}

const SlipCounter = (props) => {
    const {sliptype} = props;
    const [state, dispatch] = useContext(Context);

    return (
        <span className=''>{state?.sliptype?.count || 0}</span>
    )
}

const SharedBetslip = (props) => {

    return (
        <div className='std-block p-3'>
            <div className='my-3 text-center text-2xl'>You have not selected any bet. <br/>Make your first pick to start playing.</div>
            <hr/>
            <div className='my-3'>
                <h2 className='mb-3'>Or Introduce your bet code:</h2>
                <input placeholder='eg BsjUL' className='mr-3 rounded-xl std-input px-3 py-2 mb-3 border border-gray-200'/>
                <button className='capitalize secondary-bg bg-pink p-3 px-3 py-2 font-bold btn-pink border-none rounded-xl text-white uppercase px-4 hover:opacity-80'>ADD</button>
            </div>
            </div>
    )
}
const LoadedBetslip = (props) => {
    const {jackpot, betslipValidationData, jackpotData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);
    const [state, dispatch] = useContext(Context);

    const [hasBetslip, setHasBetslip] = useState(false);

    useEffect(() => {
        if(state?.betslip || state?.jackpotbetslip){
            if(Object.entries(state?.betslip).length > 0){setHasBetslip(true)} else {setHasBetslip(false)};
        } else {
            setHasBetslip(false);
        }
    },[state?.betslip, state?.jackpotbetslip]);
    
    return (
        <>
            {!hasBetslip ? <SharedBetslip /> : ""}

            <div className="betslip-container block">
                {props?.message && <AlertMessage classname={props.classname} message={props.message}/>}
                <div className="bet-option-list sticky-top" id=''>
                    <div className="bet alu block-shadow">
                        <button id="slip-button-close" type="button" className="close mobi" aria-hidden="true">×</button>
                        <div id="betslip" className="betslip">
                            <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}
                                     jackpotData={jackpotData}/>
                        </div>
                        <QuickLogin/>
                    </div>
                </div>
                
            </div>
            <div
                className={`fixed-bottom text-white d-block d-md-none shadow-sm betslip-container-mobile ${betSlipMobile ? 'd-block' : 'd-none'}`}>
                <div className="bet-option-list sticky-top" id=''>
                    <div className="bet alu  block-shadow">
                        <header style={{marginTop: "60px"}}>
                            <div className="betslip-header d-flex justify-content-between">
                                <span className="col-sm-8 slp">BETSLIP</span>
                                <span className="col-sm-2 slip-counter d-flex justify-content-center"
                                      title={'Hide BetSlip'} onClick={() => setBetSlipMobile(false)}>
                                    <FontAwesomeIcon icon={faTimes} className={'align-self-center'}/>
                                </span>
                            </div>
                        </header>
                        <div id="betslip" className="betslip">]
                            <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}/>
                        </div>
                        <QuickLogin/>
                    </div>
                </div>
            </div>
            <div
                className={`${betSlipMobile ? 'd-none' : 'd-block'} d-block d-md-none fixed-bottom text-center text-white bg-tertiary bet-slip-footer-toggle`}
                onClick={() => setBetSlipMobile(true)}>
                Click to show BetSlip
            </div>
        </>
    )
}


const Right = (props) => {
    const [tabKey, setTabKey] = useState("normal");
    const {jackpot, betslipValidationData, jackpotData} = props;
    const location = useLocation();
    const {pathname} = location;

    return (
        <>
        <div className="col-md-3 betslip-container sticky-top">
            <section id='betslip' className='betslip-v2'>
                <div className='betslip-header bg-secondary uppercase'>
                    Betslip
                </div>
                <div id='betslip-content' className='betslip-content'>
                    <LoadedBetslip sliptype = "normal" jackpot={jackpot} jackpotData={jackpotData} betslipValidationData={betslipValidationData} />
                </div>
            </section>
            <section className='betslip-paybill bg-secondary'>
                <div className="paybillnumbers pt-3 bg-secondary">
                    <h2>Paybill Numbers</h2>
                    <p>Your account/reference number should be your registered number.</p>
                    <ul>
                        <li class="mpesa">
                        <span class="lazy lazy-loaded"><img src={Mpesa} style={{maxWidth:"50px"}} alt='paybill'/></span>
                        <span>599488</span>
                        </li>
                        {/* <li class="airtelmoney">
                            <span class="lazy lazy-loaded"><img src={Airtelmoney} style={{maxWidth:"50px"}}/></span>
                            <span>599488 or SPORTMULA</span>
                        </li> */}
                    </ul>
                </div>
            </section>

            <section className='betslip-paybill bg-secondary'>
                <div className="paybillnumbers pt-3 bg-secondary">
                    <h2>Customer Care</h2>
                    <p>Surebet is the place to be all day long for 24/7 customer support.</p>
                    <div className='text-3xl py-3'>0724599488</div>
                    <p>customercare@surebet.co.ke</p>
                </div>
            </section>
            <section id='nav-tabs'>
                

                {/* <div className='std-block'><CompanyInfo/></div> */}
            </section>
            
        </div>
        </>
    )
}
export default Right;
