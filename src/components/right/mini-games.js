import React, { useState, useContext, useEffect } from "react";
import makeRequest from "../utils/fetch-request";
import { Context } from "../../context/store";
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MiniGames = () => {
    const [state, dispatch] = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false); 
    const navigate = useNavigate();

    const fetchTopCasino = async() => {
        let endpoint = "top-games-list";
        await makeRequest({url: endpoint, method: "GET", api_version:"casinoGames"}).then(([status, result]) => {
            if (status === 200) {
                const first12Games = result[0]?.gameList?.slice(0, 24) || [];
                setLocalStorage("minicasinogames", first12Games);
                dispatch({type:"SET", key: "minicasinogames", payload: first12Games});             
            }
        });
    }

    useEffect(() => {
        // check for casino top
        const getMiniCasino = getFromLocalStorage("minicasinogames");
        if (!getMiniCasino) {
            fetchTopCasino();
        } else {
            dispatch({type: "SET", key:"minicasinogames", payload: getMiniCasino});
        }
    }, []);

    const launchGame = (game, moneyType = 1) => {
        const endpoint = `game-url/${isMobile ? "mobile" : "desktop"}/${moneyType}/${game.game_id}`;
        makeRequest({ url: endpoint, method: "GET", api_version: "faziCasino" }).then(([status, result]) => {
            if (status === 200) {
                dispatch({ type: "SET", key: "casinolaunch", payload: { game, url: result?.gameUrl } });
                navigate(`/casino/${game.game_name.split(' ').join('')}`);
            } else {

            }
        });
    }

    const filteredGames = state?.minicasinogames?.filter(game =>
        game.game_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="mt-4 p-4 bg-blue-900 border border-gray-300 rounded-md">
            <div className="bg-blue-900 pb-4">
                <h3 className="text-white mb-2">Mini Games</h3>
                <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                    className={`w-full p-2 mb-4 border ${isFocused ? 'bg-white' : 'bg-transparent'} border-gray-300 rounded-md`}
                />
            </div>
            <div className="mt-4 pt-4 grid grid-cols-4 gap-4">
                {filteredGames.map(game => (
                    <div
                        key={game.game_id}
                        className="relative flex items-center justify-center w-full h-0 pb-[100%] bg-cover bg-center rounded-md cursor-pointer transition-transform transform hover:scale-105"
                    >
                        <LazyLoadImage 
                            src={getCasinoImageIcon(game.image_url)}
                            className="absolute w-full h-full object-cover rounded-md"
                            onClick={() => launchGame(game, 1)}
                        />
                        <span className="absolute bottom-2 left-2 font-bold text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                            {game.game_name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(MiniGames);