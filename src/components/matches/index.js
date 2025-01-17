import React, {useState, useEffect, useContext, useCallback, useRef, useLayoutEffect, useMemo} from 'react';
import {Context} from '../../context/store';
import {
    addToSlip,
    removeFromSlip,
    removeFromJackpotSlip,
    addToJackpotSlip,
    getBetslip
} from '../utils/betslip';
import {isDeepEqual} from '../utils/deep-equal';
import {Col, Container, Dropdown,Spinner, Row} from 'react-bootstrap';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import padlock from '../../assets/img/padlock.png';
import {getFromLocalStorage} from "../utils/local-storage";
import { Link } from 'react-router-dom';
import NoEvents from '../utils/no-events';
import { match } from 'assert';
import socket from '../utils/socket-connect';
import { ShimmerTable } from "react-shimmer-effects";
import MatchDetailBetrandder from "../../assets/img/betrader/test-game-details.png"
import LockedButton, { EmptyButton } from '../utils/locked-button';
import betslip from '../right/betslip';

const clean = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const EmptyTextRow = (props) => {
    const {odd_key, classname} = props;

    return (
        <button className={`${classname} inactive-odds-btn btn btn-disabled match-detail col c-btn cursor-not-allowed`}
             style={{
                //  width: "100%",
                //  height: "30px",
                //  padding: "2px",
                //  color: "#fff",
                //  background: "#d7d7d7",
                //  opacity: 1
             }} disabled>
            {odd_key && <span className="et label btn-disabled ">{odd_key}</span>}
            <span className="label label-inverse">
             <LazyLoadImage
                 style={{opacity: "0.3", width: "15px"}}
                 src={padlock}
                 effect="blur"
                 alt="--"/>
         </span>
        </button>
    );
};

const MatchHeaderRow = (props) => {
    const {
        live,
        first_match,
        jackpot,
        fetching,
        three_way, 
    } = props;

    //const [state, ]  = useContext(Context);
    const categories = getFromLocalStorage('categories')
    const sport_id = new URL(window.location).searchParams.get('sport_id') || 79
    let sport = categories?.all_sports?.filter((category) => category.sport_id == sport_id)

    const [sportName, setSportName] = useState(sport?.[0]?.sport_name || 'Soccer');
    const [showX, setShowX] = useState(true);
    const [market, setMarket] = useState('1x2');
    const [marketCols, setMarketCols] = useState(3)



    const extraMarketDisplays = [
            {
                id: "10", 
                name: "Double Chance", 
                extra_market_cols: 3, 
                extra_markets_display: [
                    "1X", "12", "X2"
                ]
            },
            {
                id: "18", 
                name: "Over/Under 2.5", 
                extra_market_cols: 2, 
                extra_markets_display: [
                    "Under", "Over"
                ]
            }
        ];




    useEffect(() => {
        if (first_match) {
            setSportName(first_match.sport_name);
            setMarket(first_match.market_name);
            /**
             * I blew the shiet here someone help recoil this to API call results
             */
            setShowX(!["186", "340"].includes(first_match.sub_type_id));

        }
    }, [first_match?.parent_match_id])


    return (
        <Container className={`${live && 'live'} full-mobile sticky-top`} style={{position: "sticky"}}>
            <div className={`${jackpot && 'jackpot-zero-top'} top-matches d-flex position-sticky sticky-top `}
                 style={{opacity: "1", top: "100px", height:""}}>
                <div className="hidden md:flex col-sm-2 col-xs-12 pad left-text" key="d5">
                    <div className="align-self-center col">
                   { fetching && <div className="filter-group-icon " >
                           <Spinner animation="border" size="sm" variant="secondary" />
                       </div>
                   }
        {/* <h3 className="main-heading-1 ">
                            {live && <span className="live-header">LIVE </span> }
                            {!live && <span className="">PREMATCH </span> }
                        </h3> */} 
                    </div>
                </div>
                <div className={'col-2 col-xs-12 match-detail-container'} key="d4">
                    <span className='md:hidden text-gray-500 font-bold'>
                        {sportName}
                    </span>
                </div>
                <div className={`${jackpot && "is-jackpot-buttons"} col ${'d-flex flex-row justify-content-between'}`}>
                    {three_way &&
                        <div className={`markets-header ${'d-flex flex-row'}`} key="d3">
                            <div className={`d-flex flex-column text-center`}>
                                <div className={'bold hidden md:block'}>
                                    3 WAY
                                </div>
                                <div className={'mt-3 c-btn-group align-self-end'}>
                                    <a className="c-btn-header" href='#/'>1</a>
                                    <a className="c-btn-header" href='#/'>X</a>
                                    <a className="c-btn-header" href='#/'>2</a>
                                </div>
                            </div>
                        </div>
                    }
                    {!jackpot && (
                       <div className='hidden md:flex flex-row'>
                            {extraMarketDisplays?.map((extra_market) => (
                                <div className={'d-flex flex-column'} key={extra_market.name}>
                                    <span className={'small text-center text-uppercase bold'}>
                                        {extra_market.name} 
                                    </span>
                                    <div className={'mt-3 c-btn-group'}>
                                        <a className="c-btn-header" href='#/'>
                                            {(extra_market.extra_markets_display[0])}
                                        </a>
                                        <a className="c-btn-header" href='#/'>
                                            {(extra_market.extra_markets_display[1])}
                                        </a>
                                        {extra_market?.extra_market_cols > 2 &&
                                            <a className={`c-btn-header`} href='#/'>
                                                {(extra_market.extra_markets_display[2])}
                                            </a>}
                                    </div>
                                </div>
                            ))}
                        </div> 
                    )}
                    <div
                        className="bet-fix events-odd pad undefined align-self-center more-markets-container m-lg-2 col-3">
                        &nbsp;
                    </div>
                </div>
            </div>
        </Container>
    )
}

