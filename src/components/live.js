import React, {useContext, useLayoutEffect, useEffect, useCallback, useState, useMemo} from "react";
import {useLocation, useParams} from 'react-router-dom';
import makeRequest from './utils/fetch-request';
import {getJackpotBetslip, getBetslip} from './utils/betslip' ;

import matches from "./utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import {Context} from '../context/store';

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const LiveSideBar = React.lazy(() => import('./sidebar/live-sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const SearchBar = React.lazy(() => import('./header/search-bar'));
const MatchList = React.lazy(() => import('./matches/index'));
const Right = React.lazy(() => import('./right/index'));


const Live = (props) => {
    const [matches, setMatches] = useState();
    const [state, dispatch] = useContext(Context);
    const {spid} = useParams();

    const [producerDown, setProducerDown] = useState(false);
    const location = useLocation();
    const [userSlipsValidation, setUserSlipsValidation] = useState();

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };

    useInterval(async () => {
        let endpoint = "/v1/matches/live";
        if (spid) {
            endpoint += "?spid=" + spid;
        }
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });
    }, 2000);

    const fetchData = useCallback(async () => {
        let endpoint = "/v1/matches/live";
        if (spid) {
            endpoint += "?spid=" + spid;
        }
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        const [match_result] = await Promise.all([
            makeRequest({url: endpoint, method: method, data: betslip})
        ]);
        let [m_status, m_result] = match_result;
        if (m_status == 200) {
            setMatches(m_result?.data || m_result)
            if (m_result?.slip_data) {
                setUserSlipsValidation(m_result?.slip_data);
            }
            setProducerDown(m_result?.producer_status === 1);
        }

    }, []);


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
            {matches && <MatchList live matches={matches} pdown={producerDown}/>}
               
        </>
    )
}

export default Live
