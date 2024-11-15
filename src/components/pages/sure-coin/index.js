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
import TakeBetsTimer from "./take-bets-timer";


const SureCoinIndex = (props) => {
    const [state, dispatch] = useContext(Context);
    const [userCoinCount, setUserCoinCount] = useState(1);
    const [isSpinning, setIsSpinning] = useState(false);
    const [userMuted, setUserMuted] = useState(getFromLocalStorage("surecoinmuted"));
    const [bIDrslts, setBIDrslts] = useState(null);
    const [coinsAlertMsg, setCoinsAlertMsg] = useState(null);
    const [timeToNextStart, setTimeToNextStart] = useState(4000);

    const [runCoinSpin, setRunCoinSPin] = useState(false);

    // On Run coin spin
    useEffect(() => {
        if (runCoinSpin) {
            // const timeoutId = setTimeout(() => {
                let generatedSession = null
                if (state?.user?.profile_id) {
                    let now = Date.now();
                    generatedSession = state?.user?.profile_id + ":" + now
                } else {
                    return
                }
                placeBet(generatedSession);
               
        }
        
        
    }, [runCoinSpin]);

    const isMutedToggle = () => {

        if(userMuted) {
            setLocalStorage("surecoinmuted", !userMuted, 1000 * 60 * 60 * 24 * 7)
            setUserMuted(!userMuted);
        } else {
            setLocalStorage("surecoinmuted", true, 1000 * 60 * 60 * 24 * 7)
            setUserMuted(true)
        }
    }

    useEffect(() => {
        let spintimeout = false;
        if (runCoinSpin){
            spintimeout = setTimeout(() => {
                setRunCoinSPin(false)
            }, timeToNextStart)
        }
        return () => {clearTimeout(spintimeout)};
    }, [runCoinSpin])


    function elizabeth(encryptedData, encryptionKey) {
        try {
        const adjustedKey = encryptionKey.padEnd(16, '0').substring(0, 16);
    
        const key = CryptoJS.enc.Utf8.parse(adjustedKey);
    
        const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);
    
        const decryptedBytes = CryptoJS.AES.decrypt(
            { ciphertext: encryptedBytes },
            key,
            {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
            }
        );
    
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
        } catch (error) {
        return null;
        }
  }
  
  useEffect(() => {
    dispatch({type: "SET", key: "surecoinlaunched", payload: true});

    return () => {
        dispatch({type:"DEL", key:"surecoinlaunched"})
    }
  }, [])

    const placeBet = (session) => {
        if (state?.coinselections?.[1]?.userbeton ) {
            let endpoint = 'place-bet';
            makeRequest({url: endpoint, 
                method: 'POST',
                data: {session_id: session, profile_id: state?.user?.profile_id, coin_side: state?.coinselections?.[1]?.pick?.toUpperCase(), bet_amount: state?.coinselections?.[1]?.amount},
                api_version:"sureCoin"}).then(([status, response]) => {
                if(status == 200) {
                    let cpBt = elizabeth(response, process.env.REACT_APP_OTCMEKI);
                    if (cpBt?.[process.env.REACT_APP_RSPST] == 200) {
                        dispatch({type:"SET", key: "toggleuserbalance", payload:state?.toggleuserbalance ? !state?.toggleuserbalance : true})
                        setTimeout(() => {getCoinRoll(cpBt?.[process.env.REACT_APP_BID], session)}, 1000)
                    } else {
                        setCoinsAlertMsg({status: 400, message: cpBt?.[process.env.REACT_APP_MGS] || "An error Occurred"})
                    }
                    
                } else {
                    setCoinsAlertMsg({status:400, message: response?.error?.mesage || response?.result || "An Error occurred"})
                }
            })
        } else {
            setBIDrslts(null)
            return
        }
   }

    const getCoinRoll = (btID, session) => {
        // get session id and use it
        let endpoint = 'coin-roll';
        makeRequest({url: endpoint,
                method: 'POST',
                data: {session_id: session, bet_id: btID, profile_id: state?.user?.profile_id},
                api_version:'sureCoin'}).then(([status, response]) => {
            let cpBt = elizabeth(response, process.env.REACT_APP_OTCMEKI);
            if(status == 200) {
                setBIDrslts(response);
            } else {
                setCoinsAlertMsg({status: 400, mesage: "An error occurred"});
            }
        })
    }
    

    const StatsInfo = () => {

        return (
            <>
                <div>Round: 67</div>
                <hr />
                <div className="scores">
                    <div>Online: 6000</div>
                    <div> Heads: 55% </div> <div> Tails: 45% </div>
                </div>

            </>
        )
    }



    return (
        <>

        <div className="launched-sure-coin">
            {/* <PageHeader /> */}
            <div className="surecoin-body">
                <div className="surecoin-main md:flex">
                    <div className={`sure-coin-betting-section md:flex-col  w-full md:w-6/12 mx-auto`}>
                        <div className="sure-coin-header row relative">
                            {coinsAlertMsg && 
                                <div className={`sure-alert height-hide ${coinsAlertMsg.status == 200 ? "success" : "error"}`}>{coinsAlertMsg.message}</div>
                            }
                            <div className="col-sm-4 w-4/12 md:w-6/12 col-md-6 ">
                                <div className="flex"><img src={SureCoinLogoImg} className="surecoin-logo-img" /> SureCoin <span className=""><FaQuestion className="inline-block md:hidden"/><button className="hidden md:inline-block basic-highlight-alert ml-3 font-[300] bg-[#f5a623] text-[#5f3816] rounded-md px-3">How to play</button></span></div>
                            </div>
                            <div className="col-sm-8 w-8/12 md:w-6/12 col-md-6">
                                <div className="float-end flex">
                                    <div className="inline-block text-3xl" onClick={() => isMutedToggle()}>{userMuted ? <BiSolidVolumeMute /> : <FaVolumeHigh />}</div>
                                    </div>
                            </div>
                        </div>
                        <div className="casino-service-sure-coin relative">

                            <div className="coin-extra-info coin-quick-stats">
                                <StatsInfo />
                            </div>

                            <div className="rotating-images-wrapper coin-sections">
                                { Array(userCoinCount).fill(1).map((coin, idx) => (
                                    <div className="rotating-image-container">
                                        <RotatingCoin 
                                            coinnumber={idx + 1}
                                            isspinning={runCoinSpin}
                                            usermuted={userMuted}
                                            rslt = {bIDrslts}
                                            cvterfxn = {elizabeth}/>

                                    </div>
                                ))}
                            {!runCoinSpin ? <TakeBetsTimer  setRunCoinSpin={setRunCoinSPin}/> : <div className="bets-timer-empty-holder"></div>}
                            </div>
                            <div className="bet-control">
                                { Array(userCoinCount).fill(1).map((coin, idx) => (
                                    <div className="coin-settings">
                                        <CoinStakeChoice
                                            coinnumber={idx + 1}
                                            isspinning={runCoinSpin}
                                            rslt = {bIDrslts}
                                            cvterfxn = {elizabeth}
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
                
                {/* <div className="additional-data">

                </div> */}
            </div>
        </div>

        {/* <DepositModal /> */}
        
        </>
    )
}



export default React.memo(SureCoinIndex)
