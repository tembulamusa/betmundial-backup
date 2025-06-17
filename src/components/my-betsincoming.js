
import React, {useContext, useEffect, useState, useCallback} from "react";
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';

import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import '../assets/css/accordion.react.css';
import { FaCheckCircle, FaShare } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import NoEvents from "./utils/no-events";
import ShareExistingbet from "./utils/shareexisting-bet";


const Styles = {
   container: {
   },
   headers: {
    //    background:'#613354',
    //    color:'#ffffff',
    //    padding: '10px 40px 10px',
    //    fontSize: '12px'
   },
   bet:{
    //    background:'#947389',
    //    color:'#fff',
    //    padding: '5px',
   }
};

const MyBetsNew = (props) => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({});
    const [sharableBet, setSharableBet] = useState(null);
    const [showSharableBet, setShowSharableBet] = useState(false);
    const [key, setKey] = useState("sports");

    const Alert = (props) => {
        let c = message?.status == (200 || 201) ? 'success' : 'danger';
        let x_style = {
            float: "right",
            display: "block",
            fontSize: "22px",
            color: "orangered",
            cursor: "pointer",
            padding: "3px"
        }
        return (<>{message?.status &&
            <div role="alert"
                 className={`fade alert alert-${c} show alert-dismissible`}>
                {message.message}
                <span aria-hidden="true" style={x_style} onClick={() => setMessage(null)}>&times;</span>
            </div>}
        </>);

    };

    useEffect(() => {
        if (key === "sports") {
            fetchData();
        } else if (key === "surecoin") {
            fetchSureCoinBets();
        }
    }, [key]);

    const fetchData = () => {
        if(isLoading) return;
        setIsLoading(true);
        setMessage(null);
        let endpoint = "/v2/user/bets?size=20&page=1";
        makeRequest({url: endpoint, method: "GET", api_version:2}).then(([status, result]) => {
            
            if ([200, 201].includes(status)){
                dispatch({type: "SET", key: "mybets", payload: result?.data || result});
            } else {
                setMessage({status: status, message:"Unable to process"})
            }
            setIsLoading(false);
        });
    };

    useEffect(() => {
       fetchData();
    }, []);

    const fetchSureCoinBets = () => {
        // Mock data for Sure Coin table
        dispatch({
            type: "SET",
            key: "sureCoinBets",
            payload: [
                { date: "2024-11-18", betid:1, pick: "Heads", amount: "10",  result: "Win", status: "Completed" },
                { date: "2024-11-17", betid:2, pick: "Tails", amount: "30",  result: "Loss", status: "Completed" },
            ],
        });
    };


    
    const BetItemHeader = (props) => {
        return (
            <div className={`my-bets-header`} style={Styles.headers}>
                <div className="row uppercase">
                    <div className="col">ID</div>
                    <div className="col hidden md:flex">SECTION</div>
                    <div className="col">CREATED</div>
                    <div className="col hidden md:flex">GAMES</div>
                    <div className="col">AMOUNT</div>
                    <div className="col">Payout</div>
                    <div className="col">Status</div>
                </div>
            </div>
        );
    }
    const BetItem = (props) => {
        const { bet } = props;
        const [betStatus, setBetStatus] = useState(bet.status_desc);
        const [canCancel, setCanCancel] = useState(bet.can_cancel == 1);
        const [isOpen, setIsOpen] = useState(false);
        const [currentBetDetail, setCurrentBetDetail] = useState(null)
        const [isLoadingBetItems, setIsLoadingBetItems] = useState(false);
        const [betType, setBetType] = useState();

        useEffect(( )=> {
            if(bet?.jackpot_bet_id){
                setBetType("Jackpot");
            } else if(bet?.total_games > 1){
                setBetType("Multibet");
            } else {
                setBetType("Single Bet")
            }
        }, [bet])

        const cancelBet = () => {
            let endpoint = '/bet-cancel';
            let data = {
                    bet_id:bet.bet_id,
                    cancel_code:101,
            }
            makeRequest({url: endpoint, method: "POST", data: data, use_jwt:true}).then(([status, result]) => {
                if(status == 201){
                   setBetStatus('CANCEL RQ');
                   setCanCancel(false);
                }
            });
        };

        const CancelBetMarkup = (props) => {
            const {txt} = props;
            return (
                    !canCancel && <button
                         title="Cancel Bet"
                         className="secondary-text uppercase btn btn-sm cancel-bet secondary-ation"
                         onClick={()=> cancelBet()}
                         >
                         {txt?txt:"Cancel"}
                    </button>
            )
        }

        

        const statusMarkup = (bet) => {
            let btnClass;
            let btnText; 
            let statusText;
            switch (bet?.status?.toLowerCase()) {
                
                case "pending":
                    btnClass = "active-bet";
                    btnText = "active";
                    break;
                case "won":
                    btnClass = "won-bet";
                    btnText = "won";
                    break;
                case "lost":
                    btnClass = "lost-bet";
                    btnText = "lost"
                    break;
                case "cancelled":
                    btnClass = "cancelled-bet"
                    btnText = "cancelled"
                    break;
                default:
                    statusText = "Unknown"
            }
            return (
                <>
                  {btnClass && <button className = {`btn btn-bet-hist mb-1 ${btnClass}`}>{btnText}</button>}
                  {statusText && statusText}
                </>
            )
        }

        const shareMarkup = (bet) => {
            const shareBet = () => {
                setSharableBet(bet);
                setShowSharableBet(true)
            }
            return (
                <>
                    {sharableBet == bet && <ShareExistingbet bet={bet} showshare={true}/>}
                    <button className="btn btn-bet-hist light-btn mb-1" onClick={() => shareBet() }><FaShare  className="inline-block mr-2"/>Share</button>
                </>
            )
        }

        
        return (
                    <Accordion.Item eventKey={bet?.bet_id}>
                        <Accordion.Header>
                            <div className="row w-full" onClick={() => setCurrentBetDetail({betId: bet?.bet_id, games: bet?.betslip})}>
                            <div className="col font-ligt">{ bet?.bet_id}</div>
                            <div className="col hidden md:flex">{ betType}</div>
                            <div className="col">{ bet?.created}</div>
                            <div className="col hidden md:flex">{ bet?.total_games}</div>
                            <div className="col text-cente">{ bet?.bet_amount}</div>
                            <div className="col">{ bet?.possible_win}</div>
                            <div className="col">{ statusMarkup(bet) }</div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="bet-detail-header">
                                <span><CancelBetMarkup txt="Cancel Bet" /></span>
                                {bet?.sharable == 1 && <span>{shareMarkup(bet)}</span>}
                            </div>
                            <div className="overflow-x-auto"> 
                                <table className="table w-full mt-3 mb-0">
                                    <thead>
                                        <BetslipHeader betslip={bet?.betslip} />
                                    </thead>
                                    <tbody>
                                        {currentBetDetail?.betId === bet?.bet_id &&
                                            currentBetDetail?.games?.map((slip, index) => (
                                                <BetslipItem
                                                    slip={slip}
                                                    key={slip.game_id}
                                                    index={index}
                                                />
                                            ))}
                                        {isLoadingBetItems && (
                                            <tr><td>fetching ...</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>            
        );
    }

    const BetslipHeader = (props) => {
        const {betslip} = props;
        const winsCount = betslip?.filter(item => item?.status?.toLowerCase() == "won")?.length;
        return (
            <tr className={`betslip-header`} >
                    <td className="hidden md:table-cell">No.</td>
                    {/* <td className="">ID</td> */}
                    <td className="">Date</td>
                    <td className="">Game</td>
                    {/* <td className="hidden md:table-cell">Odds</td> */}
                    {/* <td className="hidden md:table-cell">Market</td> */}
                    <td className="">Pick</td>
                    <td className="">Results</td>
                    <td className="hidden md:table-cell">{`${winsCount}/${betslip?.length}`}</td>
                    
            </tr>
        )
    }

    const gameBetStatus = (status) => {

        let icon;
        let colorClass;
        let textDisp;
        switch (status.toLowerCase()){
            case "won":
                icon = <FaCheckCircle />
                // textDisp = "";
                colorClass = "won"
                break;

            case "lost":
                icon= <MdCancel />
                // textDisp = "";
                colorClass = "lost"
                break;

            case "pending":
                textDisp = "--";
                colorClass = "pending";
                break;
            case 4:
                textDisp = "cancelled"
                break;
            case 5:
                textDisp = ""
                break;
            default:
                textDisp = "";
                // colorClass = "lost";
            
        }

        return (
            <>
                
                {icon && <span className={`results-icon ${colorClass}`}>{icon}</span>}
                {textDisp && textDisp}
            </>
        )
    
    }
    const BetslipItem = ({ slip, index }) => {
        return (
            <tr className={`my-bets`}  key={slip.game_id}>
                <td className="hidden md:table-cell">{index + 1}</td> 
                {/* <td className="">{ slip?.game_id}</td> */}
                <td className="">{ slip?.start_time}</td>
                <td className="">{ slip?.home_team} - {slip.away_team}</td>
                {/* <td className="hidden md:table-cell">{ slip?.odd_value}</td> */}
                {/* <td className="hidden md:table-cell">{ slip?.market}</td> */}
                <td className="">{ slip?.bet_pick}</td>
                <td className="">{ slip?.results?.length > 0 ? slip.results : "--"} <span className="md:hidden">{ gameBetStatus(slip.status)}</span></td>
                {/* <td className="">{ slip.ft_result}</td> */}
                <td className="hidden md:table-cell">{ gameBetStatus(slip.status)}</td>
            </tr>
        )
    }

    const MyBetsList = (props) => {
		return (
            <>
            <BetItemHeader />
            {
                (state?.mybets || []).length > 1 ?
                    <Accordion 
                    className="accordion"
                    defaultActiveKey={0}
                    allowMultipleExpanded={false}
                    // uuid = {}
                    >
                    {(state?.mybets || []).map((bet, idx) => (
                        <>
                        
                        <div className="mybet-list" 
                            key = {bet?.bet_id}
                            uuid = { bet?.bet_id }
                            >
                                <BetItem bet={bet}  key={bet?.bet_id}/>
                            
                        </div>
                        </>
                    ))}
                    </Accordion> :
                    <div className="px-3"><NoEvents message="You have not yet placed any bets yet"/></div>
            }
        
            </>
        );

    }

    const SureCoinBets = () => {
        const sureCoinBets = state?.sureCoinBets || [];
    
        if (!sureCoinBets.length) {
            return <NoEvents message="You Have No Sure Coin Bets." />;
        }
    
        return (
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th className="px-2 py-2 text-xl font-medium text-gray-500 mb-2 uppercase">No.</th>
                            <th className="px-2 py-2 text-xl font-medium text-gray-500 mb-2 uppercase">Date</th>
                            <th className="px-2 py-2 text-xl font-medium text-gray-500 mb-2 uppercase">Bet ID</th>
                            <th className="px-2 py-2 text-xl font-medium text-gray-500 mb-2 uppercase">Pick</th>
                            <th className="px-2 py-2 text-xl font-medium text-gray-500 mb-2 uppercase">Amount</th>
                            <th className="px-2 py-2 text-xl font-medium text-gray-500 mb-2 uppercase">Result</th>
                        </tr>
                    </thead>
                    <tbody>      
                        {sureCoinBets.map((bet, index) => (
                              <tr  className={`my-bets`}  key={bet}>
                                <td>{index + 1}</td>
                                <td>{bet.date}</td>
                                <td>{bet.betid}</td>
                                <td>{bet.pick}</td>
                                <td>{bet.amount}</td>
                                <td>{bet.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    
        

    const PageTitle = () => {
       return (
            <div className='col-md-12 bg-primary p-4 text-center'>
                <h4 className="capitalize">
                    My Bets
                </h4>
            </div>
       )
    }
    return (
        <>
            <div className="homepage">
                {/* <CarouselLoader/> */}

                <PageTitle />
                <Alert />

                <Tabs
                    id="my-bets-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 flex justify-between border-b-2 border-gray-300"
                >
                    {["sports", "surecoin", "casino"].map((tabKey) => (
                        <Tab
                            key={tabKey}
                            eventKey={tabKey}
                            title={
                                <div
                                    className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                                        key === tabKey
                                            ? "text-custom-red border-b-2 border-custom-red"
                                            : "text-black hover:text-custom-red"
                                    }`}
                                >
                                    {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                                </div>
                            }
                        >
                            <div className="px-3">
                                {tabKey === "sports" ? (
                                    state?.mybets?.length > 0 ? (
                                        <MyBetsList bets={state.mybets} />
                                    ) : (
                                        <NoEvents message="No sports bets available" />
                                    )
                                ) : tabKey === "surecoin" ? (
                                    <SureCoinBets />
                                ) : (
                                    <NoEvents message="You have not placed any casino bets" />
                                )}
                            </div>
                        </Tab>
                    ))}
                </Tabs>
                    
            </div>
        </>
    )
}

export default MyBetsNew
