import React from "react";

import ClosedBox from "../../../assets/img/casino/vault.png";
import OpenBox from "../../../assets/img/casino/openedbox.webp";

const SureBoxGrid = ({ selectedBoxes, setSelectedBoxes, boxOdds }) => {
    const boxes = Array.from({ length: 20 }, (_, idx) => ({
      id: idx + 1,
      isOpen: selectedBoxes.includes(idx + 1),
      odds: boxOdds[idx] || 0,
    }));
  
    return (
      <>
        <p className="surebox-prompt text-lg font-semibold text-white mb-4">
          Select a box to get started
        </p>
        <div className="surebox-grid">
          {boxes.map((box) => (
            <div
              key={box.id}
              className={`surebox-item ${
                box.isOpen ? "surebox-item-open" : "surebox-item-closed"
              }`}
              onClick={() => setSelectedBoxes(box.id)}
            >
              <img
                src={box.isOpen ? OpenBox : ClosedBox}
                alt={box.isOpen ? "Open Box" : "Closed Box"}
                className="box-image"
              />
              {!box.isOpen && (
                <span className="odds-display text-white">{box.odds > 0 ? box.odds : "0"}</span>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

export default SureBoxGrid;
