import React, {useContext, useLayoutEffect, useEffect, useCallback, useState, useMemo} from "react";
import {useLocation, useParams} from 'react-router-dom';
import makeRequest from './utils/fetch-request';
import {getJackpotBetslip, getBetslip} from './utils/betslip' ;

import useInterval from "../hooks/set-interval.hook";
import {Context} from '../context/store';


const CarouselLoader = React.lazy(() => import('./carousel/index.js'));
const MatchList = React.lazy(() => import('./matches/index.js'));


const Live = (props) => {
    const [matches, setMatches] = useState();
    const [, dispatch] = useContext(Context);
    const [delay,  ] = useState(3000);
    const [fetching, setFetching] = useState(false)

    const {spid} = useParams();

    const [producerDown, setProducerDown] = useState(false);

    useInterval(async () => {
        let endpoint = "/v1/matches/live";
        if (spid) {
            endpoint += "?spid=" + spid;
        }
        let method =  "GET";
        setFetching(true);
        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            setFetching(false)
            if (status == 200) {
                setMatches(result?.data || result)
                setProducerDown(result?.producer_status == 1);
            }
        });
    }, 2000);

    const fetchData = useCallback(() => {
        let endpoint = "/v1/matches/live";
        if (spid) {
            endpoint += "?spid=" + spid;
        }
        //let betslip = findPostableSlip();
        let method = "GET";
        setFetching(true);
        makeRequest({url: endpoint, method: method}).then(([m_status, m_result]) => {
            setFetching(false);
            if (m_status == 200) {
                setMatches(m_result?.data || m_result)
                setProducerDown(m_result?.producer_status == 1);
            }
        } )
    }, [spid]);

    useInterval(async () => {
        fetchData();
      }, delay);

    useEffect(() => {
        fetchData();
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => {
            setMatches(null);
        };
    }, [fetchData]);

    return (
        <>
            <CarouselLoader />
            {<MatchList fetching={fetching} three_way live matches={matches} pdown={producerDown}/>}
               
        </>
    )
}

export default Live
