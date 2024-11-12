import React, { useContext, useEffect, useState } from "react";
import RotatingCoin from "./rotating-coin";
import CoinStakeChoice from "./coin-stake-choice";
import { Context } from "../../../context/store";
import { FaCog, FaComments, FaInfo } from "react-icons/fa";
import { getFromLocalStorage } from "../../utils/local-storage";

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


    // Dummy trigger
    useEffect(() => {
        if (dummyTriggerCounter == 10) {
            const timeoutId = setTimeout(() => {
                setIsSpinning(true);
                setDummyTriggerCounter(9)
              }, 7000);
            
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

    useEffect(() => {
        dispatch({type:"SET", key:"surecoinlaunched", payload:true})
        let userBalance = getFromLocalStorage("user");
        if(userBalance && userBalance.balance) {
            setUserBal(userBalance.balance);
        }
        return () => {
            dispatch({type:"DEL", key: "surecoinlaunched"})
        }

    }, [])
    
    const PageHeader = (props) => {

        return (
            <h4 className="text-centr col-md-12 text-enter justify-content-between">
                Surecoin
            </h4>
        )
    }
    return (
        <div className="launched-sure-coin">
            <PageHeader />
            <div className="surecoin-body">
                <div className="surecoin-main md:flex">
                    <div className={`sure-coin-betting-section md:flex-col  w-full md:w-8/12`}>
                        <div className="sure-coin-header row">
                            <div className="col-4">
                                SureCoin <span className=""><FaInfo className="inline-block md:hidden"/><button className="hidden md:inline-block basic-highlight-alert ml-3 font-[300] bg-[#f5a623] text-[#5f3816] rounded-md px-3">How to play</button></span>
                            </div>
                            <div className="col-8">
                                <div className="float-end flex">
                                    <div className="inline-block">{userBal} KES</div>
                                    <div className="border-l border-gray-100 ml-2 pl-2"><FaCog className="inline-block"/></div>
                                    <div className="border-l border-gray-100 ml-2 pl-2 "><FaComments className="inline-block"/></div>
                                </div>
                            </div>
                        </div>
                        <div className="casino-service-sure-coin">
                            <div className="rotating-images-wrapper coin-sections">
                                { Array(userCoinCount).fill(1).map((coin, idx) => (
                                    <div className="rotating-image-container"><RotatingCoin coinnumber={idx + 1} starttime={timeToStart} endtime={timeToEnd} isspinning={isSpinning} ispostingchoices={isPostingChoices} preparingtospin={preparingToSpin}/></div>
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
                                            ispostingchoices={isPostingChoices}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className={`comments-settings md:flex-col md:w-4/12 w-full`}>
                        tabs <br/>
                        changes to comments and settings alternatively
                    </div>
                </div>
                
                <div className="additional-data">

                </div>
            </div>
        </div>
    )
}


export default React.memo(SureCoinIndex)