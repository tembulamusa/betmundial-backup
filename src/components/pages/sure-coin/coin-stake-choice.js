import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/store";
import { FaMinus } from "react-icons/fa";
import { CgAdd, CgRemove } from "react-icons/cg";
import { Switch } from "@mui/material";
import CryptoJS from "crypto-js";

const CoinStakeChoice = (props) => {
    const {coinnumber, isspinning, istakingbets, spinningoutcome} = props;
    const [amount, setAmount] = useState(10);
    const [choice, setChoice] = useState("head");
    const [state, dispatch] = useContext(Context);
    const [inputErrors, setInputErrors] = useState({});
    const [disabledBetBtn, setDisabledBetBtn] = useState(false);
    const [defaultAmountChange, setDefaultAmountChange] = useState(10);
    const [minimumBetAmount, setMinimumAmount] = useState(5);
    const [netWinning, setNetWinning] = useState();
    const [pickedBtn, setPickedBtn] = useState(false);
    const [autoPick, setAutoPick] =  useState(false);
    const [autoPicksLeft, setAutoPicksLeft] = useState(1);



    useEffect(() => {
        // update the choice
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
        setAmount(parseInt(e.target.value));
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
                setPickedBtn(null);
            } else {
                setPickedBtn("tails");
                dispatch({type:"SET",
                    key: "coinselections",
                    payload: state?.coinselections ? {...state?.coinselections, coinnumber:"tails"} : {coinnumber: "tails"}})
            }
        } else if (pick === "heads") {
            if (pickedBtn === "heads") {
                setPickedBtn(null);
            } else {
                setPickedBtn("heads");
                dispatch({type:"SET", key: "coinselections", payload: state?.coinselections ? {...state?.coinselections, coinnumber:"heads"} : {coinnumber: "heads"}})

            }
        }

    }

    const autoPickToggle = () => {
        setAutoPick(!autoPick)
    }
    const userChangeAutopicks = (ev) => {
        setAutoPicksLeft(parseInt(ev.target.value))
    }

    // Decode the data on the client side
    const decryptedBytes = CryptoJS.AES.decrypt(spinningoutcome, CryptoJS.enc.Utf8.parse(process.env.OTCMEKEY), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    const usefullStringOutcome = (outcomestring) => {
        if (spinningoutcome == "failed") {
            // send the failed signal by negating the pick

        } else {
            let deciferredString = decryptedBytes.toString(CryptoJS.enc.Utf8);
            // for each of the decoded results, send them immediately they are done playing.
            // In fact each of the buttons should find the random time from the parent. It's work is just to spin
            // 

        }
    };

    return (
        <>
            <div className="user-input-section" onClick={() => setcanplayTheitems()}>
                <div className="my-2">coin #{coinnumber}</div>
                
                <div className="user-input-main flex">
                    <div className="input-collector flex-col w-1/2">
                        <label className="my-2 mt-3 text-white opacity-80">Amount</label>
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
                            <div className="odds"><span className="multiplier-txt">Odds</span> <span className="multiplier-value float-end"><span className="text-sm">X</span>2</span></div>
                            <div className="win-amount"><span>Payout</span><span className="float-end">{amount * 2}</span></div>
                        </div>
                    </div>
                    <div className="flex-col w-1/2 autopick-settings">
                        <div className="px-3 text-center">
                            <div>Autopick</div>
                            <Switch
                                onChange={() => autoPickToggle()}
                            />
                            {autoPick && 
                                <div className="autopicks-left sure-coin-amount-input-section w-60 md:w-30 mx-auto flex !py-0 !px-1 !bg-[rgba(0,0,0,0.2)]">
                                    <CgRemove
                                        onClick={() => setAutoPicksLeft(autoPicksLeft - 1) }
                                        className="mt-1 text-4xl opacity-60 hover:opacity-100 cursor-pointer" />
                                    <input
                                        name=""
                                        type="number"
                                        className="bg-[transparent] !w-[40px] px-2"
                                        value={autoPicksLeft}
                                        onChange={(ev) => userChangeAutopicks(ev)}
                                        max={50}
                                        min={1}

                                    />
                                    <CgAdd
                                        className="mt-1 text-4xl opacity-60 hover:opacity-100 cursor-pointer"
                                        onClick={() => setAutoPicksLeft(autoPicksLeft + 1) }/>
                                </div>
                            }
                            
                        </div>
                    </div>
                    
                </div>
                <div className="user-selection my-2 border-t border-gray-900 pt-3">
                    <div className={`input-place-bet-btn text-center w-full font-bold row`}>
                        <div className="col-6">
                            <button
                                className={`mb-2 pickBtn !w-full head uppercase ${pickedBtn === "heads" ? "selected-btn selected-head" : ""}`}
                                onClick={() => pickClick("heads")}
                                disabled={disabledBetBtn}>
                                    Heads
                            </button>
                        </div>

                        <div className="col-6">
                            <button
                                className={`pickBtn !w-full tail uppercase ${pickedBtn === "tails" ? "selected-btn selected-tail" : ""}`} 
                                onClick={() => pickClick("tails")}
                                disabled={disabledBetBtn}>
                                Tails
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(CoinStakeChoice);