const convertDateToLocalString = (date) => {
    let monthMapper = {0:"jan", 1:"feb", 2:"mar", 3:"apr", 4:"may", 5:"jun", 6:'jul', 7:"aug", 8:"sep", 9:"oct", 10:"nov", 11:"dec"}
    var theDate = new Date(date);
    let options = {month:"short", day: "numeric", hour: "2-digit", minute:"2-digit"}
    theDate.toLocaleString("en-us", options);
    let reconvert  = new Date(theDate);
    let formattedString = " " + reconvert.getDate() + " " + monthMapper[reconvert.getMonth()] + " / " + reconvert.getHours() + ":" + reconvert.getMinutes()
    return formattedString
}
const MoreMarketsHeaderRow = (props) => {
    const {
        
        match,
        live
    } = props;

    const LivescoreFooter = () => {

        return (

            <div className="livescore-footer-links flex capitalize px-3">
                <div className="footer-item">Match</div>
                <div className="footer-item">Head to head</div>
                <div className="footer-item">standings</div>
                <div className="footer-item">lineups</div>
            </div>
        )
    }
    return (
        <>
            <div className="match-detail-header panel-header primary-bg pt-3">
                <div className="text-center">

                    <div className="inline-block text-center mb-3">
                        {match?.home_team} <small> - </small> {match?.away_team}
                    </div>

                    {live &&
                        <Row className="header-text">
                            <Col style={{
                                color: "#cc5500",
                                marginBottom: "5px"
                            }}> {match?.status == 'Ended' && 'Ended '} {match?.score}</Col>
                        </Row>
                    }
                    <Row className="header-text font-[400]">
                        <Col>{match?.category} - {match?.competition_name}</Col>
                    </Row>
                    {match?.status !== 'Ended' &&
                        <Row className="start-time text-center my-3">
                            {live
                                ? <Col>Live: <span style={{color: "#cc5500"}}>{match?.match_time || match?.status}</span></Col>
                                : <Col className="capitalize font-[400]"><span className='opacity-70'></span> {convertDateToLocalString(match?.start_time)}</Col>}

                            <Col className='font-normal opacity-70' style={{fontSize:"1.2rem"}}>Game ID: {match?.game_id} </Col>
                        </Row>
                    }
                </div>
            </div>
            
            {/* The livescore filter */}
            <div id='livescore' className=''>
                <div id='livescore-content'><img src={MatchDetailBetrandder} className="main-img" alt="" /></div>
                <div id='livescore-footer-links'><LivescoreFooter /></div>
            </div>
        </>
    )
}

const SideBets = (props) => {
    const {match, live} = props;
    const [picked,] = useState();
    return (
        <div
            className={` ${picked} align-self-center more-markets-container m-lg-2`}>
            {(match?.sidebets > 1) && <>
                <a className="side" title={'More Markets'}
                   href={`/match/${live ? 'live/' : ''}${
                       match?.match_id}`
                   }>+{match.sidebets}
                </a>
                { /**
                   <a className="side"
                   href=#
                   target={"_blank"}
                   title={'View Stats'}>
                    <FontAwesomeIcon icon={faChartLine}/>
                </a>
                **/ }
            </>}
        </div>
    )

}

