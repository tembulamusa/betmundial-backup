import React, { useMemo } from "react";
import ClosedBox from "../../../assets/img/casino/closedfullybox.png";
import OpenBox from "../../../assets/img/casino/openedbox.png";

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
