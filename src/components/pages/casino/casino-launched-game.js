import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/store";
import { getFromLocalStorage, setLocalStorage } from "../../utils/local-storage";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import useInterval from "../../../hooks/set-interval.hook";
import { isMobile } from "react-device-detect";
import makeRequest from "../../utils/fetch-request";

const CasinoLaunchedGame = (props) => {
    const [state, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const user = getFromLocalStorage("user");
    const [showPreload, setShowPreload] = useState(true);
    const launchedGame = getFromLocalStorage("casinolaunch");
    const [noStateGame, setNoStateGame] = useState();
    const fullScreens = ["aviatrix"];
    const { provider, gameName } = useParams();



    const getEurovirtualsLaunchUrl = async () => {

        let endpoint = `Eurovirtuals/casino/game-url/${isMobile ? "mobile" : "desktop"}/${1}/${"550e8400-e29b-41d4-a716-446655440000"}`;

        await makeRequest({ url: endpoint, method: "GET", api_version: 'CasinoGameLaunch' }).then(([status, result]) => {
            if (status == 200) {
                setNoStateGame(result?.gameUrl || result?.game_url);
            } else {
                navigate("/casino")
            }
        });
    }
    useEffect(() => {
        // Balance polling fxn
        dispatch({ type: "SET", key: "iscasinopage", payload: true });
        // check for game that is currently loaded on local storage
        if (provider.toLowerCase() == "eurovirtuals") {
            dispatch({ type: "SET", key: "casinolaunch", payload: { game: "", url: "" } });
            getEurovirtualsLaunchUrl()
        } else {

        }
        if (!state?.casinolaunch) {
            if (user?.token) {
                let storedCasino = getFromLocalStorage("casinolaunch");
                dispatch({ type: "SET", key: "casinolaunch", payload: storedCasino });
            }

        }

        if (fullScreens.includes(launchedGame?.game?.provider_name?.toLowerCase())) {
            // let dga = xlg;
            // dga.connect("prelive-dga0.pragmaticplaylive.net")

            dispatch({ type: "SET", key: "fullcasinoscreen", payload: true })
        }
        return () => {
            dispatch({ type: "DEL", key: "iscasinopage" });
            dispatch({ type: "DEL", key: "fullcasinoscreen" });
            dispatch({ type: "DEL", key: "casinolaunch" });
        }
    }, []);

    return (
        <>
            {(!state?.fullcasinoscreen && !state?.hideBigIconNav) && <section className="launched-game-header">
                <div className="row">
                    <div className="col-10"><span className="py-1 pl-2 pr-3 mt-1 ml-3 bg-[rgba(255,255,255,0.1)] cursor-pointer" onClick={() => navigate("/casino")}><FaArrowLeftLong className="inline-block" /></span></div>
                    <div className="dismiss-casino-game col-2 mx-auto"><span className="casino-page-close cursor-pointer" onClick={() => navigate("/casino")}><MdOutlineClose /></span></div>
                </div>
            </section>}
            <div className={`casino-launched-game-frame relative flex items-center justify-center ${state?.fullcasinoscreen && "h-[100vh]"}`}>
                {/* {showPreload && <span>Loading content, please wait...</span>} */}
                <iframe 
                    className="h-[70%]"
                    allowfullscreen
                    webkitallowfullscreen
                    mozallowfullscreen
                    allow="autoplay; clipboard-write; fullscreen"
                    title={state?.casinolaunch?.game?.game?.game_name + state?.casinolaunch?.game?.game?.id}
                    width="80%"
                    height="80%"
                    src={provider.toLowerCase() == "eurovirtuals" ? noStateGame : state?.casinolaunch?.url ? state?.casinolaunch?.url : ""}
                >
                </iframe>
            </div>
        </>
    )
}


export default React.memo(CasinoLaunchedGame)