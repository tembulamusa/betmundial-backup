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
import Cookies from 'js-cookie';
import makeRequest from "../../utils/fetch-request";

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
    const [dummyTriggerCounter, setDummyTriggerCounter] = useState(0);
    const [userBal, setUserBal] = useState(0.00);
    const [userMuted, setUserMuted] = useState(getFromLocalStorage("surecoinmuted"));
    const [spinningOutcome, setSpinningOutcome] = useState([]);
    const [isFetchingOutcome, setIsFetchingOutcome] = useState(false);
    const [canBet, setCanBet] = useState(true);
    const [checkingCanBet, setCheckingCanBet] = useState(false)


    // Dummy trigger
    useEffect(() => {
        if (dummyTriggerCounter == 10) {
            const timeoutId = setTimeout(() => {
                getCanBetonCoin();
                setDummyTriggerCounter(9)
              }, 8000);
            
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
    
    const getCanBetonCoin = () => {
    // get session id and use it
    let session = Cookies.get('sessionid');
    let endpoint = 'surecoin/canbet';
    setCheckingCanBet(true);
    makeRequest({url: endpoint, method: 'POST', data: {session_id: session}, api_version:2}).then(([status, response]) => {
        setCheckingCanBet(false);
        if(status == 200) {
            setIsSpinning(true);             
            setCanBet(true);
        } else {
            setIsSpinning(false);
            setCanBet(false);
        }
    })
   }

    const getSpinOutcome = () => {
        // get session id and use it
        let session = Cookies.get('sessionid');
        let endpoint = 'surecoin/outcome';
        setIsFetchingOutcome(true);
        makeRequest({url: endpoint, method: 'POST', data: {session_id: session}, api_version:2}).then(([status, response]) => {
            setIsFetchingOutcome(false);
            if(status == 200) {                
                setSpinningOutcome(response);
            } else {
                setSpinningOutcome(["failed"]);
            }
        })
    }
    
    useEffect(() => {
        if (isSpinning) {
            getSpinOutcome();
        }
    }, [isSpinning])
    
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
                        <div className="sure-coin-header row">
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
                                            spinningoutcome = {spinningOutcome}
                                            coinnumber={idx + 1}
                                            starttime={timeToStart}
                                            endtime={timeToEnd}
                                            isspinning={isSpinning}
                                            usermuted={userMuted}
                                            ispostingchoices={isPostingChoices}
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
                                            spinningoutcome = {spinningOutcome}
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