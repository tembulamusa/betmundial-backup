import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/store";
import { getFromLocalStorage } from "../../utils/local-storage";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import useInterval from "../../../hooks/set-interval.hook";

const CasinoLaunchedGame = (props) => {
    const [state, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const user = getFromLocalStorage("user");
    const launchedGame = getFromLocalStorage("casinolaunch");
    const fullScreens = ["aviatrix"];

    useEffect(() => {
        // Balance polling fxn
        dispatch({type: "SET", key:"iscasinopage", payload: true});
        // check for game that is currently loaded on local storage
        if(!state?.casinolaunch) {
            if (user?.token) {
                let storedCasino = getFromLocalStorage("casinolaunch");                
                dispatch({type:"SET", key:"casinolaunch", payload: storedCasino});
            } else {
                navigate("/casino")
            }
            
        }
        
        if (fullScreens.includes(launchedGame?.game?.provider_name?.toLowerCase())) {
            // let dga = xlg;
            // dga.connect("prelive-dga0.pragmaticplaylive.net")
            
            dispatch({type:"SET", key:"fullcasinoscreen", payload: true})
        }
        return () => {
            dispatch({type:"DEL", key:"iscasinopage"});
            dispatch({type:"DEL", key:"fullcasinoscreen"});            
            dispatch({type:"DEL", key:"casinolaunch"});
        }
    }, []);
    
    return (
        <>
            {!state?.fullcasinoscreen && <section className="launched-game-header">
                <div className="row">
                    <div className="col-10"><span className="py-1 pl-2 pr-3 mt-1 ml-3 bg-[rgba(255,255,255,0.1)] cursor-pointer" onClick={() => navigate("/casino")}><FaArrowLeftLong className="inline-block"/></span></div>
                    <div className="dismiss-casino-game col-2 mx-auto"><span className="casino-page-close cursor-pointer" onClick={() => navigate("/casino")}><MdOutlineClose /></span></div>
                </div>
            </section>}
            <div className={`casino-launched-game-frame flex items-center justify-center ${state?.fullcasinoscreen && "h-[100vh]"}`}>
            <iframe
                allow="autoplay; clipboard-write"
                title={state?.casinolaunch?.game?.game?.game_name + state?.casinolaunch?.game?.game?.id}
                width="100%"
                height="100%"
                src={state?.casinolaunch?.url}
                >
            </iframe>;
            </div>
        </>
    )
}


export default React.memo(CasinoLaunchedGame)