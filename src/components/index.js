import React, { 
    useContext, 
    useEffect, 
    useCallback, 
    useState, 
    useRef
} from "react";

import {useLocation, useParams, useSearchParams} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {getBetslip} from './utils/betslip' ;
import useInterval from "../hooks/set-interval.hook";
import {Spinner} from "react-bootstrap";
import HighlightsBoard from "./highlights-board";
import socket from "./utils/socket-connect";
import MatchList from './matches/index';
import { getFromLocalStorage, removeItem } from "./utils/local-storage";
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));


const Index = (props) => {
    const location = useLocation();
    const {sportid, categoryid, competitionid } = useParams();
    const [allSportId, setAllSportId ] = useState();
    const [delay, setDelay] = useState(5000);

    const [matches, setMatches] = useState();
    const [limit, setLimit] = useState(300);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(true);
    const [page, setPage] = useState(1);
    const [, setUserSlipsValidation] = useState();
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false)
    const [fetchingCount, setFetchingCount] = useState(0)
    const homePageRef = useRef()
    const [subTypes, setSubTypes] = useState([1,10,18]);
    // const [doPoll, setDoPoll] = useState(false);
    const [searchParams] = useSearchParams();

    
    const fetchData = (controlText) => {
        setFetching(true);
        let fetchcount = fetchingCount + 1;
        let filtersport = state?.filtersport || getFromLocalStorage("filtersport");
        if(location?.pathname == "/"){
            filtersport = null
        }
        let pageNo = 1;
        let limitSize = limit || 300;
        let tab = 'highlights';
        let method = "GET";
        let endpoint = "/v2/sports/matches/pre-match/" 
            + ((location.pathname !== "/" && filtersport?.sport_id) 
            || filtersport?.sport_id || allSportId || 79) 
            + ((filtersport && filtersport?.sport_name?.toLowerCase() !== "soccer") ? "/" 
            + filtersport?.default_market : "")  
            +"?page=" + pageNo + `&size=${limitSize}` ;

        let url = new URL(window.location.href);
        let search_term = state?.searchterm || "";
        if(state?.filtercategory) {
            endpoint += "&category_id =" + state?.filtercategory?.category_id;
        } else if(categoryid && !state?.filtermenuclicked == true) {
            endpoint += "&category_id =" + categoryid;
        }
        
        if(state?.active_tab) {
            tab = state?.active_tab;
        }
        
        endpoint += "&tab=" + tab;
        
        if(state?.filtercompetition && controlText !=="fetchAll") {
            endpoint = (controlText == "filtered") && `/v2/sports/competitions/matches/${state?.filtercompetition?.competition_id}`;

            // if (state?.filtercompetition?.competition_id == 0){
            //     endpoint = "/v2/sports/competitions/matches?page=" + (page || 1) + "&sport_id = " + (state?.filtersport?.sport_id||sportid || 79) + `&limit=${limit || 200}`;
            // }
        }
        if (search_term && search_term.length >= 3) {
            endpoint = `/v2/matches/pre-match?limit=10&search=${search_term}`;
        } 
        // else {
        //     if(state?.filtercompetition ) {
        //         endpoint = `/v1/sports/competition/matches?id=${state?.filtercompetition?.competition_id}`;
    
        //         if (state?.filtercompetition?.competition_id == 0){
        //             endpoint = "/v1/matches?page=" + (page || 1) + "&sport_id = " + (state?.filtersport?.sport_id||sportid || 79) + `&limit=${limit || 200}`;
        //         }
        //     }
        // } 
        endpoint = endpoint.replaceAll(" ", '');

        makeRequest({url: endpoint, method: method, api_version:2}).then(([status, result]) => {
            setFetchingCount(fetchcount);

            if (status == 200) {

                setMatches(result?.data?.items || result) //(matches?.length > 0 && page > 1) ? [...matches, ...result?.data?.items] : result?.data?.items || result)
                setFetching(false)
                
                setProducerDown(result?.producer_status == 1);
            }
        });

    };

    // useEffect(() => {
        
    // }, [location])

    
    const poll = () => {
        
    }
    
    useEffect(() => {
        let newSportId = searchParams.get('sportId');
        if(newSportId !== null) {
            fetchData("fetchAll");
        } else {
            fetchData("filtered")
            setFetchingCount(0);
        }
    }, [sportid,
        location,
        state?.filtercategory, 
        state?.filtercompetition, 
        state?.active_tab,
        state?.searchterm
    ]
    )

    useInterval( async () => {
        if(!socket.connected){
            fetchData()
        }
    } ,1000 * 60);

    useEffect(()=> {
        socket.connect();
        socket.on(`surebet#producer_status}`, (data) => {
            setProducerDown(data.producer_status == 1);
            
        });        
        return () => {
            socket.disconnect();
        }
    },[])
    document.addEventListener('scrollEnd', (event) => {
        if (!fetching) {
            setFetching(true);
            setPage(page + 1);
        }
    })

    return (

        <>
            <div className="homepage" ref={homePageRef}>
                <CarouselLoader/>
                {/* The highlights board  for running adverts and exposing high interest items */}

                <section className="highlights-board">
                    <HighlightsBoard />
                </section>
                {/* End of highlights board */}

                {/* Start tabs */}
                <MainTabs tab={location.pathname.replace("/", "") || 'highlights'} />
                {
                    <MatchList
                        socket={socket}
                        live={false}
                        matches={matches}
                        pdown={producerDown}
                        three_way={state?.filtersport ? state?.filtersport?.sport_type == "threeway" : true}
                        fetching={fetching}
                        subTypes={state?.filtersport 
                            ?
                            state?.filtersport?.sport_name.toLowerCase() !== "soccer"
                            ?
                            [state?.filtersport?.default_market] 
                            :
                            [1,10,18]
                            :
                            [1,10,18]
                            }
                        betslip_key={"betslip"}
                        fetchingcount={fetchingCount}
                    />
                }
            </div>
            {/* <div className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}> */}
                {/* <Spinner animation={'grow'} size={'lg'}/> */}
            {/* </div> */}
        </>
    )
}

export default React.memo(Index);
