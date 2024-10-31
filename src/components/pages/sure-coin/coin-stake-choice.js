import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/store";

const CoinStakeChoice = (props) => {
    const {coinnumber, isspinning, istakingbets} = props;
    const [amount, setAmount] = useState();
    const [choice, setChoice] = useState("head");
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        
    }, [amount, choice]);


    const setcanplayTheitems = () => {
        let itemtoplay = 'canplayitems-' + coinnumber;
        if (!state?.[itemtoplay]) {
            dispatch({type: "SET", key:itemtoplay, payload:true});
        }
    }

    return (
        <>
            <div className="" onClick={() => setcanplayTheitems()}>
                <div>coin #{coinnumber}</div>
                <input type="number" min={2} className="border border-gray-200"/>
                <div>touch Coin to change</div>
            </div>
        </>
    )
}

export default React.memo(CoinStakeChoice);