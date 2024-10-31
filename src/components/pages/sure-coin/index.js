import React, { useEffect, useState } from "react";
import RotatingCoin from "./rotating-coin";
import CoinStakeChoice from "./coin-stake-choice";

const SureCoinIndex = (props) => {
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


    
    const PageHeader = (props) => {

        return (
            <h4 className="text-centr col-md-12 bg-primary p-4 text-enter justify-content-between">
                Surecoin
            </h4>
        )
    }
    return (
        <>
            <PageHeader />
            <div className="rotating-images-wrapper">
                { Array(userCoinCount).fill(1).map((coin, idx) => (
                    <div className="rotating-image-container"><RotatingCoin coinnumber={idx + 1} starttime={timeToStart} endtime={timeToEnd} isspinning={isSpinning} ispostingchoices={isPostingChoices} preparingtospin={preparingToSpin}/></div>
                ))}
            </div>
            <div className="">
                { Array(userCoinCount).fill(1).map((coin, idx) => (
                    <CoinStakeChoice coinnumber={idx + 1} starttime={timeToStart} endtime={timeToEnd} isspinning={isSpinning} ispostingchoices={isPostingChoices}/>
                ))}
            </div>
        </>
    )
}


export default React.memo(SureCoinIndex)