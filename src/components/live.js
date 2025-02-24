import React, {useContext, useLayoutEffect, useEffect, useCallback, useState, useMemo, useRef} from "react";
import {useLocation, useParams} from 'react-router-dom';
import makeRequest from './utils/fetch-request';
import {getJackpotBetslip, getBetslip} from './utils/betslip' ;

import useInterval from "../hooks/set-interval.hook";
import {Context} from '../context/store';
import socket from "./utils/socket-connect.js";
import MatchList from "./matches/index.js";
import betslip from "./right/betslip.js";
import { getFromLocalStorage } from "./utils/local-storage.js";

const CarouselLoader = React.lazy(() => import('./carousel/index.js'));

const Live = (props) => {
    const [matches, setMatches] = useState([]);
    const [state, dispatch] = useContext(Context);
    const [delay,  ] = useState(3000);
    const [fetching, setFetching] = useState(false)
    const {sportid, categoryid, competitionid } = useParams();
    const [limit, setLimit] = useState(300);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [page, ] = useState(1);
    const [betradarSportId, setBetradarSportId] = useState(1);
    const [reload, setReload] = useState(false)
    const {spid, sub_type_id} = useParams();
    const socketRef = useRef(socket);


    const handleGameSocket = (type) => {
        if(state?.selectedLivesport?.betradar_sport_id || 1) {
            if (type === "listen" && socketRef.current?.connected) {
                socketRef.current.emit('user.live-match-page.listen', betradarSportId);
            } else if (type === "leave") {
                socketRef.current?.emit('user.live-match-page.leave', betradarSportId);
            }
        }
        };

    useEffect(() => {
        let interval;
        if(!socket.connected) {
            interval = setInterval(() => {
                fetchData();
            }, 3000);
            
        } else {
            clearInterval(interval);
            handleGameSocket("listen");
            socket.on(`surebet#live-match-page#${state?.selectedLivesport?.betradar_sport_id || 1}`, (data) => {
                setMatches((preveMatches) => {
                    let odds = {}
                    let selectedSport = state?.selectedLivesport ? state?.selectedLivesport?.betradar_sport_id : 1
                    let sport_name = state?.selectedLivesport ? state?.selectedLivesport?.sport_name : "soccer"
                    if(selectedSport == 1){
                        odds["1x2"] = {"sub_type_id":1, "name":"1x2", "special_bet_value":"", "outcomes":[]};
                        odds["Double Chance"] = {"sub_type_id":10, "name":"Double Chance", "special_bet_value":"", "outcomes":[]};
                        odds["Total"] = {"sub_type_id":18, "name":"Total", "special_bet_value": "2.5", "outcomes":[]};

                    } else {
                        odds[state?.selectedLivesport?.dafault_display_markets] = {
                            "sub_type_id": state?.selectedLivesport?.default_market, 
                            "name": state?.selectedLivesport?.dafault_display_markets, "special_bet_value":"", "outcomes": []}

                    }
                    
                    data.odds = odds;
                    data.sport_name = sport_name

                    return [...preveMatches, data].sort((a, b) => ((a.start_time - b.start_time) || (b.match_time - a.match_time)))
                }
                
            );

        })
    }

    


    return () => {
        clearInterval(interval);
        handleGameSocket("leave");
    };
        
    }, [betradarSportId, socket.connected])


    const fetchData = () => {
        let endpoint = "/v2/sports/matches/live/" + (spid || 79) 
            + (`${ state?.selectedLivesport && state?.selectedLivesport?.sport_name?.toLowerCase() !== "soccer" ? "/" 
            + state?.selectedLivesport?.default_market : ""}`) +"?page=" + (page || 1) + `&size=${limit || 200}`;
        let method =  "GET";
        setFetching(true);
        makeRequest({url: endpoint, method: method, api_version:2}).then(([status, result]) => {
            setFetching(false)
            if (status == 200) {
                setMatches(result?.data?.items || result)
                setProducerDown(result?.producer_status == 1);
            } else {
                setMatches([])
            }
        });
    };


    useEffect(() => {
        fetchData();
    }, [spid]);

    useEffect(() => {
        if (state?.selectedLivesport) {
            if(spid) {
                fetchData();
            }
            setBetradarSportId(state?.selectedLivesport?.betradar_sport_id)
        }

    }, [state?.selectedLivesport]);

    useEffect(() => {
        if (reload == true) {
            fetchData();
        }
        setReload(false);

    }, [reload])

    

    useEffect(() => {
        let currentLive = getFromLocalStorage("selectedLivesport");
        if(!state?.selectedLivesport && currentLive) {
            dispatch({type:"SET", key:"selectedLivesport", payload: currentLive});
        }
    }, []);

    return (
        <>
            <CarouselLoader />
            {<MatchList
                fetching={fetching}
                three_way = {state?.selectedLivesport ? state?.selectedLivesport?.sport_type == "threeway" : true}
                live
                setReload={setReload}
                matches={matches}
                pdown={producerDown}
                betslip_key={'betslip'}
                subTypes={state?.selectedLivesport 
                    ? 
                    state?.selectedLivesport?.sport_name?.toLowerCase() !== "soccer" 
                    ? 
                    [state?.selectedLivesport?.default_market] 
                    :
                    [1,10,18]
                    :
                    [1,10,18]
                }
                
                />}
        </>
    )
}

export default Live
