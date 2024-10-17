import React, { useState, useCallback, useContext, useEffect } from "react";
import makeRequest from "../utils/fetch-request";
import { Context } from "../../context/store";
import Notify from "../utils/Notify";
import { Link } from "react-router-dom";
import { GiSoccerBall } from "react-icons/gi";
import HomeTeamDefaultFlag from "../../assets/team-jersies/home-default.png"
import AwayTeamDefaultFlag from "../../assets/team-jersies/away-default.png"

const FreeBet = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({});
    const [state, dispatch] = useContext(Context);
    const [freebet, setFreebet] = useState(null)

    const fetchFreeBet = useCallback(async() => {
        if(isLoading) return;
        setIsLoading(true);
        setMessage(null);
        let endpoint = "/v2/user/free-bet";
        makeRequest({url: endpoint, method: "GET", api_version:2}).then(([status, result]) => {
            
            if ([200, 201].includes(status)){
                setFreebet(result);
            } else {
                Notify({status: 400, message: "Unable to fetch free bet"})
            }
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchFreeBet();
    }, [fetchFreeBet]);

    return (
        <>
            <div>
                {freebet && 
                    <div></div>
                }
                {!freebet &&
                    <Link to={"/promotions"} className="highlights">
                        <div className="marquee-card free-bet">
                            <div className="card-top-sub-heading">
                                <div className="row">
                                    <div className="col-8">
                                       <GiSoccerBall className="inline-block text-3xl mr-2"/><span className="font-bold freebet-highlight highlight-color blink-me uppercase">Free Bet</span> 
                                    </div>
                                    <div className="col-4" style={{fontSize:"11px", fontWeight:"500"}}>
                                        <div className="uppercase"><span className="type">Pre</span> 2H 30:20</div>
                                    </div>
                                </div>
                            </div>

                                <div className="main teams">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="flex">
                                                <span className="team-name w-80">Home team</span>
                                                <span className="team-flag  w-20 pl-2"><img src={HomeTeamDefaultFlag} alt="" /></span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="flex">
                                                <span className="team-flag  w-20 pr-2"><img src={AwayTeamDefaultFlag} alt="" /></span>
                                                <span className="team-name w-80 pl-2">Away team</span>
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
                                    <span className="card-option-group btn-count-3">

                                        <span className="ng-star-inserted ">
                                            <div className="option-indicator">
                                                <div className="card-event-result-name card-result-name ng-star-inserted">
                                                    <div className="card-result-name-inner">
                                                        <div className="card-result-name-text-alt" title="Fortaleza EC CE"> 1 </div>
                                                    </div>
                                                </div>
                                                <span className="card-result-odds option-value odds-right-align ng-star-inserted"><span className="ng-star-inserted" >1.65
                                                    </span>
                                                    </span></div></span>
                                        <span className="ng-star-inserted">
                                            <div className="option-indicator">
                                                <div className="card-event-result-name card-result-name ng-star-inserted"><div className="card-result-name-inner"><div className="card-result-name-text-alt" title="X"> X </div></div></div>
                                                    <span className="card-result-odds option-value odds-right-align ng-star-inserted">
                                                        <span className="ng-star-inserted">3.60</span>
                                                        </span></div></span>
                                            
                                        <span className="ng-star-inserted">
                                            <div className="option-indicator"><div className="card-event-result-name card-result-name ng-star-inserted"><div className="card-result-name-inner"><div className="card-result-name-text-alt" title="CA Mineiro MG"> 2 </div></div></div>
                                                        <span className="card-result-odds option-value odds-right-align ng-star-inserted"><span className="ng-star-inserted" >6.00</span></span>
                                
                                </div></span></span></div>
                                </div>
                        </div>
                    </Link>
                }
            </div>
        </>
    )
}


export default React.memo(FreeBet);