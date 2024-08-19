import React, {useEffect, useCallback, useState, useContext} from "react";

import {JackpotMatchList, JackpotHeader} from './matches/index';
import makeRequest from "./utils/fetch-request";
import dailyJackpot from '../assets/img/banner/jackpots/DailyJackpot.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from "react-bootstrap/Container";
import {
    removeFromSlip,
    getBetslip,
    clearSlip,
    clearJackpotSlip, 
    formatNumber,
    addToJackpotSlip,
    getJackpotBetslip
} from './utils/betslip';
import {Context} from '../context/store';


const Jackpot = (props) => {
    const [matches, setMatches] = useState(null);
    const [weeklyJPMatches, setWeeklyJPMatches] = useState(null);
    const [dailyJPMatches, setDailyJPMatches] = useState(null);
    const [message, setMessage] = useState(null);
    const [showEmptyWeeklyJackpot, setShowEmptyWeeklyJackpot] = useState(false);
    const [showEmptyDailyJackpot, setShowEmptyDailyJackpot] = useState(false);
    const [disabledWeekly, setDisabledWeekly] = useState(false);
    const [disabledDaily, setDisabledDaily] = useState(false);
    const [currentJackpot, setCurrentJackpot] = useState(null);
    const [loadingJp, setLoadingJp] = useState(false);
    const [loadingDj, setLoadingDj] = useState(false);
    const [state, dispatch] = useContext(Context);
    const [showAppBeslip, setShowAppBetslip] = useState(false);
    const [activeDTab, setActiveDTab] = useState("home");

    const fetchData = (jpType) => {
        (jpType ==='wjp'  && activeDTab === 'home')? setLoadingJp(true) :  setLoadingDj(true);
        let match_endpoint = `/v1/matches/jackpot?key=${jpType}`;

        makeRequest({url: match_endpoint, method: "get", data: null}).then(
            ([m_status, m_result]) => {
                if (m_status === 200) {
                    clearJackpotSlip();
                if (activeDTab === "home") {
                    if (jpType == "jp"){
                        setDailyJPMatches(m_result);
                        setShowEmptyDailyJackpot(true);
                        setDisabledDaily(true);
                        setWeeklyJPMatches(false);
                        setShowEmptyWeeklyJackpot(false)
                        setDisabledWeekly(false);
                        // setCurrentJackpot(dailyJPMatches);
                        setMatches(m_result);
                    } else if (jpType == "wjp") {
                        setWeeklyJPMatches(m_result);
                        setShowEmptyWeeklyJackpot(true);
                        setDisabledWeekly(true);
                        setDailyJPMatches(false);
                        setShowEmptyDailyJackpot(false)
                        setDisabledDaily(false);
                        // setCurrentJackpot(weeklyJPMatches);
                        setMatches(m_result);
                    } else {
                        setMatches(m_result);

                    }
                    setLoadingJp(false);
                    setLoadingDj(false);
                } else {
                    setMatches(m_result);
                }

                
            } else {
                setMessage("An error occurred");
            }
            });
        

    };


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


    const placeBetClicked = (jpdata) => {
        dispatch({type: "SET", key: "jpbetpressed", payload: jpdata});
    }
    

    const removeAllClicked = () => {
        dispatch({type: "SET", key: "jpbetremoveall", payload: true});
    }

    useEffect(() => {
       if(state?.betslippressedfromabove){
           if(dailyJPMatches || weeklyJPMatches) {
               placeBetClicked(dailyJPMatches?.meta || weeklyJPMatches?.meta);      
           }
       }
    }, [state?.betslippressedfromabove])


    useEffect(() => {
       if(!state?.jpbetpressed){
       
            setShowAppBetslip(false);
       }
    }, [state?.jpbetpressed])

    useEffect(() => {
        dispatch({type: "SET", key: "jackpotpage", payload: true});         
        dispatch({type: "SET", key: "jackpotmeta", payload: matches?.meta});         
    }, [matches]);

    const JackpotsHeader = () => {
        return (
            <div className="jp-header">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-3"></div>
                    <div className="col">
                        <span className="jp-pick-type">Home</span> 
                        <span className="jp-pick-type">Draw</span>
                        <span className="jp-pick-type">Away</span>
                    </div>
                </div>
            </div>
            )
    }

    const JackpotFooter = (props) => {
        const {jackpot} = props
        return (
            <div className="jackpot-footer">
                <div className="row">
                    <div className="col-3"><button onClick={() => removeAllClicked()} className=" place-bet-btn btn uppercase" id="delete-btn" style={{color:"#ffffff !important"}}>Remove All</button></div>
                    <div className="col-3">
                        <span></span> <span className="" id="total-games"></span>
                        <button 
                            onClick={() => AutoPickAllMatches()}
                            className="btn btn-auto-pick">Auto Pick</button>
                    </div>
                    <div className="col-3">STAKE <span id="jp-stake" className="bold">{jackpot.bet_amount}</span></div>
                    <div className="col-3 d-none d-md-block">
                        <button onClick={() => placeBetClicked(jackpot)} className="uppercase place-bet-btn btn primary-bg btn-primary-bg">BET NOW</button>
                    </div>
                </div>
            </div>
        )
    }

    const JackpotsListing = () => {
        return (
            <div className="jackpots">
                <div className="jackpot-body">
                    <div className="weekly-jackpot jackpot-entry p-3 pb-4 mt-3 mb-3 primary-bg">
                        <div className="row">
                            {/* We'll fetch the jackpots first. due to detail */}
                            <div className="col-4">
                                <h3>TSH. 50,000,000</h3>
                            </div>

                            <div className="col-4">
                                <h4 className="uppercase">Biko weekly jackpot</h4>
                                <p className="more-info-text detail-text uppercase">Pick 17 games, Prizes from correct 13</p>
                            </div>

                            <div className="col-4">
                              { weeklyJPMatches && <h4> BETTING CLOSES ON <br/><span style={{opacity:"0.7"}}> {weeklyJPMatches?.meta?.bet_stop}</span> </h4> }
                            </div>

                            <div className="col-12">
                                <button onClick={() => fetchData("wjp")}
                                    disabled={disabledWeekly}
                                    className="bold mt-2 btn-lg btn btn-primary deposit-withdraw-button secondary-red-bg uppercase btn-play-jackpot btn-weekly full-width">
                                    Play for TSH. 1000
                                </button>
                                { loadingJp && 
                                    <div className="spinner-border spinner-border-sm" style={{background:"#e3e3e3 !important", width:"10px"}}role="status">
                                 <span className="sr-only">Loading...</span></div> 
                                }
                            </div>
                        </div>
                    </div>
                    <div className="jackpot-matches">
                        <div className="weekly-jp jackpot-games">

                            {weeklyJPMatches?.data?.length > 0 ? (
                                <>  
                                    <JackpotsHeader />
                                    <JackpotMatchList matches={weeklyJPMatches}/>
                                    <JackpotFooter jackpot={weeklyJPMatches?.meta}/>

                                </>
                            ) : ( showEmptyWeeklyJackpot? (
                                    <div className={'col-md-12 text-center background-primary  mt-2 p-3'}>
                                        There are no active Weekly jackpots at the moment.
                                    </div>) : ("") 
                                
                            )}
                        </div>
                    </div>
                </div>
                <div className="jackpot-body">
                    <div className="daily-jackpot jackpot-entry p-3 pb-4 mt-4 yellow-bg-2">
                        <div className="row">
                            {/* We'll fetch the jackpots first. due to detail */}
                            <div className="col-4">
                                <h3 className="black-text-shadow">TSH. 10,000,000</h3>
                            </div>

                            <div className="col-4">
                                <h4 className="uppercase black-text-shadow">Biko Daily jackpot</h4>
                                <p className="bold more-info-text detail-text uppercase">Pick 13 games, Prizes from correct 10</p>
                            </div>

                            <div className="col-4 black-text-shadow">
                              { dailyJPMatches && <h4> BETTING CLOSES ON <br/><span style={{opacity:"0.7"}}> {dailyJPMatches?.meta?.bet_stop}</span> </h4> }
                            </div>

                            <div className="col-12">

                                <button onClick={() => fetchData("jp")}
                                    disabled={disabledDaily}
                                    className="mt-2 btn-lg btn btn-primary bold deposit-withdraw-button uppercase btn-play-jackpot btn-daily full-width">
                                    Play for TSH. 250
                                </button>
                                { loadingDj && 
                                    <div className="spinner-border spinner-border-sm" style={{background:"#e3e3e3 !important", width:"10px"}}role="status">
                                 <span className="sr-only">Loading...</span></div> 
                                }
                            </div>
                        </div>
                    </div>

                    <div className="jackpot-matches">
                        <div className="daily-jp jackpot-games">

                            {dailyJPMatches?.data?.length > 0 ? (
                                <>  
                                    <JackpotsHeader />
                                    <JackpotMatchList matches={dailyJPMatches}/>
                                    <JackpotFooter jackpot={dailyJPMatches?.meta}/>
                                </>
                            ) : ( showEmptyDailyJackpot? (
                                    <div className={'col-md-12 text-center background-primary  mt-2 p-3'}>
                                        There are no active Daily jackpots at the moment.
                                    </div>) : ("") 
                                
                            )}
                        </div>
                    </div>

                </div>


            </div>
        )
    }

    
    const JackpotTabs = () => {


        const handleTabOnClick = (e) => {
        
            setActiveDTab("results");

            if(!matches && e === "results") {
               fetchData("jp");
            }
        }

        return (
            <Tabs
            variant={'tabs'}
            defaultActiveKey={activeDTab}
            id=""
            className="background-primary menu-type-tabs"
            onSelect={(e) => handleTabOnClick(e)}
            justify>

            <Tab eventKey="home" 
              title=" ALL JACKPOTS" 
              className={'background-primary'}
              >
                <JackpotsListing />

            </Tab>

            <Tab 
               eventKey="results" 
               title="RESULTS"
               >
                <div className="jp-results remove-last-element">
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


            <Tab eventKey="rules" 
              title=" RULES" 
              className={'background-primary'}
              >
                {matches?.data?.length > 0 ? (
                    <div className="h-100 text-center">
                        <h4>You'll be notified of any changes in the rules</h4>
                    </div>
                ) : (
                    <div
                        className={'col-md-12 text-center background-primary  mt-2 p-3'}>
                        You'll be notified of any new rules.
                    </div>
                )}
            </Tab>
        </Tabs>
        )
    }

    

    return (
        <>
            <JackpotTabs jackpotData={matches?.meta}/>
        </>
    )
}

export default Jackpot
