import React from "react";

const SkipRopeControls = ({
  gameActive,
  betAmount,
  cashoutAvailable,
  handleBetChange,
  startGame,
  cashout,
}) => {
  return (
    <div className="skiprope-controls">
      <input
        type="number"
        value={betAmount}
        onChange={handleBetChange}
        disabled={gameActive}
        placeholder="Enter bet amount"
        className="skiprope-bet-input"
      />
      {!gameActive ? (
        <button onClick={startGame} className="skiprope-btn">
          Start Game
        </button>
      ) : (
        <button
          onClick={cashout}
          className={`skiprope-btn ${cashoutAvailable ? "" : "disabled"}`}
          disabled={!cashoutAvailable}
        >
          Cashout
        </button>
      )}
      <button className="bet-display-btn" disabled>
        Your Bet: KES {betAmount || 0}
      </button>
    </div>
  );
};

export default SkipRopeControls;
