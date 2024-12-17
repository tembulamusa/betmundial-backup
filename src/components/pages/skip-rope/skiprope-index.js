import React, { useState, useEffect, useRef } from "react";

import SkipRopeControls from "./skiprope-controls";
import OddsGraph from "./odds-graph";
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
  const [oddsHistory, setOddsHistory] = useState([0.5]);

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
    setOddsHistory([0.5]);

    oddsInterval.current = setInterval(() => {
      setCurrentOdds((prev) => {
        const change = Math.random() * 0.4 - 0.2; // Random odds change
        const newOdds = Math.max(0, Math.min(prev + change, 5));
        setOddsHistory((history) => [...history, newOdds]);
        return newOdds;
      });
    }, 500);

    setTimeout(() => setCashoutAvailable(true), 8000);

    kaboomTimeout.current = setTimeout(() => {
      if (Math.random() < 0.5) {
        kaboom();
      }
    }, Math.random() * 12000 + 8000);
  };

  const cashout = () => {
    if (!cashoutAvailable) {
      alert("Cashout not available yet!");
      return;
    }

    clearInterval(oddsInterval.current);
    clearTimeout(kaboomTimeout.current);

    const winnings = (betAmount * currentOdds).toFixed(2);
    setShowSkipping(false);
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
    }, 2000);
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

        <OddsGraph
          oddsHistory={oddsHistory}
          currentOdds={currentOdds}
          resultMessage={resultMessage}
        />

        <SkipRopeControls
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

export default SkipRopeIndex;
