import React from "react";
import FreeBet from "./highlights/free-bet";
import PopularGames from "./highlights/popular-games"
const HighlightsBoard = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-md-4"><FreeBet /></div>
                <div className="col-md-8 highlights"><PopularGames /></div>              
            </div>
        </>
    )
}

export default React.memo(HighlightsBoard)