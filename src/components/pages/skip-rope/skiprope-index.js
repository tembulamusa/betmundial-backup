import React, { useState, useEffect, useRef } from "react";
import NotSkipping from "../../../assets/img/casino/not-skipping.jpeg";
import Skipping from "../../../assets/img/casino/jumpropegirl.gif";
import Kaboom from "../../../assets/img/casino/kaboom.gif";

const SkipRopeIndex = () => {
  const [gameActive, setGameActive] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [currentOdds, setCurrentOdds] = useState(0.5);
  const [cashoutAvailable, setCashoutAvailable] = useState(false);
  const [showKaboom, setShowKaboom] = useState(false);
  const [showSkipping, setShowSkipping] = useState(false);
  const [showResting, setShowResting] = useState(true);
  const [resultMessage, setResultMessage] = useState("");

  const oddsInterval = useRef(null);
  const kaboomTimeout = useRef(null);

  const startGame = () => {
    if (betAmount <= 0) {
      alert("Please enter a valid bet amount.");
      return;
    }

    setGameActive(true);
    setShowResting(false);
    setShowSkipping(true);
    setResultMessage("");
    setCurrentOdds(0.5);

    // Start odds increment
    oddsInterval.current = setInterval(() => {
      setCurrentOdds((prev) => Math.min(prev + 0.1, 5));
    }, 1000);

    // Enable cashout after 10 seconds and kaboom randomly after 10-20 seconds
    setTimeout(() => setCashoutAvailable(true), 10000);

    kaboomTimeout.current = setTimeout(() => {
      kaboom();
    }, 10000 + Math.random() * 10000);
  };

  const cashout = () => {
    if (!cashoutAvailable) {
      alert("Cashout not available yet!");
      return;
    }

    clearInterval(oddsInterval.current);
    clearTimeout(kaboomTimeout.current);
    const winnings = (betAmount * currentOdds).toFixed(2);
    setResultMessage(`You cashed out and won $${winnings}!`);
    resetGame();
  };

  const kaboom = () => {
    clearInterval(oddsInterval.current);
    setShowSkipping(false);
    setShowKaboom(true);
    setResultMessage("Kaboom! You lost your bet.");
    resetGame();
  };

  const resetGame = () => {
    setTimeout(() => {
      setGameActive(false);
      setShowKaboom(false);
      setShowResting(true);
      setCashoutAvailable(false);
    }, 3000);
  };

  const handleBetChange = (e) => {
    setBetAmount(parseFloat(e.target.value));
  };

  useEffect(() => {
    return () => {
      clearInterval(oddsInterval.current);
      clearTimeout(kaboomTimeout.current);
    };
  }, []);

  return (
    <div className="skiprope-container">
      <h1>Skip a Rope</h1>
      <div className="skiprope-stage">
        {showResting && <img src={NotSkipping} alt="Resting" />}
        {showSkipping && <img src={Skipping} alt="Skipping" />}
        {showKaboom && <img src={Kaboom} alt="Kaboom" />}
      </div>
  
      <div className="skiprope-controls">
        <input
          type="number"
          value={betAmount}
          onChange={handleBetChange}
          disabled={gameActive}
          placeholder="Enter bet amount"
        />
        {!gameActive ? (
          <button onClick={startGame}>Start</button>
        ) : (
          <button onClick={cashout} disabled={!cashoutAvailable}>
            Cash Out
          </button>
        )}
      </div>
  
      <div className="skiprope-info">
        <p>Current Odds: {currentOdds.toFixed(2)}x</p>
        <p>{resultMessage}</p>
      </div>
    </div>
  );
};  

export default SkipRopeIndex;
