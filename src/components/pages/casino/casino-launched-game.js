import React, { useContext, useEffect } from "react";
import { Context } from "../../../context/store";
import { getFromLocalStorage } from "../../utils/local-storage";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const CasinoLaunchedGame = (props) => {
    const [state, dispatch] = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: "SET", key:"iscasinopage", payload: true});
        // check for game that is currently loaded on local storage
        if(!state?.casinolaunch) {
            if (!state?.user?.token) {
                let storedCasino = getFromLocalStorage("casinolaunch")
                dispatch({type:"SET", key:"casinolaunch", payload: storedCasino});
            } else {
                navigate("/casino")
            }
            
        }

        // if there's no state for the game, update it
        // if there's the state for the game, check to ensure it corresponds to the local storage
        // and load the latest one which is the state

        return () => {
            dispatch({type:"DEL", key:"iscasinopage"})
            dispatch({type:"DEL", key:"casinolaunch"})
        }
    }, []);

    return (
        <>
            <section className="launched-game-header">
                <div className="row">
                    <div className="col-10"><span className="py-1 pl-2 pr-3 mt-1 ml-3 bg-[rgba(255,255,255,0.1)] cursor-pointer" onClick={() => navigate("/casino")}><FaArrowLeftLong className="inline-block"/></span></div>
                    <div className="dismiss-casino-game col-2 mx-auto"><span className="casino-page-close cursor-pointer" onClick={() => navigate("/casino")}><MdOutlineClose /></span></div>
                </div>
            </section>
            <div className="casino-launched-game-frame flex items-center justify-center">
            <iframe
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