const OddButton = (props) => {
    const {match, mkt, detail, live, jackpot, subType, marketKey} = props
    const [ucn, setUcn] = useState('');
    const [picked, setPicked] = useState('');
    const [oddValue, setOddValue] = useState(null);
    let reference = match.match_id + "_selected";
    const [state, dispatch] = useContext(Context);
    const ref = useRef();
    const [betslip_key, setBetslipKey] = useState('betslip');

    const updateBeslipKey = useCallback(() => {
        if (jackpot) {
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot]);
    useEffect(() => {
        updateBeslipKey();
    }, [updateBeslipKey])


    const OddButtonChange = () => {

        
    }
    const updateOddValue = useCallback(() => {
        if (match) {
            let uc = clean(
                match.match_id
                + "" + (match?.odds?.sub_type_id || match?.sub_type_id)
                + (match?.[mkt] || match?.odd_key || mkt || "draw")
            );
            setUcn(uc);
            setOddValue(match?.odd_value);
            
        }
    }, [match]);

    useLayoutEffect(() => {
        updateOddValue();
    }, [updateOddValue]);

    const updatePickedChoices = () => {
        
        let betslip = state?.[betslip_key]
        let uc = clean(
            match.match_id
            + "" + (match?.odds?.sub_type_id || match?.sub_type_id)
            + (match?.[mkt] || match?.odd_key || mkt)
        );
        if ((betslip?.[match.match_id]?.match_id == match.match_id)
            && uc == betslip?.[match.match_id]?.ucn) {
            setPicked('picked');
        } else {
            setPicked('');
        }

    }
    useEffect(() => {
        updatePickedChoices();
    }, [state?.[betslip_key], state?.betslip])
    
    useEffect(() => {
        updatePickedChoices();
    }, [])


   const updateMatchPicked = useCallback(() => {
       if (state?.[reference]) {
           if (state?.[reference].startsWith('remove.')) {
               setPicked('');
           } else {
               let uc = clean(
                   match.match_id
                   + "" + (match?.odds?.sub_type_id || match?.sub_type_id)
                   + (match?.[mkt] || match?.odd_key || mkt)
               );
               if (state?.[reference] == uc) {
                setPicked('picked')
               } else {
                   setPicked('');
               }
          }
       }
    }, [state?.[betslip_key]?.[match.match_id], state?.betslip, state?.jackpotbetslip, state?.[betslip_key]])


    useEffect(() => {
        updateMatchPicked();
    }, [updateMatchPicked])

    const handleButtonOnClick = (event) => {
        let pmid = event.currentTarget.getAttribute("parent_match_id");
        let mid = event.currentTarget.getAttribute("match_id");
        let stid = event.currentTarget.getAttribute("sub_type_id");
        let sbv = event.currentTarget.getAttribute("special_bet_value");
        let oddk = event.currentTarget.getAttribute("odd_key");
        let odd_value = event.currentTarget.getAttribute("odd_value");
        let pick_key = event.currentTarget.getAttribute("pick_key");
        let bet_type = event.currentTarget.getAttribute("bet_type");
        let odd_type = event.currentTarget.getAttribute("odd_type");
        let home_team = event.currentTarget.getAttribute("home_team");
        let away_team = event.currentTarget.getAttribute("away_team");
        let sport_name = event.currentTarget.getAttribute("sport_name");
        let market_active = event.currentTarget.getAttribute("market_active");
        let start_time = event.currentTarget.getAttribute("start_time");
        let producer_id = event.currentTarget.getAttribute("producer_id");
        let cstm = clean(mid + "" + stid + oddk + (marketKey != undefined ? marketKey : ''));

        let slip = {
            "match_id": mid,
            "parent_match_id": pmid,
            "special_bet_value": sbv,
            "sub_type_id": stid,
            "bet_pick": pick_key,
            "odd_value": odd_value,
            "home_team": home_team,
            "away_team": away_team,
            "bet_type": bet_type,
            "odd_type": odd_type,
            "sport_name": sport_name,
            "live": live ? 1: 0,
            "ucn": cstm,
            "event_status": match?.status,
            "market_active": market_active,
            "start_time": start_time,
            "producer_id": producer_id
        }

        setPicked('');
        if (cstm == ucn) {
            let betslip;
            if (picked == 'picked') {
                betslip = jackpot !== true
                    ? removeFromSlip(mid)
                    : removeFromJackpotSlip(mid);
                dispatch({type: "SET", key: reference, payload: "remove."+cstm });
            } else {
                betslip = jackpot !== true
                    ? addToSlip(slip)
                    : addToJackpotSlip(slip);

                dispatch({type: "SET", key: reference, payload: cstm });
            }
            dispatch({type: "SET", key: betslip_key, payload: betslip});
        }
    };

    return (
        <button
            ref={ref}
            className={`secondary-bg-2 home-team ${match.match_id} ${ucn} ${picked} c-btn`}
            home_team={match.home_team}
            odd_type={match?.market_name || match?.display || match?.special_bet_key || "1X2"}
            bet_type={live ? 1 : 0}
            away_team={match.away_team}
            market_active={match.market_active}
            odd_value={oddValue}
            odd_key={match?.odd_key}
            pick_key={match?.odd_key}
            parent_match_id={match.parent_match_id}
            match_id={match.match_id}
            custom={ucn}
            producer_id={match?.producer_id}
            sport_name={match.sport_name}
            start_time={match.start_time}
            sub_type_id={match?.odds?.sub_type_id || match?.sub_type_id}
            special_bet_value={match?.odds?.special_bet_value || match?.special_bet_value || ''}
            onClick={handleButtonOnClick}>
            {!detail &&
                (
                    <span className="theodds odd-fix">
                            {parseFloat(oddValue).toFixed(2)}
                        </span>
                )
            }
            {detail &&
                (<>
                      <span
                          className="label label-inverse">
                        {match.odd_key} {(!match?.odd_key.includes(match?.special_bet_value) && !match?.special_bet_value.toLowerCase().includes("sr:")) && `(${match?.special_bet_value})`}
                      </span>
                    <span
                        className="label label-inverse odd-value">
                            {parseFloat(match?.odd_value).toFixed(2)}
                     </span>
                </>)}
        </button>
    )
}


const teamScore = (allscore, is_home_team) => {
    let allScores = allscore != null ? allscore.split(":") : ["-", "-"];
    let homeScore = allScores[0];
    let awayScore = allScores[1];
    let score = homeScore;
    if(is_home_team == false) {
        score = awayScore
    }
    return score;
}

const MarketRow = (props) => {
    const {markets, match, market_id, width, live, pdown, marketDetail} = props;
    const [mutableMkts, setMutableMkts] = useState([...markets]);
    const [marketStatus, setMarketStatus] = useState(marketDetail?.market_status);
    const [producerId, setProducerId] = useState(marketDetail?.producer_id);
    const [state, dispatch] = useContext(Context); 

    useEffect(() => {
        setMutableMkts(markets);
    }, []);

    const socketRef = useRef(socket);
    const socketEvent = useMemo(() => `surebet#${match?.parent_match_id}#${marketDetail.sub_type_id}`, [match, marketDetail]);
    
    const handleGameSocket = useCallback((type, gameId, sub_type_id) => {
        if (type === "listen" && socketRef.current?.connected) {
            socketRef.current.emit('user.market.listen', { parent_match_id: gameId, sub_type_id });
        } else if (type === "leave") {
            socketRef.current?.emit("user.market.leave", { parent_match_id: gameId, sub_type_id });
     }
    }, []);


    useEffect(() => {
        handleGameSocket("listen", match?.parent_match_id, marketDetail?.sub_type_id);

        const handleSocketData = (data) => {
            Object.values(data.event_odds)?.forEach((evodd, ivg) => {
                setMutableMkts((prevMarkets) => {
                    let index = mutableMkts?.findIndex(
                        ev => ev.sub_type_id == evodd.sub_type_id 
                        && ev.odd_key == evodd.odd_key
                        && ev.special_bet_value == evodd.special_bet_value);
                    if(index !== -1){
                        const newOdds = [...prevMarkets];
                        newOdds[index] = evodd;
                        return newOdds;
                    } else {
                        return [...prevMarkets, evodd];
                    }
                });


            });
        
            if(data.match_market == "") {
                setMarketStatus((prevStatus) => (prevStatus !== data.match_market.status ? data.match_market.status : prevStatus));
            }
        };

        socketRef.current?.on(socketEvent, handleSocketData);

        return () => {
            handleGameSocket("leave", match?.parent_match_id, marketDetail?.sub_type_id);
            socketRef.current?.off(socketEvent, handleSocketData);
        };
    }, [handleGameSocket, match?.parent_match_id, marketDetail?.sub_type_id, socketEvent]);

    const MktOddsButton = React.memo(({ match, mktodds, live, pdown, producerId }) => {
        const fullmatch = { ...match, ...mktodds, producer_id: producerId };

        if (
            !pdown &&
            fullmatch?.odd_value !== 'NaN' &&
            fullmatch?.odd_active === 1 &&
            fullmatch?.market_status === "Active"
        ) {
            return <OddButton match={fullmatch} detail mkt={"detail"} live={live} />;
        }
        return <EmptyTextRow odd_key={fullmatch?.odd_key}/>;
    });

    return (
        <>
        {["active", "suspended"].includes(marketStatus?.toLowerCase()) && <div className="top-matches event-row">
            
            <Row className="top-matches header">
                {live &&
                    <div
                        style={{
                            width: "2px",
                            marginTop: "-5px",
                            marginRight: "5px",
                            opacity: 0.6,
                            paddingLeft:0
                        }}>
                        <ColoredCircle color="#cc5500"/>
                    </div>
                }
                <span className='col-9'>{marketDetail.name}</span>
            </Row>

            {mutableMkts && mutableMkts?.map((mkt_odds) => {
                return (<>
                    {(["active", "suspended"].includes(mkt_odds?.market_status?.toLowerCase())) && <Col className="match-detail" style={{width: width, float: "left"}}>
                        <MktOddsButton
                            match={match}
                            mktodds={mkt_odds}
                            producerId={producerId}
                            live={live}
                            pdown={pdown}
                        />
                    </Col>}
                </>)
            })
            }
        </div>}
        </>
    )
}

const ColoredCircle = ({color}) => {
    const styles = {backgroundColor: color};
    return color ? (
        <>
            <span className="colored-circle" style={styles}/>
        </>
    ) : null;
};

const getUpdatedMatchFromOdds = (props) => {
    const {match, marketName, odd_key, odd_data} = props;
    let newMatch = {...match, ...odd_data};
    newMatch.name = marketName;
    newMatch.odd_key = odd_key;
    newMatch.odd_value = odd_data.odd_value;
    newMatch.odd_active = odd_data.odd_active;
    newMatch.special_bet_value = odd_data.special_bet_value;
    delete newMatch['odds']
    delete newMatch['extra_odds']
    return newMatch;

}

const BetNowButton = (props) => {

    return (<>
        Bet Now
    </>);
}

const MatchRow = (props) => {
    const {
        initialMatch, 
        jackpot, 
        live, 
        pdown,
        jackpotstatus,
        subTypes} = props;

    const [state, dispatch] = useContext(Context);
    const [isVisible, setIsVisible] = useState(true);
    const [match, setMatch] = useState({...initialMatch})
    const [availableMarkets, setAvailableMarkets] = useState(subTypes || [1, 10, 18])
    // match.market_active = 1
    // if(match?.odds?.home_odd_active) {
    //     match.odds.home_odd_active = 1
    // }

    
    

    const handleGameSocket = (type, gameId) => {
        availableMarkets.forEach((subTypeId) => {
            if (type == "listen" && socket?.connected) {
                socket.emit('user.market.listen', {parent_match_id: gameId, sub_type_id:subTypeId});
            } else if (type == "leave") {
                socket?.emit("user.market.leave", {parent_match_id: gameId, sub_type_id:subTypeId});
            }
        });
    }
    useEffect(() => {
        handleGameSocket("listen", match?.parent_match_id);
        // Track tab/visibility of the of the tab
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
              setIsVisible(false);
            } else if (document.visibilityState === "visible") {
              setIsVisible(true);
            }
          });

        return () => {
            // unsubscribe trigger
            handleGameSocket("leave", match?.parent_match_id);
        }

    }, []);


    const MatchMarket = (props) => {
        const {initialMatch, marketName, marketId, special_bet_key, buttonCount} = props
        const [match, setMatch] = useState({...initialMatch})
        const [btnCount, setBtnCount] = useState(3)
        const [outcomes, setOutcomes] = useState([...initialMatch?.odds?.[marketName]?.outcomes.sort((a, b) => b?.outcome_id - a?.outcome_id)])
        const [market_status, setMarketStatus] = useState(initialMatch?.odds?.[marketName]?.market_status)

        useEffect(() => {

            if(buttonCount){
                setBtnCount(buttonCount)
            }
            socket?.on(`surebet#${match?.parent_match_id}#${marketId}`, (data) => {

                if (match.match_id == 239447){
                    console.log("THE AL MAKHDA GAME MONITOR   ", marketName, "   EVENT    ", data.match_market, "SORTED EVENT ODDS  ", Object.values(data.event_odds).sort((a, b) => a.outcome_id - b.outcome_id));
                }
                if(!special_bet_key) {
                    if(Object.keys(data.event_odds).length > 0){
                        setOutcomes(Object.values(data.event_odds).sort((a, b) => a.outcome_id - b.outcome_id));
                    }
                    setMarketStatus(data.match_market.status)
                } else {
                    if (data.match_market.special_bet_key == special_bet_key) {
                        if(Object.keys(data.event_odds).length > 0){
                            setOutcomes(Object.values(data.event_odds).sort((a, b) => a.outcome_id - b.outcome_id));
                        }
                        setMarketStatus(data.match_market.status)

                    }
                }
                

            });
        }, [])
        return (
            <>
                {
                    ((!jackpot || (jackpot && jackpotstatus == "ACTIVE") || live) && market_status == "Active") && outcomes?.map((marketOdd, idx) => {                        
                        let matchWithDetails = {...match, market_status: market_status, ...marketOdd, producer_id: match?.odds?.[marketName]?.producer_id};
                        delete matchWithDetails.odds;
                
                        return (
                            marketOdd.odd_active == 1 && marketOdd.odd_value && (!pdown && marketOdd.odd_value !== 'NaN' ) || (jackpot && jackpotstatus == "ACTIVE")
                            ? <><OddButton key={`${match?.match_id}-${idx}`} match={matchWithDetails} mkt={marketName} live={live} jackpot={jackpot}/></>
                            : <><LockedButton/></>) 
                    })
                }

                {
                    
                    !jackpot && market_status !== "Active" &&
                    Array(btnCount).fill(0).map((btn, idx) => (
                        <><LockedButton btnStatus={market_status}/></>
                    ))
                }
            </>
        )
    }
    useEffect(() => {
        if (socket.connected){
            handleGameSocket("listen", match?.parent_match_id);   
        }
        if(isVisible) {
            handleGameSocket("listen", match?.parent_match_id);
        } else if (!isVisible) {
            handleGameSocket("leave", match?.parent_match_id)
        }
    }, [socket.connected, isVisible]);

    const TimeToLiveStarting = (props) => {
        const {starttime} = props;
        let startDiff = Date.parse(starttime) - Date.now();
        let diffHrs = Math.floor((startDiff % 86400000) / 3600000);
        let diffMins = Math.round(((startDiff % 86400000) % 3600000) / 60000);
        return (
            <>
                <span className='text-blue-700'>{diffHrs > 0 && diffHrs + " Hrs"} {startDiff >= 0 && diffMins + " Mins"}</span> to start
            </>
        )
    }
    return (
        <>
        <div className="top-matches d-flex">
            <div className="hidden md:flex col-sm-2 col-xs-12 pad left-text" key="21">
                {live &&
                    <>
                        <small style={{color: "red"}}> {} </small>
                        <br/>
                    </>
                }
                <div className="d-flex flex-column" key="20">
                {(live && Date.parse(match?.start_time) > Date.now()) && <div className='w-full float-right font-[500]'><TimeToLiveStarting starttime = {match?.start_time} /></div>}

                    <span className={'small'}>
                        {(live && match?.match_time) || (live && match?.match_status == "Halftime" ) ?
                            <span className='font-[500] uppercase'>{match?.match_status}<span className='text-red-500 ml-2'>{`${match?.match_time || match?.match_status}`}</span></span> : match?.start_time}
                    </span>
                    <>ID: {match?.match_id}</>
                </div>

            </div>
            <div className="col-md-2 col-sm-4 col-xs-12 match-detail-container" key="23">
                <Link to={(jackpot) ? '#' : `/match/${live ? 'live/' : "" }`+ match?.match_id}>
                    <div className="d-flex flex-column primary-text">
                        <div className="compt-detail overflow-ellipsis" key="0034">
                            <small>{match?.category} | {match?.competition_name}</small>
                        </div>
                        <div className="compt-teams d-flex flex-column" key="0035">
                            <div className={'bold'}>
                                { match?.home_team }
                                
                            </div>
                            <div className={'bold'}>
                                {match?.away_team}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
             
            {(live ) &&
                <div className="text-red-500 font-bold">
                    <br/>
                    {teamScore(match?.score, true)}
                    <br/>
                    {teamScore(match?.score, false)}
                </div>
            }

            <div className={`${jackpot && "is-jackpot"} ${live && 'live-game'} col block md:flex justify-content-between`} key="24">
                {/* Mobile only datetime */}
                
                <div className="md:hidden block">
                    {(live && Date.parse(match?.start_time) > Date.now()) && <div className='w-full float-right font-[500]'><TimeToLiveStarting starttime = {match?.start_time} /></div>}
                    {(live && match?.status) &&
                        <div className=''>
                            <small style={{color: "red"}}> {match?.match_status} </small>
                        </div>
                    }
                    <div className="">
                        <span className={'mr-2 small'}>
                            {(live && match?.match_time) ?
                                <>{`${match.match_time}'`}</> : match?.start_time}
                        </span>
                        <span className=''>ID: {match?.game_id}</span>
                    </div>

                </div>

                <div className={`${(live && (match?.score == "-" || match?.score == null))} ${live && 'live-group-buttons'} c-btn-group align-self-center ${jackpot && "is-jackpot-bet-group-btns"} ${match?.outcome && "is-outcome"}`} key="222">
                    
                        <MatchMarket initialMatch={match} marketName={"1x2"} marketId={1}/>
                    {(jackpot && jackpotstatus == "INACTIVE") && <>{match?.outcome || "--" } </>}
                </div>

                
                <div className={`${(live && (match?.score == "-" || !match?.score))} ${live && 'live-group-buttons'} hidden md:flex c-btn-group align-self-center`} key="223">
                    <MatchMarket initialMatch={match} marketName={"Double Chance"} marketId={10}/>
                </div>

                <div className={`${(live && (match?.score == "-" || !match?.score)) } ${live && 'live-group-buttons'} hidden md:flex c-btn-group align-self-center`} key="224">
                    <MatchMarket initialMatch={match} marketName={"Total"} marketId={10} special_bet_key="2.5" buttonCount={2}/>
                </div>
                
            </div>

            {/* Jackpot buttons */}
            {(!pdown && (!jackpot && !(live && !match?.score))) &&
                    <SideBets match={match} live={live} style={{d: "inline"}}/>}
        </div>
        
        </>
        
    )

}


