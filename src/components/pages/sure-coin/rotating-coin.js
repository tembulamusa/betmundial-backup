import React, { useContext, useEffect, useState } from "react";
import Head from "../../../assets/img/casino/head.png";
import Tail from "../../../assets/img/casino/tail.png";
import Sound2 from "../../../assets/audio/surecoin/coin.mp3";
import Sound1 from "../../../assets/audio/surecoin/coin-spill.mp3";
import { Context } from "../../../context/store";

const RotatingCoin = (props) => {
    const {isspinning, coinnumber, usermuted, rslt, cvterfxn} = props;
    const [timeLeft, setTimeLeft] = useState(0);
    const [state, dispatch] = useContext(Context);
    const [rotatingSpeedLevel, setRotatingSpeedLevel] = useState("low");
    const [canPlaySound, setCanPlaySound] = useState(false);
    const [winState, setWinState] = useState(null);
    const [spinOutcome, setSpinOutcome] = useState(null);
    const [coinOnDisplay, setCoinOnDisplay] = useState("heads");

    
    useEffect(() => {
        if (isspinning) {
            setSpinOutcome(null);
            setWinState(null);
        } else {
            // if (!state?.userbeton) {
                // spinNobet();
                // setWinState(null);
            // } else
                // {
                if (cvterfxn(rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CRWOCM]) {
                    setWinState("won");
                } else {
                    setWinState("lost");
                }
                setSpinOutcome(cvterfxn(rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CROTCME]);
                setCoinOnDisplay(cvterfxn(rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CROTCME].toLowerCase());
            // }
            
        }

        
    }, [isspinning]);


    useEffect(() => {
        if(!rslt) {
            setWinState(null);
            spinNobet() 
        }
    }, [rslt])

    const spinNobet = () => {
        const choices = ["heads", "tails"]
        const i = Math.floor(Math.random() * 2);
        setSpinOutcome(choices[i]);
    }
    useEffect(() => {
        if(winState) {
            console.log("WIN CHANGED and for a while")
        }
    }, [winState]);

    useEffect(() => {
        if (timeLeft <= 0) {
            //setIsSpinning(false)
            // audio.pause();
            // audio2.pause();
            return;
        }

        if (timeLeft <= 3 ) {
            if(rotatingSpeedLevel != "finishing") {
                // audio.pause();
                // audio2.play();
                setRotatingSpeedLevel("finishing");

            }
        }
        
        // if 
        const timer = setInterval(() => {
            let remTime = timeLeft - 1
            setTimeLeft(remTime);
            }, 1000);
            

        return () => clearInterval(timer); // Cleanup on unmount
            
    }, [timeLeft])

    // change coin on display based on user choice
    useEffect(() => {
        setCoinOnDisplay(state?.coinselections?.[coinnumber]?.pick);
    }, [state?.coinselections?.[coinnumber]?.pick])
    
    // paly the sound
    useEffect(() => {
        if (!usermuted) {
            const audio = new Audio(Sound1);
            const audio2 = new Audio(Sound2);

            if(!isspinning) {
                audio.pause();
                audio2.pause(); 
            } else  {
                // let timetogo = timeLeft()
                // audio.loop = true;
                audio2.pause();
                audio.play();
                
                
            } 
        }
            
    }, [isspinning]);

    const BetInfo = () => {

        return (
            <>
                <div className="bet-info">
                    <div className="mb-3">
                        <div className="uppercase">Choice</div>
                        <div className={`info-box chosen-box`}>
                            <span className={`uppercase font-bold ${state?.coinselections?.[coinnumber]?.pick == "heads" ? "heads": "tails"}`}>{state?.coinselections?.[coinnumber]?.pick || "None"}</span>
                        </div>
                    </div>
                    <div className="">
                        {   spinOutcome &&
                            <>
                                <div className="uppercase">Outcome</div>
                                <div className={`info-box user-choice ${spinOutcome?.toLowerCase() == "heads" ? "heads": "tails"}`}>
                                    <span className={`uppercase font-bold `}>{spinOutcome}</span>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <BetInfo />
            <div className={`rotating-img  ${isspinning ? "is-spinning":""} rotating-speed-level-${rotatingSpeedLevel}`} onClick={() => setCanPlaySound()}>
                <div className={`win-state ${winState}`}><img src={coinOnDisplay == "heads" ? Head : Tail } alt=""/></div>
            </div>
        </>
    )
}

export default React.memo(RotatingCoin);