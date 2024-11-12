import React, { useContext, useEffect, useState } from "react";
import RotatingCoin from "./rotating-coin";
import CoinStakeChoice from "./coin-stake-choice";
import { Context } from "../../../context/store";

const SureCoinIndex = (props) => {
    const [state, dispatch] = useContext(Context);
    const [userCoinCount, setUserCoinCount] = useState(2);
    const [userChoices, setUserChoices] = useState({});
    const [timeToStart, setTimeToStart] = useState(5);
    const [timeToEnd, setTimeToEnd] = useState(10);
    const [isTakingBet, setIsTakingBet] = useState(false);
    const [isPostingChoices, setIsPostingChoices] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [preparingToSpin, setPreparingToSpin] = useState(false);
    const [dummyTriggerCounter, setDummyTriggerCounter] = useState(0);


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
        return () => {
            dispatch({type:"DEL", key: "surecoinlaunched"})
        }
    }, [])
    
    const PageHeader = (props) => {

        return (
            <h4 className="text-centr col-md-12 bg-primary p-2 text-enter justify-content-between">
                Surecoin
            </h4>
        )
    }
    return (
        <div className="launched-sure-coin">
            <PageHeader />
            <div className="surecoin-body">
                <div className="surecoin-main flex">
                    <div className={`sure-coin-betting-section flex-col  w-8/12`}>
                        <div className="sure-coin-header">
                            <div className="">
                                SureCoin
                            </div>

                            <div className="">
                                
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
                    
                    <div className={`comments-settings flex-col w-4/12`}>
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