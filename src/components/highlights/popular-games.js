import React, { useState, useContext, useEffect } from "react";
import makeRequest from "../utils/fetch-request";
import { Context } from "../../context/store";
import { Link, useNavigate } from "react-router-dom";
import Virtuals from "../../assets/highlight/virtuals.png";
import CasinoGame from "../pages/casino/casino-game";
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "react-bootstrap";
import {isMobile} from 'react-device-detect';



const PopularGames = (props) => {
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate()

    const fetchTopCasino = async() => {
        let endpoint = "top-games-list";
        await makeRequest({url: endpoint, method: "GET", api_version:"faziCasino"}).then(([status, result]) => {
            if (status == 200) {
                setLocalStorage("toppopularcasino", result)
                dispatch({type:"SET", key: "toppopularcasino", payload: result});             
            }
        });
    }
    useEffect(() => {
        // check for casino top
        const getTopCasino = getFromLocalStorage("toppopularcasino");
        if (!getTopCasino) {
            fetchTopCasino();
        } else {
            dispatch({type: "SET", key:"toppopularcasino", payload: getTopCasino});
        }

    }, [])

    const getCasinoImageIcon = (imgUrl) => {

        let sport_image;
        try {
            sport_image = imgUrl;
            if(sport_image.trim() == "") {
                sport_image = require(`../../assets/img/casino/default.png`);  
            }
        } catch (error) {
            sport_image = require(`../../assets/img/casino/default.png`);
        }
        return sport_image
    }

    const launchGame = async (game, moneyType=1) => {
        let endpoint = `game-url/${isMobile ? "mobile": "desktop"}/${moneyType}/${game.game_id}`;
        await makeRequest({url: endpoint, method: "GET", api_version:"faziCasino"}).then(([status, result]) => {
            if (status == 200) {
                dispatch({type:"SET", key:"casinolaunch", payload: {game: game, url: result?.gameUrl}});
                setLocalStorage("casinolaunch", {game: game, url: result?.game_url})
                navigate(`/casino/${game?.game_name.split(' ').join('')}`)
            } else {

                return false
            }
        });
}
    return (
        <div className="popular-games marquee-card !mr-0 !pl-3">

            {
                state?.toppopularcasino && 
                state?.toppopularcasino[0]?.gameList?.map((game, idx) => (
                    <div>
                        <div
                            className="cursor-pointer popular-game casino-game"
                            onClick={() => launchGame(game, 1)}      
                            key={game.game_id}>

                            <LazyLoadImage src={getCasinoImageIcon(game.image_url)}
                                            className={'virtual-game-image'}/>
                        </div>                  
                        {/* <div className="game-buttons">
                                <Button className="casino-play-btn red-bg casino-cta"
                                        onClick={() => launchGame(game, 1)}>
                                    Play
                                </Button>  
                                <Button className="casino-demo-btn casino-cta"
                                        onClick={() => launchGame(game, 0)}>
                                    Demo   
                                </Button>       
                                    
                        </div> */}
                    </div>
                ))
                
            }

        </div>
    )
}


export default React.memo(PopularGames);