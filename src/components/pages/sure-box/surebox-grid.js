import React, { useMemo } from "react";
import ClosedBox from "../../../assets/img/casino/vault.png";
import OpenBox from "../../../assets/img/casino/openedbox.webp";

const SureBoxGrid = ({ selectedBoxes, setSelectedBoxes, boxOdds }) => {
  const boxes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, idx) => ({
        id: idx + 1,
        isOpen: selectedBoxes.includes(idx + 1),
        // Set to 'X' if no odds are available
        odds: boxOdds && boxOdds[idx] !== undefined ? boxOdds[idx] : 'X',
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
                {box.odds === 'X' ? 'X' : box.odds} {/* Display 'X' for missing odds */}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(SureBoxGrid);
