import React from "react";
import FreeBet from "./highlights/free-bet";

const HighlightsBoard = (props) => {

    return (
        <>
            <div className="flex">
                <div className="w-1/3"><FreeBet /></div>
                <div className="w-1/3"></div>
            </div>
        </>
    )
}

export default React.memo(HighlightsBoard)