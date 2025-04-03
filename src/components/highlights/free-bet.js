import React, { useState, useCallback, useContext, useEffect } from "react";
import makeRequest from "../utils/fetch-request";
import { Context } from "../../context/store";
import Notify from "../utils/Notify";
import { Link } from "react-router-dom";
import { GiSoccerBall } from "react-icons/gi";
import HomeTeamDefaultFlag from "../../assets/team-jersies/home-default.png"
import AwayTeamDefaultFlag from "../../assets/team-jersies/away-default.png"
import { getFromLocalStorage } from "../utils/local-storage";

const FreeBet = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({});
    const [state, dispatch] = useContext(Context);
    const [freebet, setFreebet] = useState(null)

    const fetchFreeBet = () => {
        if(isLoading) return;
        setIsLoading(true);
        setMessage(null);
        let endpoint = "/v2/user/freebet";
        makeRequest({url: endpoint, method: "GET", api_version:2}).then(([status, result]) => {
            console.log("THE FREEBET REQUEST RESULT:::: ", status, "AND RESPONSE COULD BE NULL :::: ", result);
            if (['200', '201'].includes(result?.status)){
                if(result.data != null) {
                    setFreebet(result?.data || result);
                };
            }
        });
    };

    useEffect(() => {
        if(getFromLocalStorage("user")?.has_freebet == 1) {
            fetchFreeBet();
        }
    }, []);

    return (
        <>
        {
        freebet &&
            <div className="highlights">
                <div className="marquee-card free-bet">
                    <div className="card-top-sub-heading">
                        <div className="row">
                            <div className="col-8">
                                <GiSoccerBall className="inline-block text-3xl mr-2"/><span className="font-bold freebet-highlight highlight-color blink-me uppercase">Free Bet</span> 
                            </div>
                            
                        </div>
                    </div>

                        <div className="main teams">
                            <div className="row">
                                <div className="col-4">
                                    <div className="freebet-team  text-center">
                                        <span className="team-name m-auto">
                                            <div className="team-flag  w-[20px]"><img src={HomeTeamDefaultFlag} alt="" /></div>
                                            <div className="freebet-card team-name">{freebet?.home_team}</div>
                                        </span>
                                        
                                        
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="overflow-hidden text-center">
                                        {freebet?.start_time}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="freebet-team text-center">
                                        <span className="team-name">
                                            <div className=" m-auto team-flag  w-[20px]"><img src={AwayTeamDefaultFlag} alt="" /></div>
                                            <div className="freebet-card team-name">{freebet?.away_team}</div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bet-highlight">
                            <div className="market-type ng-star-inserted">
                                <span className="line-span"></span>
                                <span className="market-name-span" title="Total Goals"> Total Goals</span>
                                <span className="line-span"></span>
                            </div>
                        </div>

                        <div className="">
                            <div className="ng-star-inserted">
                                <span className="card-option-group btn-count-3 freebet-btn">
                                    {freebet?.odds?.["1x2"]?.outcomes?.map((outcome, idx) => (

                                        <span className="ng-star-inserted ">
                                            <div className="secondary-bg-2 home-team c-btn">
                                                <div className="card-event-result-name card-result-name ng-star-inserted">
                                                    
                                                </div>
                                                <span className="card-result-odds option-value odds-right-align ng-star-inserted">
                                                    <span className="ng-star-inserted" >{outcome?.odd_value}</span>
                                                </span>
                                            </div>
                                        </span>
                                    ))}
                                </span>
                            </div>
                        </div>
                </div>
                </div>
        }
        </>
    )
}


export default React.memo(FreeBet);