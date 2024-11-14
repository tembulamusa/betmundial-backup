import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/store";
import { FaMinus } from "react-icons/fa";
import { CgAdd, CgRemove } from "react-icons/cg";
import { Switch } from "@mui/material";

const CoinStakeChoice = (props) => {
    const {coinnumber, isspinning, istakingbets, spinningoutcome, rslt, cvterfxn} = props;
    const [amount, setAmount] = useState(10);
    const [choice, setChoice] = useState("head");
    const [state, dispatch] = useContext(Context);
    const [inputErrors, setInputErrors] = useState({});
    const [disabledBetBtn, setDisabledBetBtn] = useState(false);
    const [defaultAmountChange, setDefaultAmountChange] = useState(10);
    const [minimumBetAmount, setMinimumAmount] = useState(5);
    const [netWinning, setNetWinning] = useState();
    const [pickedBtn, setPickedBtn] = useState("heads");
    const [autoPick, setAutoPick] =  useState(false);
    const [autoPicksLeft, setAutoPicksLeft] = useState(1);
    const [userPlaceBetOn, setUserPlaceBetOn] = useState(false);

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

    useEffect(() => {
        if (isspinning == false) {

            setUserPlaceBetOn(false);            
            if (autoPick == true && autoPicksLeft > 0) {
                setUserPlaceBetOn(true);
            }
            
        }
    }, [isspinning, autoPick, autoPicksLeft])

    const pickClick = (pick) => {
        if (pick === "tails") {
            setPickedBtn("tails");
        } else if (pick === "heads") {
            setPickedBtn("heads");
        }

    }

    
    useEffect(() => {
        if (amount) {
            dispatch({type:"SET",
                key: "coinselections",
                payload: state?.coinselections ? {...state?.coinselections, [coinnumber]:{pick: pickedBtn, amount: amount, userbeton:userPlaceBetOn}} : {[coinnumber]: {pick: pickedBtn, amount:amount, userbeton:userPlaceBetOn}}})
        }
    }, [amount, pickedBtn, userPlaceBetOn])

    const autoPickToggle = () => {
        setAutoPick(!autoPick)
    }
    const userChangeAutopicks = (ev) => {
        setAutoPicksLeft(parseInt(ev.target.value))
    }

    const pressBetButton = () => {
        // other validations can have an on or no action at all
        // all validations notwithstanding
        setUserPlaceBetOn(!userPlaceBetOn)
    }
    return (
        <>
            <div className="user-input-section" onClick={() => setcanplayTheitems()}>
                <div className="my-2 pt-2">PLACE YOUR BET </div>
                
                <div className="user-input-main flex">
                    <div className="input-collector flex-col w-1/2 m-1">
                        <div className="flex my-1">
                            <label className="my-2 text-white opacity-80 w-1/4 flex">Amount</label>
                            <div className="sure-coin-amount-input-section flex w-1/2">
                                <CgRemove
                                    onClick={() => changeAmount("decrease") }
                                    className="mt-1 text-3xl opacity-60 hover:opacity-100 cursor-pointer" />
                                <input
                                    onChange={(e) => amountChanged(e)} 
                                    type="number"
                                    value={amount}
                                    min={minimumBetAmount}
                                    className="border-[transparent] w-[80%] user-amount-input px-2 bg-transparent text-white"/>

                                <CgAdd className="mt-1 text-3xl opacity-60 hover:opacity-100 cursor-pointer" onClick={() => changeAmount("increase") }/>
                            </div>
                        </div>
                        <div className="win-info flex">
                            <label className="my-2 text-white opacity-80 w-1/4 ">Odds</label>
                            <div className="text-right font-[700] w-1/2 text-align-right"><small>x</small> 2</div>
                        </div>
                        <div className="win-info flex my-2">
                            <label className=" text-white opacity-80 w-1/4 flex win-amount">Payout</label>
                            <div className="text-right font-[700] w-1/2 text-align-right float-end">KES. {amount *2 }.00</div>
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
                <div className="user-selection my-2 border-t border-gray-900 pt-3 pb-2">
                    <div className={`input-place-bet-btn text-center w-full font-bol row`}>
                        <div className="col-md-6">
                            <div className="row">
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

                        <div className="col-md-6">
                            <button disabled={userPlaceBetOn} className={`btn btn-place-surecoin-bet ${userPlaceBetOn && "betplaced"}`} onClick={() => pressBetButton()}>{userPlaceBetOn ? "Placed" : "Place bet"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(CoinStakeChoice);
