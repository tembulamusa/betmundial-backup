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
    <div className="surebox-controls w-full max-w-none p-4 bg-[#102f56] rounded-lg flex flex-col gap-6">
      {/* Auto Toggles and Stake Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-white">Auto Bet</label>
          <Switch
            checked={autoBet}
            onChange={handleAutoBetToggle}
            color="primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-white">Auto Pick</label>
          <Switch
            checked={autoPick}
            onChange={() => setAutoPick(!autoPick)}
            color="primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-white">Bet Amount</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="bg-[#0b121b] text-white px-4 py-2 rounded-md border border-[#456185] focus:outline-none focus:ring-2 focus:ring-[#5a7699] w-full"
            min={1}
            step={1}
            disabled={gameInProgress}
          />
        </div>

        <div className="flex justify-between">
          <label className="text-lg font-semibold text-white">Possible Win</label>
          <span className="text-[#5a7699] font-semibold">{possibleWin} KES</span>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col gap-4">
        {gameInProgress ? (
          <button
            onClick={cashOut}
            className="w-full py-2 text-white bg-[#456185] rounded-md hover:bg-[#5a7699] transition-all flex items-center justify-center"
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

        <button
          onClick={startGame}
          className="w-full py-2 text-white bg-custom-red rounded-md hover:opacity-90 transition-all"
        >
          {gameInProgress ? "Continue" : "Start Game"}
        </button>
      </div>
    </div>
  );
};

export default SureBoxControls;
