import React,  {
    useLayoutEffect, 
    useState,
    useCallback,
    useEffect,
    useContext,
} from "react";
import { useNavigate, useParams } from 'react-router-dom';


import makeRequest from "./utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import { getBetslip } from './utils/betslip' ;

import { MarketList } from './matches/index';
import { Context } from "../context/store";
import socket from "./utils/socket-connect";
import AllMarketsUnavailable from "./utils/all-markets-unavailable";

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/awesome/Sidebar'));
const Right = React.lazy(()=>import('./right/index'));

const MatchAllMarkets = (props) => {
    const [page, setPage] = useState(1);
    const [producerDown, setProducerDown] = useState(false);
    const { live } = props;
    const [matchwithmarkets, setMatchWithMarkets] = useState();
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [, dispatch] = useContext(Context);
    const navigate = useNavigate();
    

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function(key){
            return betslips[key];
        });
        return values;
    };
       
    
    useEffect(() => {fetchPagedData()}, []);

    const fetchPagedData =useCallback(async() => {
        if(!isLoading && !isNaN(+params.id)) {
            setIsLoading(true);
            let betslip = findPostableSlip();
            let endpoint = live ? "/v2/sports/match/live/" + params.id :
            "/v2/sports/match/" + params.id
            await makeRequest({url: endpoint, method: "GET", api_version:2}).then(([status, result]) => {
                setMatchWithMarkets(result?.data);
                setProducerDown(result?.producer_status == 1);
                setIsLoading(false);
            });
        }
    }, [params.id]);

    const handleGameSocket = (type) => {
            if (type === "listen" && socket.connected) {
                socket.emit('user.match.listen', matchwithmarkets?.parent_match_id);
            } else if (type === "leave") {
                socket.emit('user.match.leave', matchwithmarkets?.parent_match_id);
            }
    };
    useEffect(() => {
        if(socket.connected){
            if(matchwithmarkets) {
                handleGameSocket("listen")
            }
    
    
            socket.on(`surebet#${matchwithmarkets?.parent_match_id}`, (data) => {
                console.log("ANY GAME LEVEL MESSAGE", data);
                console.log("THE MATCHWITH MARKETS SHOW  ", matchwithmarkets)
                
                if(data.message_type == "betstop") {
                
                    if(data.markets == "all") {
                        setMatchWithMarkets((prevMatch) =>{
                            let newOdds = prevMatch.odds;
                            let newOddsMatch = prevMatch
                            Object.keys(newOdds).forEach(key => {
                                newOdds[key].outcomes.forEach((item, idx) => {
                                    newOdds[key].outcomes[idx].market_status = data.market_status
                                })
                            })
                            newOddsMatch.odds = newOdds;
                            return newOddsMatch
                        })
                    } else {
                        let marketIds = data.markets.split(",");
                        marketIds.forEach(item => {
                            setMatchWithMarkets((prevMatch) =>{
                                let newOdds = prevMatch.odds;
                                let newOddsMatch = prevMatch
                                Object.keys(newOdds).forEach(key => {
                                    if (newOdds[key].sub_type_id == item) {
                                        newOdds[key].outcomes.forEach((item, idx) => {
                                            newOdds[key].outcomes[idx].market_status = data.market_status
                                        })
                                    }
                                })
                                newOddsMatch.odds = newOdds;
                                return newOddsMatch
                            })
                        })
                    }
                }
    
            })
            return () => {
                handleGameSocket("leave")
    
            }
        }
        
    }, [matchwithmarkets, socket.connected])
    // even if we are connected on socket, we may have to poll after some time so as to get the newest games
    
    // useInterval(async () => {
    //     if(!isLoading){
    //         fetchPagedData();
    //     }

    // }, 5000);

    useEffect(()=> {
        
        // if(live) {
        //     if(socket.connected){ setDelay(5000) } else { setDelay(3000) }
        // } else {
        //     if(socket.connected){ setDelay(10000) } else { setDelay(15000) }
        // }

        // dispatch({type:"SET", key: "matchlisttype", payload: "normal"});

        // return () => {
        //     dispatch({type:"DEL", key: "matchlisttype"});
        // }

    },[])


   return (
       <>
           
        <div className="homepage">
            {matchwithmarkets !== null && <MarketList live={live}  
                initialMatchwithmarkets={matchwithmarkets} 
                pdown={producerDown} />}
        </div>


        {((!matchwithmarkets || matchwithmarkets == null) && !isLoading) && 
            <AllMarketsUnavailable backLink={live ? "/live" : "/"} isLoading={isLoading}/>
        }
           
       </>
   )
}

export default MatchAllMarkets;
