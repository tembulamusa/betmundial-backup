import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/store";
import { FaMinus } from "react-icons/fa";
import { CgAdd, CgRemove } from "react-icons/cg";


const CoinStakeChoice = (props) => {
    const {coinnumber, isspinning, istakingbets} = props;
    const [amount, setAmount] = useState();
    const [choice, setChoice] = useState("head");
    const [state, dispatch] = useContext(Context);
    const [inputErrors, setInputErrors] = useState({})

    useEffect(() => {
        
    }, [amount, choice]);


    const setcanplayTheitems = () => {
        let itemtoplay = 'canplayitems-' + coinnumber;
        if (!state?.[itemtoplay]) {
            dispatch({type: "SET", key:itemtoplay, payload:true});
        }
    }

    const amountChanged = (e) => {
        // set Controlls here eg it should be less than  equal to balance
        // else show errors
        setAmount(e.value);
    }
    return (
        <>
            <div className="user-input-section" onClick={() => setcanplayTheitems()}>
                <div>coin #{coinnumber}</div>
                <div className="auto-bet-selector">
                    auto selector
                </div>
                <div className="user-input-main">
                    <div className="input-collector">
                        <div className="amount">
                            <CgRemove />
                            
                            <input
                                onChange={(e) => amountChanged(e)} 
                                type="number"
                                value={amount}
                                min={2}
                                className="border border-gray-200 user-amount-input"/>

                            <CgAdd className=""/>
                        </div>
                        <div>touch Coin to change</div>
                    </div>
                    <button className="input-place-bet-btn ">
                        <div>Bet</div>
                        <div>{}</div>
                    </button>
                </div>
                <div className="autopick-settings">autopick-settings</div>
            </div>
        </>
    )
}

export default React.memo(CoinStakeChoice);