import React from "react";

const RandomPlayers = () => {
    const playerCount = Math.floor(Math.random() * 50) + 1;

    return (
        <div className="random-players text-right text-sm text-[#456185] mt-4">
            {playerCount} players currently betting.
        </div>
    );
};

export default React.memo(RandomPlayers);
