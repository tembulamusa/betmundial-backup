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
    const [betstopMessage, setBetstopMessage] = useState();
    

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function(key){
            return betslips[key];
        });
        return values;
    };
       
    
    useEffect(() => {
        socket.connect();
        fetchPagedData()
        return () => {
            socket.disconnect();
        }
    }, []);

    

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
        socket.emit('user.match.listen', matchwithmarkets?.parent_match_id);
            
    };
    useEffect(() => {
        let interval;
        if(!socket.connected) {
            interval = setInterval(() => {
                fetchPagedData();
            }, 3000);
            
        } else {
            clearInterval(interval);
            if(matchwithmarkets) {
                handleGameSocket("listen")
            }
            socket.on(`surebet#${matchwithmarkets?.parent_match_id}`, (data) => {
                if(data.message_type == "betstop") {
                   setBetstopMessage(data);
                } else {
                    if(["ended"].includes(data.match_status.toLowerCase())) {
                        window.location.reload();
                    }
                }
                
            })
            
        }

        return () => {
            clearInterval(interval)
        }
    }, [matchwithmarkets, socket.connected])

   return (
       <>
           
        <div className="homepage">
            {matchwithmarkets !== null && <MarketList live={live}  
                initialMatchwithmarkets={matchwithmarkets} 
                pdown={producerDown} 
                betstopMessage = {betstopMessage} 
                setBetstopMessage={setBetstopMessage}
                />}
        </div>


        {((!matchwithmarkets || matchwithmarkets == null) && !isLoading) && 
            <AllMarketsUnavailable backLink={live ? "/live" : "/"} isLoading={isLoading}/>
        }
           
       </>
   )
}

export default MatchAllMarkets;
