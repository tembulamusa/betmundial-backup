import React, { useState } from "react";
import { Switch } from "@mui/material";
import { MdOutlineAddTask } from "react-icons/md";
import { CiBookmarkMinus, CiBookmarkPlus, CiSquareMinus, CiSquarePlus } from "react-icons/ci";

const SureBoxControls = ({
  autoRestart,
  setAutoRestart,
  betAmount,
  setBetAmount,
  possibleWin,
  startGame,
  cashOut,
  gameInProgress,
  cashOutAmount,
  bets,
}) => {
  const [userDisabledAutoRestart, setUserDisabledAutoRestart] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleAutoRestartToggle = () => {
    const newAutoRestartState = !autoRestart;
    setUserDisabledAutoRestart(!newAutoRestartState);
    setAutoRestart(newAutoRestartState);
  };

  const handleBetAmountChange = (newAmount) => {
    if (newAmount >= 5) {
      setBetAmount(newAmount);

      // Enable Auto Restart if bet is valid and not manually disabled
      if (!userDisabledAutoRestart) {
        setAutoRestart(true);
      }
    } else {
      setAutoRestart(false);
    }
  };

  const handleStartGame = () => {
    if (betAmount < 5) {
      alert("Bet amount must be at least 5 to start the game.");
      return;
    }
    startGame();
    if (!userDisabledAutoRestart) setAutoRestart(true);
  };

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  return (
    <div className="surebox-controls w-full max-w-none p-4 bg-[#102f56] rounded-lg flex flex-col gap-6">
      {/* Auto Restart Section */}
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold text-white">Auto Restart</label>
        <Switch
          checked={autoRestart}
          onChange={handleAutoRestartToggle}
          color="primary"
        />
      </div>

      {/* Bet Amount Section */}
      <div className="flex items-center justify-between space-x-2 bg-[#0b121b] p-3 rounded-md border border-[#456185]">
        {/* Reset to Minimum Button */}
        <button
          onClick={() => handleBetAmountChange(5)}
          disabled={gameInProgress}
          className="flex items-center justify-center bg-[#1c2834] hover:bg-[#22303e] text-white w-8 h-8 rounded-md focus:ring-2 focus:ring-[#5a7699] disabled:opacity-50"
        >
          <CiBookmarkMinus size={20} />
        </button>

        {/* Decrease Button */}
        <button
          onClick={() => handleBetAmountChange(betAmount - 5)}
          disabled={betAmount <= 5 || gameInProgress}
          className="flex items-center justify-center bg-[#1c2834] hover:bg-[#22303e] text-white w-8 h-8 rounded-md focus:ring-2 focus:ring-[#5a7699] disabled:opacity-50"
        >
          <CiSquareMinus size={20} />
        </button>

        {/* Input Field with Label */}
        <div className="relative w-32">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => handleBetAmountChange(Number(e.target.value))}
            className="peer text-center bg-[#0b121b] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7699] w-full"
            placeholder=" "
            min={5}
            step={5}
            disabled={gameInProgress}
          />
          <label
            htmlFor="betAmount"
            className="absolute left-4 top-1 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#5a7699] peer-focus:mt-1"
          >
            BET AMOUNT
          </label>
        </div>

        {/* Increase Button */}
        <button
          onClick={() => handleBetAmountChange(betAmount + 5)}
          disabled={gameInProgress}
          className="flex items-center justify-center bg-[#1c2834] hover:bg-[#22303e] text-white w-8 h-8 rounded-md focus:ring-2 focus:ring-[#5a7699] disabled:opacity-50"
        >
          <CiSquarePlus size={20} />
        </button>

        {/* Reset to Maximum Button */}
        <button
          onClick={() => handleBetAmountChange(1000)}
          disabled={gameInProgress}
          className="flex items-center justify-center bg-[#1c2834] hover:bg-[#22303e] text-white w-8 h-8 rounded-md focus:ring-2 focus:ring-[#5a7699] disabled:opacity-50"
        >
          <CiBookmarkPlus size={20} />
        </button>
      </div>


      {/* Possible Win Section */}
      <div className="flex justify-between">
        <label className="text-lg font-semibold text-white">Possible Win</label>
        <span className="text-[#5a7699] font-semibold">{possibleWin} KES</span>
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
          onClick={handleStartGame}
          className="w-full py-2 text-white bg-custom-red rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          {gameInProgress ? (
            <>
              Choosing?
              <MdOutlineAddTask size={20} />
            </>
          ) : (
            "Start Game"
          )}
        </button>
      </div>

      {/* Bets List Section */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-lg font-semibold text-white">Your Game Bets</label>
        {bets.length > 0 ? (
          <div className="flex flex-col gap-2">
            {bets.map((bet, index) => (
              <button
                key={index}
                onClick={() => console.log(`Bet ${bet.box} clicked`)}
                className="w-full py-2 text-white bg-[#456185] rounded-md hover:bg-[#5a7699] transition-all flex items-center justify-center"
              >
                Picked Box {bet.box}: Won
                <div className="bg-custom-red text-white px-4 py-1 rounded-md font-semibold inline-block ml-2">
                  {bet.possibleWin} KES
                </div>
              </button>
            ))}
          </div>
        ) : (
          <button
            disabled
            className="w-full py-2 text-white bg-gray-600 rounded-md cursor-not-allowed"
          >
            No Picks yet
          </button>
        )}
      </div>

      {/* Game Instructions Section */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-white">
            Game Instructions
          </label>
          <Switch
            checked={showInstructions}
            onChange={toggleInstructions}
            color="primary"
          />
        </div>
        {showInstructions && (
          <ul className="list-decimal list-inside bg-[#0b121b] text-white px-4 py-2 rounded-md border border-[#456185]">
            <li>Click "Start Game" to begin, or enable "Auto Restart" for continuous play.</li>
            <li>Select boxes to win and multiply your winnings.</li>
            <li>Cash out or keep playing with Auto Restart for seamless rounds.</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(SureBoxControls);