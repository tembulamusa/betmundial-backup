import React from "react";
import { Switch } from "@mui/material";

const SureBoxControls = ({
  autoBet,
  setAutoBet,
  autoPick,
  setAutoPick,
  betAmount,
  setBetAmount,
  possibleWin,
  startGame,
  cashOut,
  gameInProgress,
  cashOutAmount,
  pickRandomBox, 
}) => {
  const handleAutoBetToggle = () => {
    const newAutoBetState = !autoBet;
    setAutoBet(newAutoBetState);

    if (newAutoBetState) {
      pickRandomBox();
    }
  };

  return (
    <div className="surebox-controls w-full max-w-none p-4 bg-[#102f56] rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Column 1: Auto Toggles and Stake */}
        <div className="flex flex-col flex-1 gap-6">
          {/* Auto Bet Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-white">Auto Bet</label>
            <Switch
              checked={autoBet}
              onChange={handleAutoBetToggle}
              color="primary"
            />
          </div>

          {/* Auto Pick Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-white">Auto Pick</label>
            <Switch
              checked={autoPick}
              onChange={() => setAutoPick(!autoPick)}
              color="primary"
            />
          </div>

          {/* Bet Amount Input */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <label className="text-lg font-semibold text-white sm:mr-4">
              Bet Amount
            </label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="bg-[#0b121b] text-white px-4 py-2 rounded-md border border-[#456185] focus:outline-none focus:ring-2 focus:ring-[#5a7699] w-full sm:w-auto"
              min={1}
              step={1}
              disabled={gameInProgress} 
            />
          </div>

          {/* Possible Win Display */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-white">Possible Win</label>
            <span className="text-[#5a7699] font-semibold">{possibleWin} KES</span>
          </div>
        </div>

        {/* Column 2: Buttons */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Cash Out Button */}
          {gameInProgress ? (
            <button
              onClick={cashOut}
              className="w-full py-2 text-white bg-[#456185] rounded-md hover:bg-[#5a7699] transition-all relative flex items-center justify-center"
            >
              Cash Out:
              <div className="bg-white text-black px-4 py-1 rounded-md font-semibold inline-block ml-2">
                {cashOutAmount} KES
              </div>
            </button>          
          ) : (
            <button
              disabled
              className="w-full py-2 text-white bg-gray-600 rounded-md cursor-not-allowed"
            >
              Cash Out
            </button>
          )}

          {/* Start/Continue Button */}
          <button
            onClick={startGame}
            className="w-full py-2 text-white rounded-md bg-custom-red hover:opacity-90 transition-all"
          >
            {gameInProgress ? "Continue" : "Start Game"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SureBoxControls;
