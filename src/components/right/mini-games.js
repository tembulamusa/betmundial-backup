import React, { useState, useEffect, useContext } from 'react';
import makeRequest from "../utils/fetch-request";
import { Context } from "../../context/store";
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

const MiniGames = () => {
    const [state, dispatch] = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false); 
    const [miniGames, setMiniGames] = useState([]);
    const navigate = useNavigate();

    const fetchMiniGames = async () => {
        const endpoint = "top-games-list";
        try {
            const [status, result] = await makeRequest({ url: endpoint, method: "GET", api_version: "faziCasino" });
            if (status === 200) {
                const allGames = result?.flatMap(category => category.gameList) || [];
                const first12Games = allGames.slice(0, 24);
                setMiniGames(first12Games);
                dispatch({ type: "SET", key: "miniGames", payload: first12Games });
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        if (!state?.miniGames) {
            fetchMiniGames();
        } else {
            setMiniGames(state.miniGames);
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
    };

    const filteredGames = miniGames.filter(game =>
        game.game_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mt-4 p-4 bg-blue-900 border border-gray-300 rounded-md">
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
            <div className="grid grid-cols-4 gap-4">
                {filteredGames.map(game => (
                    <div
                        key={game.game_id}
                        onClick={() => launchGame(game, 1)}
                        style={{ backgroundImage: `url(${game.image_url})` }}
                        className="relative flex items-center justify-center w-full h-0 pb-[100%] bg-cover bg-center rounded-md cursor-pointer transition-transform transform hover:scale-105"
                    >
                        <span className="absolute bottom-2 left-2 font-bold text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                            {game.game_name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MiniGames;
