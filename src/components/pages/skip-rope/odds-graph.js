import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OddsGraph = ({ oddsHistory, currentOdds, resultMessage }) => {

  const data = oddsHistory.map((odds, index) => ({ time: index, odds }));

  const [playerCount, setPlayerCount] = useState(Math.floor(Math.random() * 400) + 100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlayerCount(Math.floor(Math.random() * 400) + 100);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="">
      {/* Graph */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" hide />
          <YAxis domain={[1, 10]} hide={true} />
          <Tooltip />
          <Line type="monotone" dataKey="odds" stroke="#4bc0c0" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Below the graph */}
      <div className="odds-info-container mt-4 px-2">
        <div className="skiprope-info flex justify-between items-center text-sm text-[#456185]">
          <div>
            <p className="font-semibold">Current Odds: <span className="text-[#4bc0c0]">{currentOdds.toFixed(2)}x</span></p>
            <p className="text-xs">{resultMessage}</p>
          </div>
          <div className="random-players text-right">
            <p>{playerCount} players currently.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OddsGraph;