export const MarketList = (props) => {

    const {live, initialMatchwithmarkets, pdown} = props;
    const [marketsFilter, setMarketsFilter] = useState(null);
    const [isVisible, setIsVisible] =  useState(true);
    const [matchwithmarkets, setMatchWithMarkets] = useState(initialMatchwithmarkets)
    
    const handleGameSocket = (type, gameId, sub_type_id) => {
        // if (type == "listen" && socket?.connected) {
        //     socket.emit('user.market.listen', {parent_match_id: gameId, sub_type_id:sub_type_id});
            
        // }

        // else if (type == "leave") {
        //     socket?.emit("user.market.leave", {parent_match_id: gameId, sub_type_id:sub_type_id});
        // }
        
    }

    
    useEffect(() => {
        setMatchWithMarkets(initialMatchwithmarkets);

        
        
        return () => {
            // unsubscribe trigger
            handleGameSocket("leave", matchwithmarkets?.parent_match_id);
        }


    }, [initialMatchwithmarkets]);

    useEffect(() => {
        if(matchwithmarkets) {
            if (socket.connected){
                handleGameSocket("listen", matchwithmarkets?.parent_match_id);   
            }
            if(isVisible) {
                handleGameSocket("listen", matchwithmarkets?.parent_match_id);
            } else if (!isVisible) {
                handleGameSocket("leave", matchwithmarkets?.parent_match_id)
            }
        }
        
    }, [socket.connected, isVisible]);

    // comes from the markets with filter
    const marketFilters = [
        {name:"all", value: null},
        {name: "full time", value:"full time"},
        {name: "inplay", value: "inplay"},
        {name: "handicaps", value: "handicaps"},
        {name: "combo", value: "combo"},
        {name: "teams", value: "teams"}, 
        {name: "marginals", value: "marginals"}
    ]
    const EventUnavailable = (props) => {
        const {match} = props;
        return (
            <div className="px-3">
                <ShimmerTable />
                <Link className='font-bold hover:underline text-blue-700' to={live?"/live":"/matches"}>Back to {live && "live "} Matches</Link>
            </div>
        )
    }

    const MatchDetailFilter = () => {
        // const [activeItem]
        return (
            <div className='flex match-markets-filter'>
                {marketFilters?.map((item, idx) => (
                    <div className={`cursor-pointer item capitalize ${marketsFilter == item ? "active": ""}`} onClick={() => setMarketsFilter(item)}>{item?.name}</div>
                ))}
            </div>
        )
    }

    return (
        <div className="matches full-width">
            {(!initialMatchwithmarkets || initialMatchwithmarkets == null)
                ? <EventUnavailable match = {matchwithmarkets?.match} />
                : <MoreMarketsHeaderRow

                    match={matchwithmarkets}
                    live={live}
                />
            }

            {
                /* filter for match with more markets */
                matchwithmarkets !== null && <MatchDetailFilter />
            }

            <div className="web-element">
                {/* {(!matchwithmarkets || Object.entries(matchwithmarkets?.odds || {}).length == 0 || matchwithmarkets == null) && <EventUnavailable />} */}
                
                {/* filter here */}
                {Object.entries(matchwithmarkets?.odds || {}).map(([mkt_id, markets]) => {
                    return (["active", "suspended", ""].includes(markets?.market_status.toLowerCase()) && markets.outcomes.length > 0) && 
                    <MarketRow
                        market_id={mkt_id}
                        markets={markets?.outcomes}
                        width={markets.outcomes.length == 3 ? "33.333%" : "50%"}
                        match={matchwithmarkets}
                        marketDetail = {markets}
                        key={mkt_id}
                        live={live}
                        pdown={pdown}
                    />
                })
                }
            </div>
        </div>
    )

}

