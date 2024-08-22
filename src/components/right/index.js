import React, {useState, useContext, useEffect, useCallback} from 'react';
import QuickLogin from './quick-login';
import CompanyInfo from './company-info';
import BetSlip from './betslip';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
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
const LoadedBetslip = (props) => {

    const {jackpot, betslipValidationData, jackpotData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);
    const [state, dispatch] = useContext(Context);

    const [hasBetslip, setHasBetslip] = useState(false);

    useEffect(() => {
        if(state?.betslip || state?.jackpotbetslip){
            if(Object.entries(state?.betslip||state?.jackpotbetslip || {}).length > 0){setHasBetslip(true)} else {setHasBetslip(false)};
        } else {
            setHasBetslip(false);
        }
    },[state?.betslip, state?.jackpotbetslip]);
    
    return (
        <>
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
                        <div id="betslip" className="betslip">
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
    const {jackpot, betslipValidationData, jackpotData} = props;
    const [state, dispatch] = useContext(Context);
    const [bongeBonusMessage, setBongeBonusMessage] = useState('Chagua mechi 3 au zaidi uweze kupata Bonge Bonus');


    
    const showShareModalDialog = () => {
        dispatch({ type: "SET", key: "showsharemodal", payload: true })
    }

    const updateBongeBonusMessage = () => {
        let win_matrix = {
            3: 3, 4: 5, 5: 10, 6: 15, 7: 20, 8: 25, 9: 30, 10: 35, 11: 40, 12: 45, 13: 50, 14: 55, 15: 60, 16: 65, 17: 70, 18: 80, 19: 90, 20: 100
        }
        let max_games = 16;
        let total_games = Object.keys(state?.betslip || {}).length;

        if (total_games > max_games) {
            total_games = max_games;
        }
        let centage = win_matrix[total_games];
        if (!(total_games in win_matrix)) {
            setBongeBonusMessage("Chagua mechi 3 au zaidi uweze kupata Bonge Bonus")
            return;
        }

        let bonusAdvice = "";
        if (total_games == 1) {
            bonusAdvice = "Ongeza mechi 2 uweza kupata WIN bonus ya 3% kuanzia mechi 3.";
        } else if (total_games == 2) {
            bonusAdvice = "Ongeza mechi 1 uweza kupata WIN bonus ya 3% kuanzia mechi 3.";
        } else {
            if (total_games > 2 && total_games <= 16) {
                var next_centage = win_matrix[total_games + 1]
                bonusAdvice = "Hongera umepokea WIN bonus ya "
                    + centage + "% kwa mechi " + total_games
                    + " Ongeza mechi 1 uweza kupata WIN bonus ya " + next_centage + "%";
            } else if (total_games > 16) {
                bonusAdvice = "Hongera umepokea WIN bonus ya "
                    + centage + "% kwa mechi " + total_games;
            }
        }
        setBongeBonusMessage(bonusAdvice);
    }


    const RemoveShowAppBetslipPage = () => {

        dispatch({ type: "DEL", key: "jpbetpressed" });
        dispatch({type: "DEL", key: "betslippressedfromabove"});
        // setShowAppSlipPage(false);

    }

    useEffect(() => {
        updateBongeBonusMessage();
    }, [state?.betslip])


    const BongeBetMarkupMessage = () => {
        return (
            Object.keys(state?.betslip || {}).length > 0 && <div className="bonge-bonus" style={{padding: "5px", background: "#fbd702", marginTop: "10px" }} >
                <div className="" >
                    <div className="" id="bonus-centage-advice" style={{ fontWeight: "100" }}>{bongeBonusMessage}</div>
                </div>
            </div>
        )
    }
    return (
        <>
        <div className="col-md-3 betslip-container sticky-top">
            <section id='betslip' className='betslip-v2'>
                <div className='betslip-header bg-secondary uppercase'>
                    Betslip 
                    <span className="col-sm-2 slip-counter"> ({Object.keys(state?.betslip || {}).length})</span>
                    {Object.keys(state?.betslip || {}).length > 0 && (<span className="col-sm-2 float-end share-btn btn btn-light"
                                    style={{ width: "fit-content" }}
                                    onClick={showShareModalDialog} ><span><FontAwesomeIcon icon={faShare} /> </span><span>Share</span></span>)}
                </div>
                <div id='betslip-content' className='betslip-content'>
                    { (!jackpot && bongeBonusMessage) && <BongeBetMarkupMessage /> }
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
