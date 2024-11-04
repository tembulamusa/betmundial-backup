import React, { useContext, useState } from "react";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Button, ButtonGroup} from "react-bootstrap";
import { Context } from "../../../context/store";
import makeRequest from "../../utils/fetch-request";
import {isMobile} from 'react-device-detect';
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/local-storage";

const CasinoGame = (props) => {
    const {game} = props;
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate()
    const launchGame = async (game, moneyType=1) => {

        if (state?.user?.token) {

            setFetching(true);
            let endpoint = `game-url/${isMobile ? "mobile": "desktop"}/${moneyType}/${game.game_id}`;
            await makeRequest({url: endpoint, method: "GET", api_version:"faziCasino"}).then(([status, result]) => {
                if (status == 200) {
                    dispatch({type:"SET", key:"casinolaunch", payload: {game: game, url: result?.game_url}});
                    setLocalStorage("casinolaunch", {game: game, url: result?.game_url})
                    navigate(`/casino/${game?.game_name.split(' ').join('')}`)
                } else {

                    // do more checks here and have an appropriate user feedback
                }
            });

            return false
        }

        return dispatch({type:"SET", key:"showloginmodal", payload:true})
    }

    const getCasinoImageIcon = (imgUrl) => {

        let sport_image;
        try {
            sport_image = imgUrl;
            if(sport_image.trim() == "") {
                sport_image = require(`../../../assets/img/casino/default.png`);  
            }
        } catch (error) {
            sport_image = require(`../../../assets/img/casino/default.png`);
        }
        return sport_image
    }

    return (
        <>
        
            <div
                className=""       
                key={game.game_id}>
                <LazyLoadImage src={getCasinoImageIcon(game.image_url)}
                                className={'virtual-game-image'}/>
                {/* <p className={'py-2 font-[500] text-elipsis'}>{game?.game_name}</p> */}
            </div>                  
            <div className="game-buttons">
                    <Button className="casino-play-btn red-bg casino-cta"
                            onClick={() => launchGame(game, 1)}>
                        Play
                    </Button>  
                    <Button className="casino-demo-btn casino-cta"
                            onClick={() => launchGame(game, 0)}>
                        Demo   
                    </Button>       
                         
            </div>
        </>                 
    )
}


export default React.memo(CasinoGame);