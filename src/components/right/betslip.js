import React, {useState, useEffect, useContext, useCallback} from 'react';
import BetslipSubmitForm from './betslip-submit-form';
import {Context} from '../../context/store';
import {
    removeFromSlip,
    removeFromJackpotSlip,
    getBetslip,
    getJackpotBetslip,
} from '../utils/betslip';

import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CompanyInfo from "./company-info";
import makeRequest from '../utils/fetch-request';
import { setLocalStorage } from '../utils/local-storage';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Notify from "../utils/Notify";
import Alert from '../utils/alert';
const clean_rep = (str) => {
    str = str.replace(/[^A-Za-z0-9\-]/g, '');
    return str.replace(/-+/g, '-');
}

const BetSlip = (props) => {
    const {jackpot, betslipValidationData, jackpotData} = props;

    const [is_jackpot, setIsJackpot] = useState(jackpot);
    const [localJPData, setLocalJPData] = useState(jackpotData);
    const { code } = useParams();
    const [state, dispatch] = useContext(Context);
    const [betslipKey, setBetslipKey] = useState(
       () => state?.jackpotbetslip ? "jackpotbestslip":"bestslip"
    );
    const [betslipsData, setBetslipsData] = useState({});
    const [hasBetslip, setHasBetslip] = useState(false);
    
    //initial betslip loading

    useEffect(() => {
        let b = (state?.isjackpot)
            ? getJackpotBetslip()
            : getBetslip();
        setBetslipsData(b);
        if(b){
            setHasBetslip(true);
        } else {

            setHasBetslip(false);
        }
        setIsJackpot(state?.jackpotbetslip != null);
        setLocalJPData(state?.jackpotdata);
        (!state?.betslip && !state?.jackpotbetslip) && dispatch({type:"SET", key:state?.jackpotbetslip ? "jackpotbetslip" :"betslip", payload:b})
    }, [state?.betslip, state?.jackpotbetslip]);
    
    

    useEffect(() => {
        if (state[betslipKey]) {
            setBetslipsData(state[betslipKey]);
        }

    }, [state[betslipKey]]);


    //Handle db validation of betslip
    const validateBetslipwithDbData = useCallback(() => {
        if (betslipValidationData && betslipsData) {
            let clone_slip = betslipsData;
            Object.entries(betslipValidationData).forEach(([key, slipdata]) => {
                let match_id = slipdata.match_id;
                let slip = clone_slip[match_id];
                if (slip) {
                    if (slipdata.odd_active !== 1) {
                        slip.comment = 'Option not active for betting';
                        slip.disable = true;
                    } else if (slipdata.market_active == 0 ||
                        (slipdata.market_active !== 'Active' && slipdata.market_active !== 1)) {
                        slip.comment = 'Betting on this market is '
                            + (slipdata.market_active == 0 ? "suspended" : slipdata.market_active);
                        slip.disable = true;
                    } else if (slipdata.event_status == 'Suspended'
                        || slipdata.event_status == 'Deacticated'
                        || slipdata.event_status == 'Ended'
                        || slipdata.event_status == 'Abandoned'
                        || slipdata.event_status == 'Finished') {
                        slip.comment = 'This event is  ' + slipdata.event_status;
                        slip.disable = true;
                    } else if (slipdata.active !== 1) {
                        slip.comment = 'Market not active for betting';
                        slip.disable = true;
                    } else if (slip.odd_value !== slipdata.odd_value) {
                        slip.prev_odds = slip.odd_value;
                        slip.odd_value = slipdata.odd_value;
                        slip.comment = 'The odds for this event have changed';
                        slip.disable = false;
                    } else {
                        if (slip.disable !== false) {
                            slip.comment = null;
                        }
                        slip.disable = false;
                    }
                    clone_slip[match_id] = slip;
                }
            });
            dispatch({type: "SET", key: betslipKey, payload: clone_slip});
        }
    }, []);

    useEffect(() => {
        validateBetslipwithDbData();
    }, [validateBetslipwithDbData]);


    // betslip key watch
    const setJackpotSlipkey = useCallback(() => {
        if (state?.jackpotbetslip) {
            setBetslipKey("jackpotbetslip");
        } else {
            setBetslipKey("betslip")
        }
        dispatch({type: "SET", key:"isjackpot", payload: is_jackpot})
    }, [is_jackpot]);

    useEffect(() => {
        setJackpotSlipkey();
    }, [setJackpotSlipkey]);

    const handledRemoveSlip = (match) => {
        let betslip = (betslipKey == "betslip")
            ? removeFromSlip(match.match_id)
            : removeFromJackpotSlip(match.match_id);

        let match_selector = match.match_id + "_selected";
        let ucn = clean_rep(
            match.match_id
            + "" + match.sub_type_id
            + (match.bet_pick)
        );

        setBetslipsData(betslip);
        dispatch({type: "SET", key: betslipKey, payload: betslip});
        dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});
    }

    const getSportImageIcon = (sport_name, folder = 'svg', topLeagues = false) => {

        let default_img = 'sure'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../assets${sport_name}`) : require(`../../assets/${folder}/${sport_name}.svg`);
        } catch (error) {
            
            sport_image = require(`../../assets/${folder}/${default_img}.png`);
            if (is_jackpot) {
                sport_image = require(`../../assets/${folder}/Soccer.svg`);
            }
            
        }
        return sport_image
    }


    const LoadSharedBetslip = (props) => {
        const [sharedBetLoading, setSharedBetLoading] = useState(false);
        const [sharedBetError, setSharedBetError] = useState(null);
        const [inputShareCode, setInputShareCode] = useState('');
    
        useEffect(() => {
            if (sharedBetError != null) {
                setSharedBetError(null);
            }
        }, []);
    
        const fetchSharedBetslip = useCallback((code) => {
            let endpoint = "/v2/bet/share?share-code=" + code;
            setSharedBetError(null);
            setSharedBetLoading(true);
            makeRequest({ url: endpoint, method: "GET", api_version: 2 }).then(([status, result]) => {
                if (status == 200) {
                    if (result.status == 200) {
                        if (result?.data?.betslip && result?.data?.betslip.length > 0) {
                            let betslip = {};
                            result?.data?.betslip?.forEach(item => {
                                let item_id = item.match_id;
                                betslip[item_id] = item;
                            });
                            // Assuming dispatch and setLocalStorage are properly configured
                            dispatch({ type: "SET", key: "betslip", payload: betslip });
                            setLocalStorage("betslip", betslip);
                        } else {
                            setSharedBetError({ status: 400, message: "No games found. Slip expired" });
                        }
                    } else {
                        setSharedBetError({ status: 400, message: result?.result + ". Invalid slip" });
                    }
                } else {
                    setSharedBetError({ status: status, message: "Failed to load betslip. Please try again later." });
                }
                setSharedBetLoading(false);
            });
        }, []);
    
        const handleCodeInputChange = (event) => {
            setInputShareCode(event.target.value);
        };
    
        const loadBetslipFromCode = () => {
            if (inputShareCode && inputShareCode.length >= 5) {
                fetchSharedBetslip(inputShareCode);
            } else {
                setSharedBetError({ status: 400, message: "Invalid code. Check your slip and try again" });
            }
        };
    
        const handleKeyPress = (event) => {
            if (event.key == 'Enter') {
                loadBetslipFromCode();
            }
        };
    
        useEffect(() => {
            if (props.code) {
                fetchSharedBetslip(props.code);
            }
        }, [fetchSharedBetslip, props.code]);
    
        return (
            <div className='px-2 py-1'>
                <div className='my-3 font-[500] text-2xl text-center'>Do you have a shared betslip code? Enter it here.</div>
                {sharedBetError && <div className='my-3'><Alert message={sharedBetError} /></div>}
                <input
                    type="text"
                    name="sharecode"
                    placeholder="Eg HLRTMRV"
                    onChange={handleCodeInputChange}
                    onKeyPress={handleKeyPress}
                    value={inputShareCode}
                    className='block w-full px-2 text-center rounded-2xl'
                    style={{ border: "1px solid #ddd", margin: "0px 0px 0px", height: "40px" }}
                />
                <button
                    disabled={sharedBetLoading}
                    className="my-3 w-full block capitalize secondary-bg bg-pink p-3 px-3 py-2 font-bold btn-pink border-none text-white uppercase hover:opacity-80 rounded-2xl"
                    style={{ padding: "0px", height: "40px" }}
                    onClick={() => loadBetslipFromCode()}
                >
                    {sharedBetLoading ? "wait..." : "Load Betslip"}
                </button>
            </div>
        );
    };
    
    return (
        
        <div className="">
            { (Object.keys(betslipsData || {}).length == 0) &&
                
                <li className="bet-option hide-on-affix" key="no-slip-ai"
                    style={{margin:"10px 0px 5px 0px", borderBottom:"none", padding:"0px 2px", listStyle:"none"}}>
                    <div className='my-3 text-center text-2xl'>You have not selected any bet.</div>
                    <hr className='mb-3'/>
                    {state?.betslipKey}
                    {!state?.isjackpot &&

                        <LoadSharedBetslip />
                        
                    }
                </li>
            }
            {hasBetslip  && <>
            <div className="flow betslip-slips" style={{maxHeight: "50vh", overflowY: "auto", overflowX:"hidden"}}>
                <ul style={{paddingRight:"8px", paddingLeft:"8px"}}>

                    

                    {Object.entries(betslipsData ?? {}).map(([match_id, slip]) => {
                        let odd = slip.odd_value;
                        let no_odd_bg = odd == 1 ? '#f29f7a' : '';

                        return (
                            <li className={`bet-option hide-on-affix ${slip?.disable ? 'warn' : ''}`} key={match_id}
                                style={{background: no_odd_bg}}>

                                <div className="bet-cancel">
                                    <input id={slip.match_id} type="submit" value="X"
                                           onClick={() => handledRemoveSlip(slip)} />
                                </div>
                                <Link to={`/match/${slip.match_id}`} style={{}} className='hover:underline'>
                                <div className="bet-value betslip-game" onClick={() => dispatch({type:"SET", key:"showmobileslip", payload: false})}>
                                        {
                                            <span 
                                                style={{
                                                float: "left",
                                                width: "auto",
                                                fontWeight: "400"
                                            }}>
                                                <img src={getSportImageIcon(slip?.sport_name)} alt={slip.sport_name} className='inline-block betslip-sport-icon'/>
                                                {`${slip.home_team} VS ${slip.away_team}`}
                                            </span>}
                                        <div className='opacity-60'>
                                            <span>
                                                {slip.bet_type == 0 && ' Pre-match'}
                                                {slip.bet_type == 1 && <span className='text-red'>Live</span>}: 
                                            </span>
                                            
                                            <span className='betslip-match-start-time ml-4'>
                                                {moment(slip.start_time).format('DD/MM hh:mm A')}
                                            </span>
                                        </div>
                                </div>
                                <div className="row">
                                    <div className="bet-value">
                                        {slip.odd_type} - <span className='font-[500]'>{slip.bet_pick}</span>
                                        <span className="bet-odd">{slip.odd_value}
                                                    {slip.odd_value == 1 &&
                                                        (<span style={{color: "#cc0000", fontSize: "11px", display: "block"}}>Market Disabled</span>)
                                                    }
                                        </span>
                                    </div>
                                    {/* later add for live */}
                                    
                                </div>
                                {/* <div className="bet-pick">Your Pick - <b>{slip.bet_pick}
                                    <span className="bet-odd">{slip.odd_value}
                                        {slip.odd_value == 1 &&
                                            (<span style={{color: "#cc0000", fontSize: "11px", display: "block"}}>Market Disabled</span>)
                                        }
                            </span></b>
                                </div> */}
                                <div className="row">
                                    <div className="warn">{slip?.comment} </div>
                                </div>
                            </Link>

                            </li>)
                    })
                    }
                </ul>
            </div>
            </>
            }
            <div className="bottom">
                <BetslipSubmitForm
                    jackpotData={localJPData}
                    jackpot={is_jackpot}
                />
            </div>
            
        
        </div>
        
    )
}
export default React.memo(BetSlip);
