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
    useInterval(() => {
		let endpoint = live 
			? "/v2/sports/match/live/" + params.id
			: "/v2/sports/match/"+params.id;

        let betslip = findPostableSlip();
        let method = "GET";

		makeRequest({url:endpoint, method:method, api_version:2}).then(([_status, response]) => {
			if (_status == 200)
                {setMatchWithMarkets(response?.data || response );
                if(response?.slip_data) {
                    setUserSlipsValidation(response?.slip_data);
                }
                setProducerDown(response?.producer_status == 1);
            }  else {
                navigate("/");
            }
		});                                                                     
    }, (live ? 2000: null));


    const fetchPagedData =useCallback(async() => {
        if(!isLoading && !isNaN(+params.id)) {
            setIsLoading(true);
            let betslip = findPostableSlip();
            let endpoint = live 
                ? "/v2/sports/match/live/" + params.id
                : "/v2/sports/match/"+params.id;
            await makeRequest({url: endpoint, method: "GET", api_version:2}).then(([status, result]) => {
                setMatchWithMarkets(result?.data|| result)
                setProducerDown(result?.producer_status == 1);
                setIsLoading(false);
            });
        }
    }, [params.id]);

    useEffect(()=> {
        dispatch({type:"SET", key: "matchlisttype", payload: "normal"});
        return () => {
            dispatch({type:"DEL", key: "matchlisttype"});
        }
    },[])

    useLayoutEffect(() => {
        const abortController = new AbortController();                          
        fetchPagedData();
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [fetchPagedData, params.id]);

   return (
       <>
           
        <div className="homepage">
            <MarketList live={live}  
                matchwithmarkets={matchwithmarkets} 
                pdown={producerDown} />
        </div> 
           
       </>
   )
}

export default MatchAllMarkets;
