import React, { useMemo } from "react";
import ClosedBox from "../../../assets/img/casino/closedfullybox.webp";
import OpenBox from "../../../assets/img/casino/openedbox.webp";

const SureBoxGrid = ({ selectedBoxes, setSelectedBoxes, boxOdds }) => {
  const boxes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, idx) => ({
        id: idx + 1,
        isOpen: selectedBoxes.includes(idx + 1),
        // Assign the actual odds if available; otherwise, default to 'X'
        odds: boxOdds[idx] !== undefined ? boxOdds[idx] : 'X',
      })),
    [selectedBoxes, boxOdds]
  );

  console.log("Box odds", boxOdds); // Log the array to verify contents and length

  return (
    <>
      <div className="surebox-grid">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`surebox-item ${
              box.isOpen ? "surebox-item-open" : "surebox-item-closed"
            }`}
            onClick={() => setSelectedBoxes(box.id)}  // Passing box.id directly
          >
            <img
              src={box.isOpen ? OpenBox : ClosedBox}
              alt={box.isOpen ? "Open Box" : "Closed Box"}
              className="box-image"
            />
            {box.isOpen && (
              <span className="odds-display text-white">
                {box.odds} {/* Display actual odds or 'X' if not available */}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(SureBoxGrid);
