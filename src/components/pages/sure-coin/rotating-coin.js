import React, { useContext, useEffect, useState } from "react";
import Head from "../../../assets/img/casino/head.png";
import Tail from "../../../assets/img/casino/tail.png";
import WonGif from "../../../assets/img/casino/notes-falling.gif";
import TryAgain from "../../../assets/img/casino/try-again.gif";
import Sound2 from "../../../assets/audio/surecoin/coin.mp3";
import Sound1 from "../../../assets/audio/surecoin/coin-spill.mp3";
import WinSound from "../../../assets/audio/surecoin/win-mixkit.wav";
import { Context } from "../../../context/store";

const RotatingCoin = (props) => {
    const {isspinning, coinnumber,
        usermuted, cvterfxn,
         prevSession,
         prepToStart,
         coinSettled
        } = props;
    const [timeLeft, setTimeLeft] = useState(0);
    const [state, dispatch] = useContext(Context);
    const [rotatingSpeedLevel, setRotatingSpeedLevel] = useState("low");
    const [spinOutcome, setSpinOutcome] = useState(null);
    const [coinOnDisplay, setCoinOnDisplay] = useState("heads");
    const [won, setWon] = useState(null);

    
    useEffect(() => {
        if (isspinning) {
            setSpinOutcome(null);
            setWon(null);
            setCoinOnDisplay(null)
        } else {
            
                if (cvterfxn(prevSession?.rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CRWOCM] == true) {
                    notifyWon();
                } else if (cvterfxn(prevSession?.rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CRWOCM] == false) {
                    setWon("lost");
                } else if (cvterfxn(prevSession?.rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CRWOCM] == null) {
                    setWon(null)
                }
                setSpinOutcome(cvterfxn(prevSession?.rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CROTCME]);
                setCoinOnDisplay(cvterfxn(prevSession?.rslt, process.env.REACT_APP_OTCMEKI)?.[process.env.REACT_APP_CROTCME].toLowerCase());
                if (!prevSession?.rslt) {
                spinNobet()
            }
            
        }

    }, [isspinning]);

    const notifyWon = () => {
        setWon("won")
        if (!usermuted) {
            const audio = new Audio(WinSound);
            audio.play();

        }
        return
    }

    useEffect(() => {
        if(won == "won" || won == "lost"){
            setTimeout(() => {
                setWon(null);
            }, 3000);
        }
    },[won])
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
                        { isspinning &&

                            <div className="relative">
                                <div className="uppercase">SPINNING</div>
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
        <div className="relative">
            <BetInfo />
            <div className="notify-win-container">
                {/* {won && <div className="won-text won-expanding-text">won {prevSession?.coinselections?.[coinnumber]?.amount * 2}</div>} */}
                <div className={`flex capitalize notify-win ${won == "won" ? "won" : won == "lost" ? "lost" : ""}`}>
                    <span className="flex-col">Outcome<br/><span className="font-bold uppercase">{spinOutcome}</span></span>
                    <span className="flex-col ml-2 won-amount">
                        {won == "won" && <>WON<br/></>}
                        <span className="font-bold won-expanding">{won == "won" ? <span>KES. <span className="">{prevSession?.coinselections?.[coinnumber]?.amount * 2}.00</span></span> : <span className="mt-2 block">X</span> }</span>
                    </span>
                </div>
            </div>
            <div className={`${coinSettled && "coin-settled"}  rotating-img  ${isspinning ? "is-spinning": prepToStart ? "prep-to-start" : ""} rotating-speed-level-${rotatingSpeedLevel}`}>
                <div className={`coin-image heads ${coinOnDisplay == "heads" ? "higher-z": ""}`}></div>
                <div className={`coin-image tails ${coinOnDisplay == "tails" ? "higher-z": ""}`}></div>
            </div>           
            
            {won == "won" && (
                <div className="won-gif-container">
                    <img src={WonGif} alt="" className="won-gif" />
                    {/* <div className=""></div> */}
                </div>
            )}
            
        </div>
    )
}

export default React.memo(RotatingCoin);