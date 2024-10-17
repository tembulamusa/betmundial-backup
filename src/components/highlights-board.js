import React from "react";
import FreeBet from "./highlights/free-bet";
import PopularGames from "./highlights/popular-games"
import Advert2 from "./highlights/advert2";
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