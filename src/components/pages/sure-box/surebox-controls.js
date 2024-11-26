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
}) => {
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
              onChange={() => setAutoBet(!autoBet)}
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
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-white">Bet Amount</label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="bg-[#0b121b] text-white px-4 py-2 rounded-md border border-[#456185] focus:outline-none focus:ring-2 focus:ring-[#5a7699]"
              min={1}
              step={1}
              disabled={gameInProgress} // Disable input during game
            />
          </div>

          {/* Possible Win Display */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-white">Possible Win</label>
            <span className="text-[#5a7699] font-semibold">{possibleWin} Coins</span>
          </div>
        </div>

        {/* Column 2: Buttons */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Cash Out Button */}
          {gameInProgress ? (
            <button
              onClick={cashOut}
              className="w-full py-2 text-white bg-[#456185] rounded-md hover:bg-[#5a7699] transition-all"
            >
              Cash Out: {cashOutAmount} Coins
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
