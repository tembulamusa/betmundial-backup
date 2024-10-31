import React, { useState, useCallback, useContext, useEffect } from "react";
import makeRequest from "../utils/fetch-request";
import { Context } from "../../context/store";
import Notify from "../utils/Notify";
import { Link } from "react-router-dom";
import { GiSoccerBall } from "react-icons/gi";
import Aviator from "../../assets/highlight/aviator.png";
import Aviatrix from "../../assets/highlight/aviatrix.gif";
import Comet from "../../assets/highlight/comet.png";
import JetX from "../../assets/highlight/JetX.png";
import LigiNare from "../../assets/highlight/liginare.png";
import Virtuals from "../../assets/highlight/virtuals.png";

import ComingSoon from "../pages/comingsoon/ComingSoon";

const PopularGames = (props) => {

    const [showComingSoon, setShowComingSoon] = useState(false);

    const handleComingSoonClick = (e) => {
        e.preventDefault(); 
        setShowComingSoon(true);
        setTimeout(() => setShowComingSoon(false), 5000); 
    };
    
    return (
        <div className="popular-games marquee-card !mr-0 !pl-3">
            <Link to={"/#"} className="popular-game" onClick={handleComingSoonClick}>
                <img src={Virtuals} alt=""/>
            </Link>
            <Link to={"/aviator"} className="popular-game">
                <img src={Aviator} alt=""/>
            </Link>
            <Link to={"/#"} className="popular-game" onClick={handleComingSoonClick}>
                <img src={Aviatrix} alt=""/>
            </Link>
            <Link to={"/#"} className="popular-game" onClick={handleComingSoonClick}>
                <img src={JetX} alt=""/>
            </Link>
            <Link to={"/#"} className="popular-game" onClick={handleComingSoonClick}>
                <img src={LigiNare} alt=""/>
            </Link>
            <Link to={"/#"} className="popular-game" onClick={handleComingSoonClick}>
                <img src={Virtuals} alt=""/>
            </Link>
            <Link to={"/#"} className="popular-game" onClick={handleComingSoonClick}>
                <img src={LigiNare} alt=""/>
            </Link>
            <Link to={"/#"} className="popular-game" onClick={handleComingSoonClick}>
                <img src={Virtuals} alt=""/>
            </Link>
            <ComingSoon show={showComingSoon} onClose={() => setShowComingSoon(false)} />
        </div>
    )
}


export default React.memo(PopularGames);