export const JackpotHeader = (props) => {
    const {jackpot} = props
    return (
        <Container>
            <Row className="top-matches">
                <Row className="jp-header-text text-center">
                    <div className="jp-header-top">
                        {jackpot?.jackpot_name} - {jackpot?.total_games} GAMES
                    </div>
                </Row>
                {/* <Row className="jp-header-text mb-2">
                    <div className="jackpot-amount !pl-0">
                        KES  { Intl.NumberFormat('en-US').format(jackpot?.jackpot_amount) }
                    </div>
                </Row> */}

            </Row>
        </Container>
    )

}



export const JackpotMatchList = (props) => {
    const {matches} = props;

    return (
        <div className="matches is-jackpot-matches full-width mt-3">

            <MatchHeaderRow jackpot={true} first_match={matches ? matches[0] : []}/>

            <Container className="web-element">
                {matches && Object.entries(matches?.matches).map(([key, match]) => (
                    <MatchRow initialMatchmatch={match} jackpot key={key} jackpotstatus={matches?.status}/>
                ))
                }
                {!matches &&
                    <div className="top-matches row">
                        No events found.
                    </div>
                }
            </Container>
        </div>
    )
}

const JackpotResultsHeader = (props) => {
    const {metadata} = props;

    return (
        <div className='px-3'>
            <div className='row my-3 pb-1 font-bold border-b border-gray-200'>
            <div className='col-sm-3 !pl-0 col-md-2'>Date</div>
            <div className='col-sm-6 !pl-0 col-md-7'>Game</div>
            <div className='col-md-3 col-sm-3 text-right'>
                    Results
                </div>
            </div>
        </div>
    )
}

