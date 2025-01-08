import React from "react";
import { Link } from "react-router-dom";

const AllMarketsUnavailable = (props) => {
    const {backLink} = props;

    return (
        <div className="game-detail-not-available">
            <h1 className="unavailable-game">Currently not available</h1>
            <Link to={backLink} className="">Go Back to Games</Link>
        </div>
    )
}

export default React.memo(AllMarketsUnavailable);