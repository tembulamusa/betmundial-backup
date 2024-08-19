import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickLogin from './quick-login';
import CompanyInfo from './company-info';
import BetSlip from './betslip-biko';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import ShareModal from "../sharemodal";
import { Context } from "../../context/store";

const AlertMessage = (props) => {
    // const betslipLength = len(BetSlip);
    return (
        <div className={`alert alert-dismissible ${props.classname}`} role='alert'>
            <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span
                aria-hidden='true'>×</span>
            </button>
            {props.message}
        </div>
    )
}

const Right = (props) => {
    const [state, dispatch] = useContext(Context);
    const { jackpot, betslipValidationData, jackpotData,showBetSlipFromTop, mobileslip } = props;
    const [bongeBonusMessage, setBongeBonusMessage] = useState('Chagua mechi 3 au zaidi uweze kupata Bonge Bonus');
    const [betslip] = useState(Object.keys(state?.betslip || {}).length);
    const [total_odds, setTotalOdds] = useState(1.0);
    const [showAppSlipPage, setShowAppSlipPage] = useState(false);
   
    const calculateOdds = () => {
        let result = 1;
        for (let key in state?.betslip) {
        result *= parseFloat(state?.betslip[key].odd_value);
        result = Math.round(result * 100) / 100;
        setTotalOdds(result);
        }
    }

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
        setShowAppSlipPage(false);
    
    }
    
    useEffect(() => {
        calculateOdds();
        updateBongeBonusMessage();
    }, [state?.betslip])


    useEffect(() => {
        if(state?.jpbetpressed || state?.betslippressedfromabove) {
            setShowAppSlipPage(true);
        } else {
           RemoveShowAppBetslipPage();
        } 
    
    }, [state?.jpbetpressed, state?.betslippressedfromabove])

    const BongeBetMarkupMessage = () => {
        return (
            <div className="bonge-bonus" style={{ padding: "5px", background: "#fbd702", marginTop: "3px" }} >
                <div className="" >
                    <div className="" id="bonus-centage-advice" style={{ fontWeight: "100" }}>{bongeBonusMessage}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="col-md-3 gn betslip-container sticky-top">
            <div className={`betslip-container ${mobileslip ? '' : 'd-none d-md-block'}` } >
                {props?.message && <AlertMessage classname={props.classname} message={props.message} />}
                <div className="bet-option-list sticky-top" id=''>
                    <div className="bet alu block-shadow">
                        <header>
                            <div className="betslip-header">
                                <span className="col-sm-2 bkmrk">
                                    <i className="fa fa-bookmark" aria-hidden="true"></i></span>
                                <span className="col-sm-8 slp">BETSLIP/JAMVI </span>
                                <span className="col-sm-2 slip-counter">({Object.keys(state?.betslip || {}).length})</span>
                                {Object.keys(state?.betslip || {}).length > 0 && (<span className="col-sm-2 float-end share-btn btn btn-light"
                                    style={{ marginTop: "4px", width: "fit-content" }}
                                    onClick={showShareModalDialog} ><span><FontAwesomeIcon icon={faShare} /> </span><span>Share</span></span>)}

                            </div>
                        </header>
                        <div id="betslip" className="betslip">
                            { (!jackpot && bongeBonusMessage) && <BongeBetMarkupMessage /> }
                            <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}
                                jackpotData={jackpotData} />
                        </div>
                        <QuickLogin />
                    </div>
                </div>
                <CompanyInfo />
            </div>
            <Link  to="/mobile-betslip" 
                className={`${(window.location.pathname.startsWith('/mobi') ||jackpot == true)? 'd-none' : 'd-block'} fixed-bottom text-center text-white bg-info bet-slip-footer-toggle d-md-none`} >
                    <table
                        style={{ borderTop: '1px solid #ffffff61', position: 'fixed', bottom: '0', padding: '5px', backgroundColor: '#0C3C5A', maxWidth: '768px', width: "100%", color: "black" }}
                        className="full-width" >
                        <tbody>
                        <tr>
                            <td style={{ width: "100%", colspan: "3" }}>
                                <table className="bet" style={{ background: 'yellow', width: "100%" }} >
                                    <tbody>
                                    <tr>
                                        <td style={{ fontSize: "12px", width: "100%" }} id="bonus-advise-message"> { bongeBonusMessage }</td>
                                    </tr>
                                   </tbody>
                                </table>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontSize: "12px", color: "white" }}>
                             <table>
                              <tbody>
                              <tr>
                                <td  style={{ width:"25%"}}>
                                    <span> 
                                     <div style={{ textDecoration: "none", color: "unset", padding: "10px 5px", borderRadius: "4px" }} >
                                        <span style={{ color: "#fff", paddingRight:"5px" }} >BETSLIP</span>
                                        <span 
                                          style={{ backgroundColor: "#c6224e", 
                                                  color: "#ffffff", 
                                                  padding: "3px 6px", 
                                                  borderRadius: "224px", 
                                                  borderTop: "0.8px solid #ffffff61", 
                                                  fontSize: "10px" }} 
                                           id="betslip-count-footer" 
                                           className="betslip--count slip-counter"
                                        > ({Object.keys(state?.betslip || {}).length}) </span>
                                    </div>
                                    </span>
                                </td>

                                <td style= {{ width:"25%", color:"white", fontSize:"12px", borderRadius:"4px", textAlign:"center" }}> ODDS: <span id="total_odd"> {total_odds} </span> </td>
                                <td style= {{ width:"25%",  fontSize:"12px", padding:"1px", textAlign:"center", paddingLeft:"2rem"}}>
                                    <span style={{ width: "25%" }}> <p className="dark-gray success-btn btn-primary-light pl-2 pr-2 btn uppercase w-500" 
                                    style={{ margin: "5px 0", fontSize: "12px", cursor: "pointer", fontWeight: "500", background:"#34b3bf", 
                                    textTransform: "uppercase", paddingLeft:".5rem !important", color:"#fff", }} >BET NOW</p> </span>
                                </td>
                               </tr>
                               </tbody>
                             </table>
                            </td>
                        </tr>
                       </tbody>
                    </table>
            </Link>
        </div>
    )
}
export default Right;
