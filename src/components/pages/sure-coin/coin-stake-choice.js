import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/store";
import { FaMinus } from "react-icons/fa";
import { CgAdd, CgRemove } from "react-icons/cg";


const CoinStakeChoice = (props) => {
    const {coinnumber, isspinning, istakingbets} = props;
    const [amount, setAmount] = useState(10);
    const [choice, setChoice] = useState("head");
    const [state, dispatch] = useContext(Context);
    const [inputErrors, setInputErrors] = useState({});
    const [disabledBetBtn, setDisabledBetBtn] = useState(false);
    const [defaultAmountChange, setDefaultAmountChange] = useState(10);
    const [minimumBetAmount, setMinimumAmount] = useState(5);
    const [netWinning, setNetWinning] = useState();
    const [pickedBtn, setPickedBtn] = useState(false);

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

    const changeAmount = (changeType) => {

        if (changeType === "increase") {
            let newAmount = defaultAmountChange + amount
            setAmount(newAmount);
        } else if (changeType === "decrease") {
            let newAmount = amount - defaultAmountChange
            if (newAmount > minimumBetAmount) {
                setAmount(newAmount);
            } else {
                setAmount(minimumBetAmount)
            }
        }
    }

    const pickClick = (pick) => {

        if (pick === "tails") {
            if (pickedBtn === "tails") {

            }
        }

    }
    return (
        <>
            <div className="user-input-section" onClick={() => setcanplayTheitems()}>
                <div>coin #{coinnumber}</div>
                <div className="auto-bet-selector">
                    auto selector
                </div>
                <div className="user-input-main flex">
                    <div className="input-collector flex-col w-1/2">
                        <div className="sure-coin-amount-input-section flex font-[700]">
                            <CgRemove
                                onClick={() => changeAmount("decrease") }
                                className="mt-1 text-3xl opacity-60 hover:opacity-100 cursor-pointer" />
                            <input
                                onChange={(e) => amountChanged(e)} 
                                type="number"
                                value={amount}
                                min={minimumBetAmount}
                                className="border-[transparent] bg-[transparent] user-amount-input px-3"/>

                            <CgAdd className="mt-1 text-3xl opacity-60 hover:opacity-100 cursor-pointer" onClick={() => changeAmount("increase") }/>
                        </div>
                        <div className="win-info">
                            <div className="odds"><span className="multiplier-txt">Odds</span> <span className="multiplier-value float-end">X2</span></div>
                            <div className="win-amount"><span>Payout</span><span className="float-end">{amount * 2}</span></div>
                        </div>
                    </div>
                    <div className="flex-col w-1/2">
                        <div className={`input-place-bet-btn ml-4 text-center w-full`}>

                            <div className="">
                                <button
                                    className={`pickBtn head uppercase ${pickedBtn === "heads" ? "selected-btn selected-head" : ""}`}
                                    onClick={() => pickClick("heads")}
                                    disabled={disabledBetBtn}>
                                        Heads
                                </button>
                            </div>

                            <div className="">
                                <button
                                    className={`pickBtn tail uppercase ${pickedBtn === "tails" ? "selected-btn selected-tail" : ""}`} 
                                    onClick={() => pickClick("tails")}
                                    disabled={disabledBetBtn}>
                                    Tails
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="autopick-settings">autopick-settings</div>
            </div>
        </>
    )
}

export default React.memo(CoinStakeChoice);