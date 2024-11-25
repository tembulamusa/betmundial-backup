import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

const SureBoxGrid = ({ selectedBoxes, setSelectedBoxes }) => {
    const boxes = Array.from({ length: 16 }, (_, idx) => ({
        id: idx + 1,
        isOpen: selectedBoxes.includes(idx + 1),
    }));

    const toggleBox = (id) => {
        setSelectedBoxes((prev) =>
            prev.includes(id) ? prev.filter((boxId) => boxId !== id) : [...prev, id]
        );
    };

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
                        onClick={() => toggleBox(box.id)}
                    >
                        {box.isOpen ? (
                            <FaLockOpen className="surebox-icon text-white" size={24} />
                        ) : (
                            <FaLock className="surebox-icon text-white" size={24} />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SureBoxGrid;
