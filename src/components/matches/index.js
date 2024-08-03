import React, {useState, useEffect, useContext, useCallback, useRef, useLayoutEffect} from 'react';
import {Context} from '../../context/store';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {
    addToSlip,
    removeFromSlip,
    removeFromJackpotSlip,
    addToJackpotSlip,
    getBetslip
} from '../utils/betslip';

import CurrencyFormat from 'react-currency-format';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import padlock from '../../assets/img/padlock.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faFire} from "@fortawesome/free-solid-svg-icons";
import {getFromLocalStorage} from "../utils/local-storage";


const clean = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const EmptyTextRow = (props) => {
    const {odd_key, classname} = props;

    return (
        <div className={`${classname} btn btn-disabled match-detail col c-btn`}
             style={{
                 width: "100%",
                 height: "30px",
                 padding: "2px",
                 color: "#fff",
                 background: "#d7d7d7",
                 opacity: 1
             }}>
            {odd_key && <span className="et label btn-disabled ">{odd_key}</span>}
            <span className="label label-inverse">
             <LazyLoadImage
                 style={{opacity: "0.3", width: "15px"}}
                 src={padlock}
                 effect="blur"
                 alt="--"/>
         </span>
        </div>
    );
};

const MatchHeaderRow = (props) => {
    const {
        live, 
        first_match, 
        jackpot, 
        fetching, 
        three_way, 
        sub_types
    } = props;

    //const [state, ]  = useContext(Context);
    const categories = getFromLocalStorage('categories')
    const sport_id = new URL(window.location).searchParams.get('sport_id') || 79
    let sport = categories?.all_sports?.filter((category) => category.sport_id == sport_id)

    const [sportName, setSportName] = useState(sport?.[0]?.sport_name || 'Soccer');
    const [showX, setShowX] = useState(true);
    const [market, setMarket] = useState('1x2');
    const [marketCols, setMarketCols] = useState(3)
    const [extraMarketDisplays, setExtraMarketDisplays] = useState([])

    const getSelectedMarkets = () => {


        const markets = [
            
            {
                id: "10", 
                name: "Double Chance", 
                extra_market_cols: 3, 
                extra_markets_display: [
                    "1X", "X2", "12"
                ]
            },
            // {
            //     id: "29", 
            //     name: "Both Teams to Score", 
            //     extra_market_cols: 2, 
            //     extra_markets_display: [
            //         "NO", "YES"
            //     ]
            // },
            // {
            //     id: "219", 
            //     name: "Winner (incl. overtime)", 
            //     extra_market_cols: 2, 
            //     extra_markets_display: [2, 1]
            // },
            // {
            //     id: "186", 
            //     name: "Winner", 
            //     extra_market_cols: 2, 
            //     extra_markets_display: [1, 2]
            // },

            // {
            //     id: "202", 
            //     name: "1 Set Winner", 
            //     extra_market_cols: 2, 
            //     extra_markets_display: [1, 2]
            // },
            // {
            //     id: "406",
            //     name: "Winner (incl. overtime and penalties)",
            //     extra_market_cols: 2,
            //     extra_markets_display: [
            //         2, 1
            //     ]
            // },
            // {
            //     id: "340",
            //     name: "Winner (incl. super over)",
            //     extra_market_cols: 2,
            //     extra_markets_display: [
            //         1, 2
            //     ]
            // },
            {
                id: "18", 
                name: "Over/Under 2.5", 
                extra_market_cols: 2, 
                extra_markets_display: [
                    "Under", "Over"
                ]
            }
        ]


        let extraMarkets = markets

        // sub_types?.split(",")?.forEach((sub_type) => {
        //     let selectedMarket = markets.filter((market) => Number(market.id) === Number(sub_type))

        //     if (selectedMarket.length > 0) {
        //         extraMarkets.push(selectedMarket[0])
        //     }
        // })

        setExtraMarketDisplays(extraMarkets)

    }


    useEffect(() => {
        getSelectedMarkets()
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
        <Container className="full-mobile sticky-top" style={{position: "sticky"}}>
            <div className="top-matches d-flex position-sticky sticky-top "
                 style={{opacity: "1", top: "100px"}}>
                <div className="col-sm-2 col-xs-12 pad left-text" key="d5">
                    <div className="align-self-center col">

                   { fetching && <div className="filter-group-icon" >
                           <Spinner animation="border" size="sm" variant="secondary" />
                       </div>
                   }
        {/* <h3 className="main-heading-1 ">
                            {live && <span className="live-header">LIVE </span> }
                            {!live && <span className="">PREMATCH </span> }
                        </h3> */} 
                    </div>
                </div>
                <div className={'col-2 col-xs-12 match-detail-container'} key="d4"></div>
                <div className={'col d-flex flex-row justify-content-between'}>
                    {three_way &&
                        <div className="d-flex flex-row" key="d3">
                            <div className="d-flex flex-column text-center">
                                <div className={'bold'}>
                                    3 WAY
                                </div>
                                <div className={'c-btn-group align-self-end'}>
                                    <a className="c-btn-header">1</a>
                                    <a className="c-btn-header">X</a>
                                    <a className="c-btn-header">2</a>
                                </div>
                            </div>
                        </div>
                    }
                    {!live && !jackpot && extraMarketDisplays.length > 0 && (
                        <>
                            {extraMarketDisplays?.map((extra_market) => (
                                <div className={'d-flex flex-column'} key={extra_market.name}>
                                    <span className={'small text-center text-uppercase bold'}>
                                        {extra_market.name}
                                    </span>
                                    <div className={'c-btn-group'}>
                                        <a className="c-btn-header">
                                            {(extra_market.extra_markets_display[0])}
                                        </a>
                                        <a className="c-btn-header">
                                            {(extra_market.extra_markets_display[1])}
                                        </a>
                                        {extra_market?.extra_market_cols > 2 &&
                                            <a className={`c-btn-header`}>
                                                {(extra_market.extra_markets_display[2])}
                                            </a>}
                                    </div>
                                </div>
                            ))}
                        </>
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

const MoreMarketsHeaderRow = (props) => {
    const {
        home_team,
        away_team,
        game_id,
        category,
        competition,
        start_time,
        match_time,
        score,
        live,
        match_status
    } = props;

    return (
        <Container className="mt-2">
            <div className="panel-header primary-bg">

                <h4 className="inline-block">
                    {home_team} <small> - </small> {away_team}
                </h4>
                {live &&
                    <Row className="header-text">
                        <Col style={{
                            color: "#cc5500",
                            marginBottom: "5px"
                        }}> {match_status === 'Ended' && 'Ended '} {score}</Col>
                    </Row>
                }
                <Row className="header-text">
                    <Col>{category} {competition}</Col>
                </Row>
                {match_status !== 'Ended' &&
                    <Row className="start-time">
                        {live
                            ? <Col>Live: <span style={{color: "#cc5500"}}>{match_time || match_status}</span></Col>
                            : <Col>Start: {start_time}</Col>}

                        <Col>Game ID: {game_id} </Col>
                    </Row>
                }
            </div>
        </Container>
    )
}

const SideBets = (props) => {
    const {match, live} = props;
    const [picked,] = useState();

    return (
        <div
            className={` ${picked} align-self-center more-markets-container m-lg-2`}>
            {(match?.side_bets > 1) && <>
                <a className="side" title={'More Markets'}
                   href={`/match/${live ? 'live/' : ''}${
                       live ? match.parent_match_id : match?.match_id}`
                   }>+{match.side_bets}
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
    // console.log(ucn)
    const [picked, setPicked] = useState('');
    const [oddValue, setOddValue] = useState(null);

    const [state, dispatch] = useContext(Context);
    const ref = useRef();
    let reference = match.match_id + "_selected";
    const [betslip_key, setBetslipKey] = useState('betslip');

    const updateBeslipKey = useCallback(() => {
        if (jackpot) {
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot]);

    useEffect(() => {
        updateBeslipKey();
    }, [updateBeslipKey])

    // here

    const updatePickedChoices = useCallback(() => {
        let betslip = jackpot ? state?.[betslip_key] : (getBetslip() || {});
        // let betslip = getBetslip() || {};
        //console.log("UCN MATCH::::::::",match.sub_type_id)
        let uc = clean(
            match.match_id
            + "" + (match?.odds?.sub_type_id || match?.sub_type_id)
            + (match?.[mkt] || match?.odd_key || mkt)
        );
        // here
        // console.log(betslip?.[match.match_id]?.match_id)
        // console.log(uc)
        if ((betslip?.[match.match_id]?.match_id == match.match_id)
            && uc == betslip?.[match.match_id]?.ucn) {
            setPicked('picked');
        } else {
            setPicked('');
        }
    }, [picked, state[betslip_key]])

    useEffect(() => {
        updatePickedChoices();
    }, [updatePickedChoices]);

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
                // console.log(uc)
                //
                // console.log(state?.[reference])

                if (state?.[reference] === uc) {
                    setPicked('picked')
                } else {
                    setPicked('');
                }
            }
        }
    }, [state?.[reference]])

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
        let cstm = clean(mid + "" + stid + oddk + (marketKey !== undefined ? marketKey : ''))

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
            "live": live,
            "ucn": cstm,
            "market_active": market_active,
        }

        // console.log("Slip", slip)
        // console.log(cstm)

        if (cstm === ucn) {
            let betslip;
            if (picked === 'picked') {
                betslip = jackpot !== true
                    ? removeFromSlip(mid)
                    : removeFromJackpotSlip(mid);

                setPicked('');
            } else {
                betslip = jackpot !== true
                    ? addToSlip(slip)
                    : addToJackpotSlip(slip);

                dispatch({type: "SET", key: reference, payload: cstm});
            }
            dispatch({type: "SET", key: betslip_key, payload: betslip});
        }
    };

    return (
        <button
            ref={ref}
            className={`secondary-bg-2 home-team ${match.match_id} ${ucn} ${picked} c-btn`}
            home_team={match.home_team}
            odd_type={match?.name || match?.market_name || "1X2"}
            bet_type={live ? 1 : 0}
            away_team={match.away_team}
            market_active={match.market_active}
            odd_value={oddValue}
            odd_key={match?.odd_key}
            pick_key={match?.odd_key}
            parent_match_id={match.parent_match_id}
            match_id={match.match_id}
            custom={ucn}
            sport_name={match.sport_name}
            sub_type_id={match?.odds?.sub_type_id || match?.sub_type_id}
            special_bet_value={match?.odds?.special_bet_value || ''}
            onClick={handleButtonOnClick}>
            {!detail &&
                (
                    <span className="theodds odd-fix">
                            {oddValue}
                        </span>
                )
            }
            {detail &&
                (<>
                      <span
                          className="label label-inverse">
                        {match.odd_key}
                      </span>
                    <span
                        className="label label-inverse odd-value">
                            {match?.odd_value}
                     </span>
                </>)}
        </button>
    )
}


const MarketRow = (props) => {
    const {markets, match, market_id, width, live, pdown} = props;

    const MktOddsButton = (props) => {
        const {match, mktodds, live, pdown} = props;
        const fullmatch = {...match, ...mktodds};
        console.log("Market odds", match)
        return (
            !pdown
            && fullmatch?.odd_value !== 'NaN'
            // && fullmatch.market_active == 1
            // && fullmatch.odd_active == 1
        )
            ? <OddButton match={fullmatch} detail mkt={"detail"} live={live}/>
            : <EmptyTextRow odd_key={fullmatch?.odd_key}/>;
    }

    return (
        <div className="top-matches event-row">
            <Row className="top-matches header">
                {live &&
                    <div
                        style={{
                            width: "2px",
                            marginTop: "-5px",
                            marginRight: "5px",
                            opacity: 0.6
                        }}>
                        <ColoredCircle color="#cc5500"/>
                    </div>
                }
                <span className='col-9'>{market_id}</span>
            </Row>

            {markets && markets.map((mkt_odds) => {
                return (<>
                    <Col className="match-detail" style={{width: width, float: "left"}}>
                        <MktOddsButton
                            match={match}
                            mktodds={mkt_odds}
                            live={live}
                            pdown={pdown}
                        />
                    </Col>
                </>)
            })
            }
        </div>
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

const MatchRow = (props) => {
    const {
        match, 
        jackpot, 
        live, 
        pdown, 
        sub_types} = props;

    match.market_active = 1
    match.odds.home_odd_active = 1
   
    return (
        <>
        <div className="top-matches d-flex">
            <div className="col-sm-2 col-xs-12 pad left-text" key="22">
                {live &&
                    <>
                        <small style={{color: "red"}}> {match?.match_status} </small>
                        <br/>
                    </>
                }
                <div className="d-flex flex-column" key="20">
                    <span className={'small'}>
                        {(live && match?.match_time) ?
                            <>{`${match.match_time}'`}</> : match?.start_time}
                    </span>
                    <>ID: {match?.game_id}</>
                </div>

            </div>
            <div className="col-2 col-xs-12 match-detail-container" key="23">
                <a href={jackpot ? '#' : `/match/${live ? 'live/' + match.parent_match_id : match.match_id}`}>
                    <div className="d-flex flex-column">
                        <div className="compt-detail overflow-ellipsis" key="0034">
                            <small>{match.category} | {match.competition_name}</small>
                        </div>
                        <div className="compt-teams d-flex flex-column" key="0035">
                            <div className={'bold'}>
                                {live && (match?.match_status !== 'ended') && <ColoredCircle color="red"/>}
                                { match.home_team }
                                <span className="opacity-reduce-txt vs-styling">
                                {live && match?.score}
                                    {!live && ''}
                            </span>
                            </div>
                            <div className={'bold'}>
                                {match.away_team}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div className="col d-flex flex-row justify-content-between" key="24">
                <div className="c-btn-group align-self-center" key="222">
                    {
                        match?.odds?.["1x2"]?.map((marketOdd, idx) => {
                            let matchWithDetails = {...match, ...marketOdd};
                            delete matchWithDetails.odds;
                            return (marketOdd.odd_value && (!pdown && marketOdd.odd_value !== 'NaN' ) || jackpot
                                ? <OddButton key={`${match?.match_id}-${idx}`} match={matchWithDetails} mkt="1x2" live={live} jackpot={jackpot}/>
                                : <EmptyTextRow key={`${match?.match_id}-${idx}`} odd_key={marketOdd?.odd_key}/>) 
                           
                            
                        }) 
                    }
                </div>

                
                <div className={`c-btn-group align-self-center`} key="223">
                   {
                        match?.odds?.["Double Chance"]?.map((marketOdd, idx) => {
                            let matchWithDetails = {...match, ...marketOdd};
                            delete matchWithDetails.odds;
                            return (marketOdd.odd_value && (!pdown && marketOdd.odd_value !== 'NaN' ) || jackpot
                                ? <OddButton key={`${match?.match_id}-${idx}`} match={matchWithDetails} mkt="Double Chance" live={live} jackpot={jackpot}/>
                                : <EmptyTextRow key={`${match?.match_id}-${idx}`} odd_key={marketOdd?.odd_key}/>) 
                           
                            
                        }) 
                    }
                    
                </div>

                <div className={`c-btn-group align-self-center`} key="224">
                    {    
                        match?.odds?.["Total"]?.map((marketOdd, idx) => {
                            let matchWithDetails = {...match, ...marketOdd};
                            delete matchWithDetails.odds;
                            return (marketOdd.odd_value && (!pdown && marketOdd.odd_value !== 'NaN' ) || jackpot
                                ? <OddButton key={`${match?.match_id}-${idx}`} match={matchWithDetails} mkt="Total" live={live} jackpot={jackpot}/>
                                : <EmptyTextRow key={`${match?.match_id}-${idx}`} odd_key={marketOdd?.odd_key}/>) 
                           
                            
                        }) 
                    }
                </div>
                
                
            </div>
            {!pdown && !jackpot &&
                    <SideBets match={match} live={live} style={{d: "inline"}}/>}
        </div>
        
        </>
        
    )

}

export const MarketList = (props) => {

    const {live, matchwithmarkets, pdown} = props;

    return (
        <div className="matches full-width">
            {!matchwithmarkets
                ? <div className="top-matches">Event not available for betting.</div>
                : <MoreMarketsHeaderRow
                    {...matchwithmarkets?.match}
                    score={matchwithmarkets?.match?.score}
                    live={live}
                />
            }
            <div className="web-element">
                {Object.entries(matchwithmarkets?.odds || {}).map(([mkt_id, markets]) => {
                    console.log("Math with markets::", matchwithmarkets)
                    return <MarketRow
                        market_id={mkt_id}
                        markets={markets}
                        width={markets.length === 3 ? "33.333%" : "50%"}
                        match={matchwithmarkets?.match}
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
                <Row className="jp-header-text">
                    <div className="jp-header-top">
                        {jackpot?.type} - {jackpot?.total_games} GAMES {jackpot?.name}
                    </div>
                </Row>
                <Row className="jp-header-text mb-2">
                    <div className="jackpot-amount mt-3">
                        <CurrencyFormat
                            value={jackpot?.jackpot_amount}
                            displayType={'text'}
                            thousandSeparator={true} prefix={'KES'}/>
                    </div>
                </Row>

            </Row>
        </Container>
    )

}

export const JackpotMatchList = (props) => {
    const {matches, jackpotData} = props;

    return (
        <div className="matches full-width mt-5">

            <MatchHeaderRow jackpot={true} first_match={matches ? matches[0] : []}/>

            <Container className="web-element">
                {matches && Object.entries(matches?.data).map(([key, match]) => (
                    <MatchRow match={match} jackpot key={key}/>
                ))
                }
                {(matches !== null && matches.length === 0) &&
                    <div className="top-matches row">
                        No events found.
                    </div>
                }
            </Container>
        </div>
    )
}

const MatchList = (props) => {
    const {
        live, 
        matches, 
        pdown, 
        three_way, 
        fetching, 
        subTypes
    } = props;

    return (
        <div className="matches full-width">

            {matches && <MatchHeaderRow 
                 live={live} 
                first_match={matches ? matches[0] : {}} 
                fetching={fetching}
                three_way={three_way}
                sub_types={subTypes}
                />}

            <Container className="web-element">
                {matches &&
                    Object.entries(matches).map(([key, match]) => (
                        <MatchRow 
                            match={match} 
                            key={key} 
                            live={live} 
                            pdown={pdown} 
                            three_way={three_way}
                            sub_types={subTypes}/>
                    ))
                }
                {(!matches && fetching === false) &&
                    <div className="top-matches row">
                        No events found.
                    </div>
                }
            </Container>
        </div>
    )
}
export default MatchList;
