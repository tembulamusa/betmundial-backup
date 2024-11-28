import React, { useState } from "react";

import SureBoxGrid from "./surebox-grid";
import SureBoxControls from "./surebox-controls";
import RandomPlayers from "./random-players";

const SureBoxIndex = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxOdds, setBoxOdds] = useState([]);
  const [currentOdds, setCurrentOdds] = useState(1);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [possibleWin, setPossibleWin] = useState(0);
  const [autoBet, setAutoBet] = useState(false);

  // Initialize the game with randomized odds
  const startGame = () => {
    const newBoxOdds = Array.from({ length: 12 }, () => {
      return Math.random() > 0.4 ? parseFloat((Math.random() * 2.5 + 0.5).toFixed(2)) : 0;
    });

    setBoxOdds(newBoxOdds);
    setSelectedBoxes([]);
    setCurrentOdds(1);
    setPossibleWin(0);
    setCashoutAmount(0);
    setGameActive(true);
  };

  const handleBoxSelection = (id) => {
    if (!gameActive || selectedBoxes.includes(id)) return;

    const selectedOdds = boxOdds[id - 1];
    if (selectedOdds === 0) {
      alert("You lost! The selected box has 0 odds.");
      resetGame();
      return;
    }

    const updatedOdds = currentOdds * selectedOdds;
    setCurrentOdds(updatedOdds);
    setPossibleWin((updatedOdds * betAmount).toFixed(2));
    setCashoutAmount((updatedOdds * betAmount * 0.75).toFixed(2));
    setSelectedBoxes([...selectedBoxes, id]);
  };

  const pickRandomBox = () => {
    const totalBoxes = boxOdds.length;

    // Get an unselected box ID
    const unselectedBoxes = Array.from({ length: totalBoxes }, (_, i) => i + 1).filter(
      (boxId) => !selectedBoxes.includes(boxId)
    );

    if (unselectedBoxes.length === 0) {
      alert("All boxes are already selected!");
      return;
    }

    const randomBox = unselectedBoxes[Math.floor(Math.random() * unselectedBoxes.length)];
    handleBoxSelection(randomBox); 
  };

  const cashOut = () => {
    if (!gameActive) return;

    alert(`You cashed out and won ${cashoutAmount} coins!`);
    resetGame();
  };

  const resetGame = () => {
    setGameActive(false);
    setSelectedBoxes([]);
    setBoxOdds([]);
    setCurrentOdds(1);
    setPossibleWin(0);
    setCashoutAmount(0);
    setAutoBet(0);
  };

  React.useEffect(() => {
    if (autoBet && gameActive) {
      const timer = setInterval(() => {
        pickRandomBox();
      }, 3000); 

      return () => clearInterval(timer); // Cleanup on unmount or when autoBet changes
    }
  }, [autoBet, gameActive, selectedBoxes]);

  return (
    <div className="surebox-container">
      <div className="surebox-section">
        <h1 className="surebox-title">SureBox</h1>
        <SureBoxGrid
          selectedBoxes={selectedBoxes}
          setSelectedBoxes={handleBoxSelection}
          boxOdds={boxOdds}
        />
        <SureBoxControls
          autoBet={autoBet}
          setAutoBet={setAutoBet}
          autoPick={false}
          setAutoPick={() => {}}
          startGame={gameActive ? () => alert("Game already in progress") : startGame}
          cashOut={gameActive ? cashOut : () => alert("No game to cash out from")}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          possibleWin={possibleWin}
          cashOutAmount={cashoutAmount}
          gameInProgress={gameActive}
          pickRandomBox={pickRandomBox}
        />
      </div>
      <RandomPlayers />
    </div>
  );
};

export default SureBoxIndex;
