import React, { 
    useContext, 
    useEffect, 
    useCallback, 
    useState, 
    useRef
} from "react";

import {useLocation, useParams} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {getBetslip} from './utils/betslip' ;
import useInterval from "../hooks/set-interval.hook";
import {Spinner} from "react-bootstrap";
import NoEvents from "./utils/no-events";
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const MatchList = React.lazy(() => import('./matches/index'));


const Index = (props) => {
    const location = useLocation();
    const {sportid, categoryid, competitionid } = useParams();

    const [matches, setMatches] = useState([]);
    const [limit, setLimit] = useState(50);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(false);
    const [page, ] = useState(1);
    const [, setUserSlipsValidation] = useState();
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false)
    const homePageRef = useRef()
    const [subTypes, setSubTypes] = useState("1,18,29");
    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };


    const fetchData = async () => {
        setFetching(true)
        let tab = 'highlights';
        let method = "GET";
        let endpoint = "/v1/matches?page=" + (page || 1) + `&limit=${limit || 50}` ;

        let url = new URL(window.location.href)
        endpoint += "&sport_id = " + (state?.filtersport?.sport_id || sportid || 79);
        let search_term = state?.searchterm || ""; 

        
        if(state?.filtercategory) {
            endpoint += "&category_id =" + state?.filtercategory?.category_id;
        } else if(categoryid && !state?.filtermenuclicked === true) {
            endpoint += "&category_id =" + categoryid;
        }
        
        if(state?.active_tab) {
            tab = state?.active_tab;
        }
        
        endpoint += "&tab=" + tab;
        
        if(state?.filtercompetition ) {
            endpoint = `/v1/sports/competition/matches?id=${state?.filtercompetition?.competition_id}`;

            if (state?.filtercompetition?.competition_id == 0){
                endpoint = "/v1/matches?page=" + (page || 1) + "&sport_id = " + (state?.filtersport?.sport_id||sportid || 79) + `&limit=${limit || 200}`;
            }
        }
        if (search_term && search_term.length >= 3) {
            endpoint = `/v1/matches?limit=10&search=${search_term}`;
        }
        endpoint = endpoint.replaceAll(" ", '');
        
        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches?.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data);
                }
                setProducerDown(result?.producer_status === 1);
            }
        });

    };

    useInterval(async () => {
      fetchData();
    }, 10000); 


    useEffect(() => {
        fetchData();
    }, [
        state?.filtersport, 
        state?.filtercategory, 
        state?.filtercompetition, 
        state?.active_tab,
        state?.searchterm
    ]
    )

    useEffect(() => {
        if(state?.selectedmarkets){ 
            setSubTypes(state.selectedmarkets);
        } 

        if(state?.categories) {
            let spid = Number(sportid || 79);
            let sp = state.categories.all_sports.find((sport) => sport.sport_id === spid);
            setSubTypes(state?.selectedmarkets || sp.default_display_markets);
        } 
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => {
            setMatches(null);
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, [subTypes]);

    useEffect(() => {
        checkThreeWay()
    }, [subTypes]);


    useEffect(() => {
        let url = new URL(window.location);
        setSubTypes(
             state?.selectedmarkets ||  "1,18,29"
        );
    }, [state?.selectedmarkets]);

    const listInnerRef = useRef();

    const checkThreeWay = () => {
        setThreeWay(subTypes.split(",").includes("1"))
    }

    document.addEventListener('scrollEnd', (event) => {
        if (!fetching) {
            setFetching(true)
            setLimit(limit + 50)
        }
    })

    return (

        <>
            <div className="homepage" ref={homePageRef}>
                <CarouselLoader/>
                <MainTabs tab={location.pathname.replace("/", "") || 'highlights'} />
                {/* <MobileCategories/> */}

                {
                    <MatchList
                        live={false}
                        matches={matches}
                        pdown={producerDown}
                        three_way={threeWay}
                        fetching={fetching}
                        subTypes={subTypes}
                    />
                    

                }
                
            </div>
            <div className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                <Spinner animation={'grow'} size={'lg'}/>
            </div>
        </>
    )
}

export default Index
