import React, { useContext, useEffect, useState } from "react";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Button, ButtonGroup} from "react-bootstrap";
import { Context } from "../../../context/store";
import makeRequest from "../../utils/fetch-request";
import {isMobile} from 'react-device-detect';
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/local-storage";
import Notify from "../../utils/Notify";
import Alert from "../../utils/alert";

const CasinoGame = (props) => {
    const {game} = props;
    const [state, dispatch] = useContext(Context);
    const [alertMessage, setAlertMessage] = useState(null)
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    
    const launchGame = async (game, moneyType=1) => {
        setFetching(true);
        let endpoint = `game-url/${isMobile ? "mobile": "desktop"}/${moneyType}/${game.game_id}`;

        if (moneyType == 1 && !state?.user?.token) {
            // later check if token is still valid
            dispatch({type:"SET", key:"showloginmodal", payload:true});
            return false
        }
        let casinoVersion = "faziCasino";
        let method = "GET";
        let data;
        if (game?.provider_name.toLowerCase() == "aviatrix") {
            casinoVersion = "aviatrix"
            endpoint = "demo"
            if(moneyType == 1) {
                endpoint = "launch"
                data = {token: state?.user?.token}
                method = "POST"
            }
        }
        if (game?.provider_name?.toLowerCase() == "split the pot") {
            casinoVersion = "intouchvas";
        }
        await makeRequest({url: endpoint, data: data, method: method, api_version:casinoVersion}).then(([status, result]) => {
            if (status == 200) {
                let launchUrl = result?.gameUrl
                if(game?.provider_name?.toLowerCase() == "aviatrix"){
                    launchUrl = result?.url;
                }
                dispatch({type:"SET", key:"casinolaunch", payload: {game: game, url: launchUrl}});
                setLocalStorage("casinolaunch", {game: game, url: result?.game_url})
                navigate(`/casino/${game?.game_name.split(' ').join('')}`)
            } else {
                // Notify({status: 400, message: "An Error Occurred"})
                setAlertMessage({status: 400, message: "An error occurred"})
                return false
            }
        });
                
            
    }
    

    useEffect(() => {
        if(alertMessage){
            setTimeout(() => {
                setAlertMessage(null)
            }, 3000);
        }
        }, [alertMessage])
    

    const getCasinoImageIcon = (imgUrl) => {

        let sport_image;
        try {
            sport_image = imgUrl;
            if(sport_image.trim() == "") {
                sport_image = require(`../../../assets/img/casino/default.png`);  
            }

            if (game?.provider_name.toLowerCase() == "aviatrix") {
                sport_image = require("../../../assets/img/casino/aviatrix/aviatrix.jpg")
            }
        } catch (error) {
            sport_image = require(`../../../assets/img/casino/default.png`);
        }
        return sport_image
    }

    return (
        <>
        
            <div
                style={{minWidth:"100px", minHeight: "100px"}}
                className=""       
                key={game.game_id}>
                <LazyLoadImage src={getCasinoImageIcon(game.image_url)}
                                className={'virtual-game-image'}/>
                {/* <p className={'py-2 font-[500] text-elipsis'}>{game?.game_name}</p> */}
                {alertMessage && <div className="game-launch-issue"><Alert message={alertMessage} /></div>}
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