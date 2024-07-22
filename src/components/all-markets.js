import React,  {
    useLayoutEffect, 
    useState,
    useCallback,
} from "react";
import { useParams } from 'react-router-dom';


import makeRequest from "./utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import { getBetslip } from './utils/betslip' ;

import { MarketList } from './matches/index';

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

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function(key){
            return betslips[key];
        });
        return values;
    };
    useInterval(() => {
		let endpoint = live 
			? "/v1/matches/live?id="+params.id
			: "/v1/matches?id="+params.id;

        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";

		makeRequest({url:endpoint, method:method, data:betslip}).then(([_status, response]) => {
            console.log("GAME DEATILS11111111111111111111 !:::::::::========", response)
			setMatchWithMarkets(response?.data || response );
            if(response?.slip_data) {
                setUserSlipsValidation(response?.slip_data);
            }
            setProducerDown(response?.producer_status === 1);
		});                                                                     
    }, (live ? 2000: null));


    const fetchPagedData =useCallback(async() => {
        if(!isLoading && !isNaN(+params.id)) {
            setIsLoading(true);
            let betslip = findPostableSlip();
            let endpoint = live 
                ? "/v1/matches/live?id="+params.id
                : "/v1/matches?id="+params.id;

            await makeRequest({url: endpoint, method: "GET"}).then(([status, result]) => {
                console.log("GAME DEATILS2222222222222222 !:::::::::========", result)
                setMatchWithMarkets(result?.data|| result)
                setProducerDown(result?.producer_status === 1);
                setIsLoading(false);
            });
        }
    }, []);

    useLayoutEffect(() => {
        const abortController = new AbortController();                          
        fetchPagedData();
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [fetchPagedData]);

   return (
       <>
        <Header />
           <div className="amt">
               <div className="d-flex flex-row justify-content-between">
                   <SideBar loadCompetitions />
                   <div className="gz home"  style={{width:'100%'}}>
                       <div className="homepage">
                    <MarketList live={live}  
                        matchwithmarkets={matchwithmarkets} 
                        pdown={producerDown} />
                </div> 
            </div>  
            <Right betslipValidationData={userSlipsValidation} />
          </div>
        </div>
       <Footer />
       </>
   )
}

export default MatchAllMarkets;
