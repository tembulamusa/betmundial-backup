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
import CasinoGame from "../pages/casino/casino-game";


const PopularGames = (props) => {
    const [state, dispatch] = useContext(Context);
    const [showComingSoon, setShowComingSoon] = useState(false);    
    
    return (
        <div className="popular-games marquee-card !mr-0 !pl-3">

            {
                state?.toppopularcasino && 
                <div>
                    <Link to={"/#"} className="popular-game">
                        <img src={Virtuals} alt=""/>
                    </Link>
                    
                </div>
            }

        </div>
    )
}


export default React.memo(PopularGames);