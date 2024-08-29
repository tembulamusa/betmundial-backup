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

    return (
        <>
            
            <img src={dailyJackpot}/>
            { matches && 
            <Tabs
                variant={'tabs'}
                defaultActiveKey={matches?.meta.status === 'ACTIVE' ? "home":"results"}
                id=""
                className="background-primary "
                justify>
                <Tab eventKey="home" 
                    title="Jackpot" 
                    className={'background-primary'}
                    disabled = {matches?.meta.status === 'INACTIVE'}
                    >
                    {matches?.data?.length > 0 ? (
                        <>
                            <div className="jackpot-header row">
                                <div className="col-md-6"><JackpotHeader jackpot={matches?.meta}/></div>
                                <div className="col-md-6">
                                    <div className="autopick-button-div my-3">
                                        <span></span> <span className="" id="total-games"></span>
                                        <button 
                                            onClick={() => AutoPickAllMatches()}
                                            className="btn btn-auto-pick mt-3">Auto Pick</button>
                                    </div>
                                </div>
                            </div>                            
                            <JackpotMatchList matches={matches}/>
                        </>
                    ) : (
                        <div
                            className={'col-md-12 text-center background-primary mt-2 p-5 no-events-div'}>
                            There are no active jackpots at the moment.
                        </div>
                    )}
                </Tab>
                <Tab 
                    eventKey="results" 
                    title="Jackpot Results"
                    disabled = {matches?.meta.status === 'ACTIVE'}
                    >
                    <JackpotHeader jackpot={matches?.meta}/>
                    <div className="matches full-mobile sticky-top container">
                        <div
                            className="top-matches d-flex position-sticky  p-4">
                            <div className="col-md-3 bold">
                                TIME
                            </div>
                            <div className="col-md-6 bold">
                                MATCH
                            </div>
                            <div className="col-md-3 bold">
                                OUTCOME
                            </div>
                        </div>
                    </div>

                    {matches?.data.map((match, index) => (
                        <div className={'matches full-width'} key={index}>
                            <Container className="web-element">
                                <div
                                    className="col-md-12 d-flex flex-row p-2 top-matches">
                                    <div className="col-md-3">
                                        {match?.start_time}
                                    </div>
                                    <div className="col-md-6 d-flex flex-column">
                                        <div className={'small'}>
                                            {match?.category} | {match?.competition_name}
                                        </div>
                                        <div>
                                            <div className={'bold'}>
                                                {match?.home_team}
                                            </div>
                                            <div className={'bold'}>
                                                {match?.away_team}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        {match?.outcome || '-'}
                                    </div>
                                </div>
                            </Container>
                        </div>
                    ))}
                </Tab>
            </Tabs>
            
            }
                        
        </>
    )
}

export default Jackpot
