import React, { useContext, useEffect, useState } from "react";
import Head from "../../../assets/img/casino/head.png";
import Tail from "../../../assets/img/casino/tail.png";
import Sound2 from "../../../assets/audio/surecoin/coin.mp3";
import Sound1 from "../../../assets/audio/surecoin/coin-spill.mp3";
import WinSound from "../../../assets/audio/surecoin/win-mixkit.wav";
import { Context } from "../../../context/store";

const RotatingCoin = (props) => {
    const {isspinning, coinnumber, usermuted, cvterfxn, nxtSession, prevSession} = props;
    const [timeLeft, setTimeLeft] = useState(0);
    const [state, dispatch] = useContext(Context);
    const [rotatingSpeedLevel, setRotatingSpeedLevel] = useState("low");
    const [canPlaySound, setCanPlaySound] = useState(false);
    const [spinOutcome, setSpinOutcome] = useState(null);
    const [coinOnDisplay, setCoinOnDisplay] = useState("heads");

    
    useEffect(() => {
        if (isspinning) {
            setSpinOutcome(null);
        } else {
           
                if (cvterfxn(prevSession?.rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CRWOCM]) {
                    notifyWon();
                }
                setSpinOutcome(cvterfxn(prevSession?.rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CROTCME]);
                setCoinOnDisplay(cvterfxn(prevSession?.rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CROTCME].toLowerCase());
                if (!prevSession?.rslt) {
                spinNobet()
            }
            
        }

    }, [isspinning]);

    const notifyWon = () => {
        if (!usermuted) {
            const audio = new Audio(WinSound);
            audio.play();

        }
        return
    }

    const spinNobet = () => {
        const choices = ["heads", "tails"]
        const i = Math.floor(Math.random() * 2);
        setSpinOutcome(choices[i]);
        setCoinOnDisplay(choices[i])
    }
    

    useEffect(() => {
        if (timeLeft <= 0) {
           
            return;
        }

        if (timeLeft <= 3 ) {
            if(rotatingSpeedLevel != "finishing") {
                
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
                {   
                    <div className="bet-info">
                        {(!isspinning && prevSession?.coinselections?.[coinnumber]?.userbeton) &&
                            <div className="mb-3 relative">
                                <div className="uppercase">Choice</div>
                                <div className={`info-box chosen-box`}>
                                    <span className={`uppercase font-bold ${prevSession?.coinselections?.[coinnumber]?.pick == "heads" ? "heads": "tails"}`}>{prevSession?.coinselections?.[coinnumber]?.pick || "None"}</span>
                                </div>
                            </div>
                        }
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
                }
            </>
        )
    }
    return (
        <>
            <BetInfo />
            <div className={`rotating-img  ${isspinning ? "is-spinning":""} rotating-speed-level-${rotatingSpeedLevel}`} onClick={() => setCanPlaySound()}>
                <img src={coinOnDisplay == "heads" ? Head : Tail } alt=""/>
            </div>
        </>
    )
}

export default React.memo(RotatingCoin);