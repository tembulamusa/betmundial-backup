import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { getFromLocalStorage, setLocalStorage } from "../../utils/local-storage";
import { BiSolidVolumeMute } from "react-icons/bi";
import { FaVolumeHigh } from "react-icons/fa6";
import JumpRopeControls from "./jumprope-controls";
import NotSkipping from "../../../assets/img/casino/skiprope-start.png";
import Skipping from "../../../assets/img/casino/jumping1.gif";
import Kaboom from "../../../assets/img/casino/kaboom.gif";
import GamePlaySoundFile from "../../../assets/img/casino/skiprope-guitar.mp3";
import WinSoundFile from "../../../assets/img/casino/surebox-win.mp3";
import LooseSoundFile from "../../../assets/img/casino/surebox-loose.mp3";

const JumpRopeIndex = () => {
  const [userMuted, setUserMuted] = useState(getFromLocalStorage("jumpropemuted") || false);
  const [gameActive, setGameActive] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [cashoutAvailable, setCashoutAvailable] = useState(false);
  const [showKaboom, setShowKaboom] = useState(false);
  const [showSkipping, setShowSkipping] = useState(false);
  const [showResting, setShowResting] = useState(true);
  const [resultMessage, setResultMessage] = useState("");
  const [targetMultiplier, setTargetMultiplier] = useState(1.0);
  const [userWins, setUserWins] = useState(false);
  const [gameDuration, setGameDuration] = useState(0);
  const [multiplierHistory, setMultiplierHistory] = useState([{ time: 0, multiplier: 1 }]);

  const multiplierInterval = useRef(null);
  const crashTimeout = useRef(null);

  const gamePlaySound = useRef(new Audio(GamePlaySoundFile));
  const winSound = useRef(new Audio(WinSoundFile));
  const looseSound = useRef(new Audio(LooseSoundFile));

  // Update history when multiplier changes
  useEffect(() => {
    if (gameActive) {
      setMultiplierHistory(prev => [...prev, { 
        time: prev.length, 
        multiplier: currentMultiplier 
      }]);
    }
  }, [currentMultiplier, gameActive]);

  const toggleMute = () => {
    const newMutedState = !userMuted;
    setLocalStorage("jumpropemuted", newMutedState, 1000 * 60 * 60 * 24 * 7);
    setUserMuted(newMutedState);
    gamePlaySound.current.muted = newMutedState;
    winSound.current.muted = newMutedState;
    looseSound.current.muted = newMutedState;
  };

  const startGame = () => {
    if (betAmount <= 0) {
      alert("Please enter a valid bet amount.");
      return;
    }

    // Reset history when starting new game
    setMultiplierHistory([{ time: 0, multiplier: 1 }]);

    const willUserWin = Math.random() > 0.45;
    setUserWins(willUserWin);
    
    if (willUserWin) {
      const target = Math.max(1.2, Math.random() * 10);
      setTargetMultiplier(target);
      setGameDuration(20000 + Math.random() * 10000);
    } else {
      setTargetMultiplier(1.0);
      setGameDuration(2000 + Math.random() * 2000);
    }

    setGameActive(true);
    setShowResting(false);
    setShowSkipping(true);
    setResultMessage("");
    setCurrentMultiplier(1.0);
    setCashoutAvailable(true);

    gamePlaySound.current.loop = true;
    if (!userMuted) gamePlaySound.current.play();

    const startTime = Date.now();
    const endTime = startTime + gameDuration;

    multiplierInterval.current = setInterval(() => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / gameDuration);
      
      if (userWins) {
        const easedProgress = easeInOutQuad(progress);
        const current = 1 + (targetMultiplier - 1) * easedProgress;
        setCurrentMultiplier(current);
      } else {
        const fluctuation = Math.random() * 0.5;
        setCurrentMultiplier(1 + fluctuation);
      }

      if (now >= endTime) {
        kaboom();
      }
    }, 50);
  };

  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  const cashout = () => {
    if (!cashoutAvailable) {
      alert("Cashout not available yet!");
      return;
    }

    clearInterval(multiplierInterval.current);
    clearTimeout(crashTimeout.current);

    const winnings = (betAmount * currentMultiplier).toFixed(2);
    setShowSkipping(false);
    
    if (userWins) {
      setResultMessage(`You cashed out at ${currentMultiplier.toFixed(2)}x and won $${winnings}!`);
      winSound.current.play();
    } else {
      setResultMessage(`Game crashed! You lost your bet.`);
      looseSound.current.play();
    }

    resetGame();
  };

  const kaboom = () => {
    clearInterval(multiplierInterval.current);
    setShowSkipping(false);
    setShowKaboom(true);
    setResultMessage(userWins 
      ? `You didn't cash out in time! Game crashed at ${targetMultiplier.toFixed(2)}x` 
      : "Game crashed! You lost your bet."
    );

    looseSound.current.play();
    resetGame();
  };

  const resetGame = () => {
    setTimeout(() => {
      setGameActive(false);
      setShowKaboom(false);
      setShowResting(true);
      setCashoutAvailable(false);
      setCurrentMultiplier(1.0);
      setMultiplierHistory([{ time: 0, multiplier: 1 }]); // Reset the history
      gamePlaySound.current.pause();
      gamePlaySound.current.currentTime = 0;
    }, 3000);
  };

  const handleBetChange = (e) => {
    setBetAmount(parseFloat(e.target.value));
  };

  useEffect(() => {
    return () => {
      clearInterval(multiplierInterval.current);
      clearTimeout(crashTimeout.current);
      gamePlaySound.current.pause();
    };
  }, []);

  return (
    <div className="jumprope-section">
      <div className="jumprope-container">
        <div className="jumprope-title">
          <h1 className="">Jump Rope</h1>
          <div className="cursor-pointer text-3xl text-[#e70654]" onClick={toggleMute}>
            {userMuted ? <BiSolidVolumeMute /> : <FaVolumeHigh />}
          </div>
        </div>
        
        <div className="gameplay-section">
          <div className="jumprope-stage">
            {showResting && <img src={NotSkipping} alt="Resting" />}
            {showSkipping && (
              <>
                <img src={Skipping} alt="Skipping" />
                <div className="multiplier-overlay">
                  <div className="current-multiplier">
                    <h2>{currentMultiplier.toFixed(2)}x</h2>
                    {gameActive && targetMultiplier > 1 && (
                      <p className="target-multiplier">Target: {targetMultiplier.toFixed(2)}x</p>
                    )}
                  </div>
                </div>
              </>
            )}
            {showKaboom && <img src={Kaboom} alt="Kaboom" />}
          </div>
          
          <div className="multiplier-graph">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={multiplierHistory} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Line 
                  type="monotone" 
                  dataKey="multiplier" 
                  stroke="#e70654" 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={false}
                />
                {targetMultiplier > 1 && (
                  <ReferenceLine 
                    y={targetMultiplier} 
                    stroke="#4bc0c0" 
                    strokeDasharray="5 5" 
                    strokeWidth={1.5}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="result-message">
          {resultMessage}
        </div>

        <JumpRopeControls
          gameActive={gameActive}
          betAmount={betAmount}
          cashoutAvailable={cashoutAvailable}
          handleBetChange={handleBetChange}
          startGame={startGame}
          cashout={cashout}
        />
      </div>
    </div>
  );
};

export default JumpRopeIndex;