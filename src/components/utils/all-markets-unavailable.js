import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logoFav.png";
import CarouselLoader from "../carousel";

const AllMarketsUnavailable = (props) => {
    const {backLink} = props;

    return (
        <>
        <CarouselLoader />
        <div className="game-detail-not-available">
            <div className="flex content">
                <div className="flex-col">
                    <img src={Logo}/>
                </div>
                <div className="flex-col">
                    <h1 className="unavailable-game">Game Currently not available</h1>
                    <Link to={backLink} className="">Go Back to Games</Link>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default React.memo(AllMarketsUnavailable);