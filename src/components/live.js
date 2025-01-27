import React, {useContext, useLayoutEffect, useEffect, useCallback, useState, useMemo} from "react";
import {useLocation, useParams} from 'react-router-dom';
import makeRequest from './utils/fetch-request';
import {getJackpotBetslip, getBetslip} from './utils/betslip' ;

import useInterval from "../hooks/set-interval.hook";
import {Context} from '../context/store';
import socket from "./utils/socket-connect.js";
import MatchList from "./matches/index.js";
import betslip from "./right/betslip.js";

const CarouselLoader = React.lazy(() => import('./carousel/index.js'));

const Live = (props) => {
    const [matches, setMatches] = useState([]);
    const [state, dispatch] = useContext(Context);
    const [delay,  ] = useState(3000);
    const [fetching, setFetching] = useState(false)
    const {sportid, categoryid, competitionid } = useParams();
    const [limit, setLimit] = useState(20);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(true);
    const [page, ] = useState(1);
    const {spid} = useParams();


    

    const fetchData = () => {
        let endpoint = "/v2/sports/matches/live/" + (spid || 79) +"?page=" + (page || 1) + `&size=${limit || 200}`;
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

    
    useInterval(async () => {
        if(!fetching) {
            fetchData();
        }
      }, 15000);


    useEffect(() => {
        fetchData();
        // let cachedSlips = getBetslip("betslip");
        // if (cachedSlips) {
        //     dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        // }
        // return () => {
        //     setMatches(null);
        // };
    }, [spid]);

    return (
        <>
            <CarouselLoader />
            {<MatchList
                fetching={fetching}
                three_way
                live
                matches={matches}
                pdown={producerDown}
                betslip_key={'betslip'}
                subTypes={"1,10,18"}
                
                />}
               
        </>
    )
}

export default Live
