import Header from "../../header/header";
import Footer from "../../footer/footer";
import React, { useContext, useEffect } from "react";
import { Context } from "../../../context/store";

const LiveScore = () => {
    const [, dispatch] = useContext(Context);

    useEffect(() => { dispatch({ type: "SET", key: "fullpagewidth", payload: true }); return () => { dispatch({ type: "DEL", key: "fullpagewidth" }) } }, [])
    return (
        <>
            <iframe
                src="https://s5dev.sir.sportradar.com/risecommts/en/1/season/118703/team/9"
                className={'w-full min-h-screen'}
                title="betmundial Livescore">

            </iframe>
        </>)
}

export default LiveScore
