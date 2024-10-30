import React, { useContext, useEffect, useState } from "react";
import Head from "../../../assets/img/casino/head.png";
import Tail from "../../../assets/img/casino/tail.png";
import Sound2 from "../../../assets/audio/surecoin/coin.mp3";
import Sound1 from "../../../assets/audio/surecoin/coin-spill.mp3";
import { Context } from "../../../context/store";

const RotatingCoin = (props) => {
    const {starttime, endtime, isspinning, enddelay, coinnumber} = props;
    const [timeLeft, setTimeLeft] = useState(endtime - starttime);
    const [endDelay, setEndDelay] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [state, dispatch] = useContext(Context);
    const [rotatingSpeedLevel, setRotatingSpeedLevel] = useState("low");
    const [canPlaySound, setCanPlaySound] = useState(false);
    

    
    useEffect(() => {
        if (isspinning == true) {
            setIsSpinning(true);
            
            setTimeLeft((endtime - starttime) + (enddelay || 0))
        }
    }, [isspinning]);

    useEffect(() => {
        setEndDelay(Math.random() * (5 - 0 + 1));
    }, [])

    useEffect(() => {
        if (endDelay > 0 ) {
            setTimeLeft(timeLeft + endDelay);
        }
    }, [endDelay])
    // set when the coin stops spinning
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsSpinning(false)
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

    // paly the sound
    useEffect(() => {
        const audio = new Audio(Sound1);
        const audio2 = new Audio(Sound2);

        if(isSpinning == false) {
            audio.pause();
            audio2.pause(); 
        }
        if (isSpinning == true) {
            // let timetogo = timeLeft()
            // audio.loop = true;
            audio.play();
            audio2.pause();

            while (isSpinning == true) {
                if (timeLeft <= 3) {
                    if(audio2.paused) {
                        audio2.play()
                        audio.pause()
                    }  
                } else {
                    if(!audio2.paused) {
                        audio2.pause();
                    }
                }
            }
            
            
        } else if (isSpinning == false) {
            audio2.pause();
            audio.pause()
        } else {
            audio2.pause();
            audio.pause();
        }
        
            
    }, [isSpinning]);
    
    return (
        <>
            {/* Header Display */}
            <div className={`rotating-img  ${isSpinning ? "is-spinning":""} rotating-speed-level-${rotatingSpeedLevel}`} onClick={() => setCanPlaySound()}>
                <img src={state?.usercoinchoices?.coin == "head" ? Head : Tail } alt=""/>
            </div>
        </>
    )
}

export default React.memo(RotatingCoin);