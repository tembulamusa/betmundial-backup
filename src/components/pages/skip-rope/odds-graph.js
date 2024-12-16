import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const OddsGraph = ({ oddsHistory }) => {
  // Transform odds history into a format usable by Recharts
  const data = oddsHistory.map((odds, index) => ({ time: index, odds }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" hide />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Line type="monotone" dataKey="odds" stroke="#4bc0c0" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OddsGraph;
