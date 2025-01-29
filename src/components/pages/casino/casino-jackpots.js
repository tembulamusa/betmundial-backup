import React, { useState, useEffect, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import makeRequest from "../../utils/fetch-request";
import { Context } from "../../../context/store";

const tierColors = [
  { name: "BRONZE", text: "text-gray-100", bg: "bg-black-800" },
  { name: "SILVER", text: "text-gray-100", bg: "bg-black-900" },
  { name: "GOLD", text: "text-gray-100", bg: "bg-black-800" },
  { name: "PLATINUM", text: "text-gray-100", bg: "bg-black-900" },
];

const CasinoJackpots = () => {
  const [state, dispatch] = useContext(Context);
  const [jackpots, setJackpots] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCasinoJackpots = async () => {
    const [status, result] = await makeRequest({
      url: "/jackpots",
      method: "GET",
      api_version: "casinoJackpots",
    });

    if (status === 200) {
      console.log("Fetched jackpots data:", result);
      const flattenedJackpots = result.jackpots.flatMap((jackpot) =>
        jackpot.tiers.map((tier, index) => ({
          id: `${jackpot.jackpotName}-tier-${index}`,
          name: jackpot.jackpotName,
          level: jackpot.level,
          tier: tier.tier,
          amount: tier.amount,
          stats: {
            biggestWin: tier.biggestWinAmount || "N/A",
            lastWin: tier.lastWinAmount || "N/A",
            tierNumber: tier.tier || "N/A",
          },
        }))
      );
      console.log("Flattened jackpots:", flattenedJackpots);
      dispatch({ type: "SET", key: "pragmaticJackpots", payload: flattenedJackpots });
    }
  };

  useEffect(() => {
    fetchCasinoJackpots();
  }, []);

  useEffect(() => {
    if (state?.pragmaticJackpots) {
      setJackpots(state.pragmaticJackpots);
    }
  }, [state?.pragmaticJackpots]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % jackpots.length);
    }, 6000)
    return () => clearInterval(interval);
  }, [jackpots.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % jackpots.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + jackpots.length) % jackpots.length);
  };

  return (
    <section className="p-6 bg-primary text-white w-full">
      {/* <h2 className="text-center text-2xl font-bold mb-4">Casino Jackpots</h2> */}
      <div className="relative flex justify-center items-center w-full">
        {/* Navigation Arrows on Mobile */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 p-4 bg-blue-800 text-white rounded-full opacity-50 hover:opacity-100 md:hidden"
        >
          &lt;
        </button>
        <div className="flex overflow-hidden w-full">
          {jackpots.map((jackpot, index) => {
            const isActive = index === currentIndex;
            const tier = tierColors[jackpot.tier] || tierColors[0];

            return (
              <Tooltip
                key={jackpot.id}
                title={
                  <div className="space-y-1">
                    <p>Level: {jackpot.level}</p>
                    <p>Tier: {jackpot.stats.tierNumber}</p>
                    <p>Biggest Win: {jackpot.stats.biggestWin}</p>
                    <p>Last Win: {jackpot.stats.lastWin}</p>
                  </div>
                }
                arrow
              >
                <div
                  className={`p-4 rounded-lg border-2 ${tier.bg} ${tier.text} transition-all duration-500 cursor-pointer shadow-lg
                    ${isActive ? "shadow-2xl scale-105" : "opacity-50"}
                    w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] mx-2`}  
                >
                  <p className="text-lg font-semibold">{jackpot.name}</p>
                  <p className="text-2xl font-bold">{jackpot.amount}</p>
                </div>
              </Tooltip>
            );
          })}
        </div>
        {/* Navigation Arrows on Mobile */}
        <button
          onClick={handleNext}
          className="absolute right-0 p-4 bg-blue-800 text-white rounded-full opacity-50 hover:opacity-100 md:hidden"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default React.memo(CasinoJackpots);
