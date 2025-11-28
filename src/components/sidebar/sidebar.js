import React, { useState, useEffect, useCallback, useContext } from 'react';
import football from '../../assets/svg/football.svg'
import Competitions from './competitions';
import AllSportCompetitions from './all-sport-competition';

import {
    getFromLocalStorage,
    setLocalStorage
} from '../utils/local-storage';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeRequest from "../utils/fetch-request";


import 'react-perfect-scrollbar/dist/css/styles.css';

const SideBar = (props) => {

    const [imageLoaded, setImageLoaded] = useState(false);
    const [competitions, setCompetitions] = useState(props?.competitions);
    const [show] = useState(props?.override_display)


    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('categories');
        let endpoint = "/categories";

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({ url: endpoint, method: "get", data: null }),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status == 200) {
                setCompetitions(c_result);
            }
            setLocalStorage('categories', c_result);
        } else {
            setCompetitions(cached_competitions);
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);


    return (
        <div className={`gn d-md-block ${show ? 'd-block' : 'd-none'}`}>

            <PerfectScrollbar >
                <div className="qv rc aog alu web-element block-shadow bottom-std-margin-spacing">
                    <header>
                        <div className="header-holder">
                            <span className="col-sm-10">FOOTBAL</span>
                            <span className="col-sm-2 header-icon">
                                <img
                                    height="14px"
                                    style={{ display: imageLoaded ? 'inline' : 'none' }}
                                    src={football}
                                    alt="-"
                                />
                            </span>
                        </div>
                    </header>
                    <Competitions competitions={competitions?.top_soccer || []} />
                </div>
                <div className="web-element block-shadow bottom-std-margin-spacing">
                    <header>
                        <div className="header-holder">
                            <span className="col-sm-10">Other Sports (A-Z)</span>
                            <span className="col-sm-2 header-icon">
                                <i className="icon-football fa fa-gamepad" aria-hidden="true"></i>
                            </span>
                        </div>
                    </header>
                    <AllSportCompetitions competitions={competitions?.all_sports || []} />
                </div>
            </PerfectScrollbar>
        </div>
    )
}
export default React.memo(SideBar);
