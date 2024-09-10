import React, {useEffect, useCallback, useState, useContext} from "react";

import {JackpotMatchList, JackpotHeader} from './matches/index';
import makeRequest from "./utils/fetch-request";
import dailyJackpot from '../assets/img/banner/jackpots/DailyJackpot.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from "react-bootstrap/Container";
import {Context} from '../context/store';
import {
    removeFromSlip,
    getBetslip,
    clearSlip,
    clearJackpotSlip, 
    formatNumber,
    addToJackpotSlip,
    getJackpotBetslip
} from './utils/betslip';


const Jackpot = (props) => {
    const [matches, setMatches] = useState(null);
    const [, dispatch] = useContext(Context);

    const fetchData = useCallback(async () => {
        let match_endpoint = "/v1/matches/jackpot";
        makeRequest({url: match_endpoint, method: "GET"}).then(([m_status, result]) =>  {
        
            if (m_status === 200) {
                setMatches(result);
                dispatch({type: "SET", key: "jackpotdata", payload: result?.meta});
            }
            let jackpotbetslip = getJackpotBetslip(); 
            dispatch({type: "SET", key: "jackpotbetslip", payload: jackpotbetslip});
        })

    }, []);


    useEffect(() => {

        const abortController = new AbortController();
        fetchData();
        return () => {
            dispatch({type: "DEL", key: "jackpotbetslip"});
            dispatch({type: "DEL", key: "jackpotdata"});
            abortController.abort();
        };
    }, [fetchData]);

    const AutoPickAllMatches = () => {
 
        const clean = (_str) => {
            _str = _str.replace(/[^A-Za-z0-9\-]/g, '');                                 
            return _str.replace(/-+/g, '-'); 
        }

        const randomPick = (min, max) => {
            return Math.floor(min + Math.random()*(max - min + 1));
        }

        if(matches) {
            let betslip;
            Object.entries(matches?.data).map(([key, match]) => {
               let reference = match.match_id + "_selected";
               let pick = randomPick(1, 3);
               let pickedValue = (pick === 1 ? match.home_team : (pick ===  2 ? 'draw': match.away_team));
               let oddValue = (pick === 1 ? match.odds.home_odd : (pick ===  2 ? match.odds.neutral_odd: match.odds.away_odd));
               let cstm = clean(match.match_id + "" + 1 + pickedValue );

               let slip = {                                                            
                    "match_id": match.match_id,                                                    
                    "parent_match_id": match.parent_match_id,                                            
                    "special_bet_value": '',                                           
                    "sub_type_id": 1,                                                
                    "bet_pick":  pickedValue,  
                    "odd_value": oddValue,
                    "home_team": match.home_team,                                             
                    "away_team": match.away_team,                                             
                    "bet_type": "jackpot",                                               
                    "odd_type": "3",                                               
                    "sport_name": "soccer",                                           
                    "live": 0,                                                       
                    "ucn": cstm,                                                        
                    "market_active": 1,                                     
                }                                                           
                betslip = addToJackpotSlip(slip);                                   

                dispatch({type: "SET", key: reference, payload: cstm});         
            })
            dispatch({type: "SET", key: "jackpotbetslip", payload: betslip});        
        }
    }

    useEffect(() => {
        dispatch({type:"SET", key: "isjackpot", payload: true});

        return () => {
            dispatch({type:"SET", key: "isjackpot", payload: false});

        }
    }, [])

    return (
        <>
            
            {/* <img src={dailyJackpot}/> */}
            { matches &&
                <>
                    
                    <div className="jackpot-header row bg-secondary">
                        <div className="col-12">
                            <JackpotHeader jackpot={matches?.meta}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 !px-3">
                            {
                                <div className="!px-2">
                                    <div className="jackpot-amount !pl-0 pt-3">
                                    Let the quick pick randomly choose the Jackpot Pro selections for you! KES  {Intl.NumberFormat('en-US').format(matches?.meta?.jackpot_amount) }
                                    </div>
                                </div>
                            }
                        </div>
                        {matches?.meta?.status === "ACTIVE" &&
                            <div className="col-md-4">
                                <div className="autopick-button-div my-2 !px-3">
                                    <span></span> <span className="" id="total-games"></span>
                                    <button 
                                        onClick={() => AutoPickAllMatches()}
                                        className="btn btn-auto-pick mt-3">Auto Pick</button>
                                </div>
                            </div>
                        }
                    </div>

                    {/* If games are available, then show games */}
                    {matches?.data?.length > 0
                        ?
                        (
                            <JackpotMatchList matches={matches}/>
                        )
                        :
                        (
                            <div
                                className={'col-md-12 text-center background-primary mt-2 p-5 no-events-div'}>
                                There are no jackpots at the moment.
                            </div>
                        )
                    }
                </>
            
            }
                        
        </>
    )
}

export default Jackpot
