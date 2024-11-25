import React, { useState } from "react";
import SureBoxGrid from "./surebox-grid";
import SureBoxControls from "./surebox-controls";
import RandomPlayers from "./random-players";

const SureBoxIndex = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [autoBet, setAutoBet] = useState(false);
  const [ autoPick, setAutoPick] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [possibleWin, setPossibleWin] = useState(0);

  const startGame = () => {
    console.log("Game started!");
  };

  const cashOut = () => {
    console.log("Cashed out!");
  };

  return (
    <div className="surebox-container">
      <div className="surebox-section">
        <h1 className="surebox-title">SureBox</h1>
        <SureBoxGrid
          selectedBoxes={selectedBoxes}
          setSelectedBoxes={setSelectedBoxes}
        />
        <SureBoxControls
          autoBet={autoBet}
          setAutoBet={setAutoBet}
          autoPick={autoPick}
          setAutoPick={setAutoPick}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          possibleWin={possibleWin}
          setPossibleWin={setPossibleWin}
          startGame={startGame}
          cashOut={cashOut}
        />
      </div>
      <RandomPlayers />
    </div>
  );
};

export default SureBoxIndex;