export const JackpotResultsList = (props) => {
    const { results } = props;

    return (
        <div className="results full-width mt-3">
            <JackpotResultsHeader />
            <Container className="web-element">
                {(results && results?.matches?.length > 0) ? (
                    results?.matches?.map((match, key) => (
                        <MatchRow initialMatch={match} key={key} jackpot jackpotstatus={results?.status} />
                    ))
                ) : (
                    <div className="top-matches row">
                        No results found.
                    </div>
                )}
            </Container>
        </div>
    );
};

const MatchList = (props) => {
    const {
        live,
        matches,
        pdown,
        three_way, 
        fetching,
        subTypes,
        fetchingcount
    } = props;
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({type:"SET", key: "matchlisttype", payload: "normal"});
        return () => {
            dispatch({type:"DEL", key: "matchlisttype"});
        }
    }, [])
    return (
        <div className="matches full-width">
            <MatchHeaderRow 
                live={live} 
                first_match={matches ? matches[0] : {}} 
                fetching={fetching}
                three_way={three_way}
                sub_types={subTypes}
                />

            <Container className="web-element">
                {matches &&
                    Object.entries(matches).map(([key, match]) => (
                        <MatchRow 
                            initialMatch={match} 
                            key={match?.parent_match_id} 
                            live={live}
                            pdown={pdown} 
                            three_way={three_way}
                            sub_types={subTypes}/>
                    ))
                }
                
                {(((matches || []).length) == 0 && fetchingcount < 3) &&
                    <ShimmerTable row={3}/>
                }
                {(((matches || []).length) == 0 && !fetching) && 
                    <NoEvents message={"Matches Not Found"}/>
                }
                
            </Container>
        </div>
    )
}
export default React.memo(MatchList);
