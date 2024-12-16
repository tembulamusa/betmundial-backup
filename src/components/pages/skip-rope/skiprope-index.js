import React, { useState, useEffect, useRef } from "react";

import SkipRopeControls from "./skiprope-controls";
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

    oddsInterval.current = setInterval(() => {
      setCurrentOdds((prev) => {
        const change = Math.random() * 0.4 - 0.2; // Random odds change
        return Math.max(0, Math.min(prev + change, 5)); // Clamp odds between 0 and 5
      });
    }, 500);

    setTimeout(() => setCashoutAvailable(true), 8000); // Enable cashout after 8 seconds

    kaboomTimeout.current = setTimeout(() => {
      if (Math.random() < 0.5) {
        kaboom(); // 50% chance of kaboom
      }
    }, Math.random() * 12000 + 8000); // Random kaboom within 8–20 seconds
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
      setCurrentOdds(0.5);
    }, 2000); // Show kaboom for 2 seconds
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
    <div className="skiprope-section">
      <div className="skiprope-container">
        <h1 className="skiprope-title">Skip a Rope</h1>
        <div className="skiprope-stage">
          {showResting && <img src={NotSkipping} alt="Resting" />}
          {showSkipping && <img src={Skipping} alt="Skipping" />}
          {showKaboom && <img src={Kaboom} alt="Kaboom" />}
        </div>

        <SkipRopeControls
          gameActive={gameActive}
          betAmount={betAmount}
          cashoutAvailable={cashoutAvailable}
          handleBetChange={handleBetChange}
          startGame={startGame}
          cashout={cashout}
        />

        <div className="skiprope-info">
          <p>Current Odds: {currentOdds.toFixed(2)}x</p>
          <p>{resultMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default SkipRopeIndex;
