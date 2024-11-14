import React, { useContext, useEffect, useState } from "react";
import RotatingCoin from "./rotating-coin";
import CoinStakeChoice from "./coin-stake-choice";
import { Context } from "../../../context/store";
import { FaCog, FaComments, FaInfo, FaQuestion } from "react-icons/fa";
import { getFromLocalStorage, setLocalStorage } from "../../utils/local-storage";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import DepositModal from "../../webmodals/deposit-modal";
import { BiSolidVolumeMute } from "react-icons/bi";
import { FaVolumeHigh } from "react-icons/fa6";
import SureCoinLogoImg from '../../../assets/img/svgicons/surecoin.svg';
import makeRequest from "../../utils/fetch-request";
import CryptoJS from "crypto-js";
import Notify from "../../utils/Notify";
import { error } from "logrocket";


const SureCoinIndex = (props) => {
    const [state, dispatch] = useContext(Context);
    const [userCoinCount, setUserCoinCount] = useState(1);
    const [userChoices, setUserChoices] = useState({});
    const [timeToStart, setTimeToStart] = useState(5);
    const [timeToEnd, setTimeToEnd] = useState(10);
    const [isTakingBet, setIsTakingBet] = useState(false);
    const [isPostingChoices, setIsPostingChoices] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [preparingToSpin, setPreparingToSpin] = useState(false);
    const [dummyTriggerCounter, setDummyTriggerCounter] = useState(9);
    const [userBal, setUserBal] = useState(0.00);
    const [userMuted, setUserMuted] = useState(getFromLocalStorage("surecoinmuted"));
    const [cROTCM, setCROTCM] = useState([]);
    const [isFetchingOutcome, setIsFetchingOutcome] = useState(false);
    const [canBet, setCanBet] = useState(true);
    const [checkingCanBet, setCheckingCanBet] = useState(false);
    const [newSessionId, setNewSessionId] = useState(null);
    const [bTDI, setBTDI] = useState(null);
    const [canPlay, setCanPlay] = useState(false);
    const [bIDrslts, setBIDrslts] = useState(null);
    const [coinsAlertMsg, setCoinsAlertMsg] = useState(null);


    // Dummy trigger
    useEffect(() => {
        if (dummyTriggerCounter == 10) {
            const timeoutId = setTimeout(() => {
                let generatedSession = null
                if (state?.user?.profile_id) {
                    let now = Date.now();
                    generatedSession = state?.user?.profile_id + ":" + now
                } else {
                    dispatch({type:"SET", key:"showloginmodal", payload:true});
                    return
                }
                setNewSessionId(generatedSession);
                placeBet(generatedSession);
                setDummyTriggerCounter(9)
              }, 5000);
            
            return;
        }
        
        // if 
        const timer = setInterval(() => {
            setDummyTriggerCounter((prevCount) => Math.max(prevCount - 1, 0));
          }, 1000);
        if (dummyTriggerCounter == 0) {
            setDummyTriggerCounter(10)
            setIsSpinning(false);
            clearInterval(timer);
        }
        return () => clearInterval(timer); // Cleanup on unmount
    }, [dummyTriggerCounter]);

    const isMutedToggle = () => {

        if(userMuted) {
            setLocalStorage("surecoinmuted", !userMuted, 1000 * 60 * 60 * 24 * 7)
            setUserMuted(!userMuted);
        } else {
            setLocalStorage("surecoinmuted", true, 1000 * 60 * 60 * 24 * 7)
            setUserMuted(true)
        }
    }

    function elizabeth(encryptedData, encryptionKey) {
        try {
            // Adjust key to ensure it is 128-bit (16 characters)
        const adjustedKey = encryptionKey.padEnd(16, '0').substring(0, 16);
    
        // Convert adjustedKey to a WordArray for use with CryptoJS
        const key = CryptoJS.enc.Utf8.parse(adjustedKey);
    
        // Decode the base64 encoded encrypted data
        const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);
    
        // Decrypt the data using AES with the parsed key
        const decryptedBytes = CryptoJS.AES.decrypt(
            { ciphertext: encryptedBytes },
            key,
            {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
            }
        );
    
        // Convert decrypted data to a UTF-8 string
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        // Parse and return the JSON if it is in JSON format
        return JSON.parse(decryptedData);
        } catch (error) {
        return null;
        }
  }
  

    const placeBet = (session) => {
        // get session id and use it
        let endpoint = 'place-bet';
        // for now, take the first coin

        setCheckingCanBet(true);
        makeRequest({url: endpoint, 
            method: 'POST',
            data: {session_id: session, profile_id: state?.user?.profile_id, coin_side: state?.coinselections?.[1]?.pick?.toUpperCase(), bet_amount: state?.coinselections?.[1]?.amount},
            api_version:"sureCoin"}).then(([status, response]) => {
            setCheckingCanBet(false);
            if(status == 200) {
                setIsSpinning(true);
                setCanBet(true);
                let cpBt = elizabeth(response, process.env.REACT_APP_OTCMEKI);
                console.log("THE PLACED BET +++++++  === ", cpBt)
                if (cpBt?.[process.env.REACT_APP_RSPST] == 200) {
                    setTimeout(() => {getCoinRoll(cpBt?.[process.env.REACT_APP_BID])}, 2000)
                } else {
                    setCoinsAlertMsg({status: 400, message: cpBt?.[process.env.REACT_APP_MGS] || "An error Occurred"})
                }
                
            } else {
                setCoinsAlertMsg({status:400, message: response?.error?.mesage || response?.result || "An Error occurred"})
            }
        })
   }

    const getCoinRoll = (btID) => {
        // get session id and use it
        let endpoint = 'coin-roll';
        setIsFetchingOutcome(true);
        makeRequest({url: endpoint,
                method: 'POST',
                data: {session_id: newSessionId, bet_id: btID, profile_id: state?.user?.profile_id},
                api_version:'sureCoin'}).then(([status, response]) => {
            setIsFetchingOutcome(false);
            let cpBt = elizabeth(response, process.env.REACT_APP_OTCMEKI);
            console.log("THE BET OUTCOME BET :::::::::::  === ", cpBt)
            if(status == 200) {
                setBIDrslts(response);
            } else {
                setCoinsAlertMsg({status: 400, mesage: "An error occurred"});
            }
        })
    }
    
    // const PageHeader = (props) => {

    //     return (
    //         <div className="surecoin-top-bar bg-primary border-b !font-[300] !border-transparent mb-0">
    //             <div className="row">
    //                 <div className="col-4">
    //                     <div className="px-2 surecoin-top-logo ">Surebet</div>
    //                 </div>
    //                 <div className="col-4">
    //                     <button
    //                         onClick={() => dispatch({type:"SET", key:"promptdepositrequest", payload:{show:true}})}
    //                         className="btn btn-light-primary surecoin-deposit-btn">Deposit</button>
    //                 </div>
    //                 <div className="col-4 px-2">
    //                     <Link to={"/"} className="hover:opacity-70"><IoIosClose className="float-end" size={40}/></Link>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    
    return (
        <>

        <div className="launched-sure-coin">
            {/* <PageHeader /> */}
            <div className="surecoin-body">
                <div className="surecoin-main md:flex">
                    <div className={`sure-coin-betting-section md:flex-col  w-full md:w-8/12`}>
                        <div className="sure-coin-header row relative">
                            {coinsAlertMsg && 
                                <div className={`sure-alert height-hide ${coinsAlertMsg.status == 200 ? "success" : "error"}`}>{coinsAlertMsg.message}</div>
                            }
                            <div className="col-4">
                                <div className="flex"><img src={SureCoinLogoImg} className="surecoin-logo-img" /> SureCoin <span className=""><FaQuestion className="inline-block md:hidden"/><button className="hidden md:inline-block basic-highlight-alert ml-3 font-[300] bg-[#f5a623] text-[#5f3816] rounded-md px-3">How to play</button></span></div>
                            </div>
                            <div className="col-8">
                                <div className="float-end flex">
                                    <div className="inline-block text-3xl" onClick={() => isMutedToggle()}>{userMuted ? <BiSolidVolumeMute /> : <FaVolumeHigh />}</div>
                                    {/* <div className="border-l text-3xl border-gray-100 ml-2 pl-2"><FaCog className="inline-block"/></div>
                                    <div className="border-l border-gray-100 ml-2 pl-2 text-3xl"><FaComments className="inline-block"/></div> */}
                                </div>
                            </div>
                        </div>
                        <div className="casino-service-sure-coin">
                            <div className="rotating-images-wrapper coin-sections">
                                { Array(userCoinCount).fill(1).map((coin, idx) => (
                                    <div className="rotating-image-container">
                                        <RotatingCoin 
                                            coinnumber={idx + 1}
                                            starttime={timeToStart}
                                            endtime={timeToEnd}
                                            isspinning={isSpinning}
                                            usermuted={userMuted}
                                            ispostingchoices={isPostingChoices}
                                            rslt = {bIDrslts}
                                            cvterfxn = {elizabeth}
                                            preparingtospin={preparingToSpin}/>

                                    </div>
                                ))}
                            </div>
                            {/* the add sections */}
                            <div className="bet-control">
                                { Array(userCoinCount).fill(1).map((coin, idx) => (
                                    <div className="coin-settings">
                                        <CoinStakeChoice
                                            coinnumber={idx + 1}
                                            starttime={timeToStart}
                                            endtime={timeToEnd}
                                            isspinning={isSpinning}
                                            rslt = {bIDrslts}
                                            cvterfxn = {elizabeth}
                                            ispostingchoices={isPostingChoices}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className={`comments-settings md:flex-col md:w-4/12 w-full`}>
                        tabs <br/>
                        changes to comments and settings alternatively
                    </div> */}
                </div>
                
                <div className="additional-data">

                </div>
            </div>
        </div>

        {/* <DepositModal /> */}
        
        </>
    )
}



export default React.memo(SureCoinIndex)