import React, {useCallback, useContext, useEffect, useState, useRef} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {Context} from '../../context/store';
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faPrint,
    faQuestionCircle,
    faTimes,
    faLaptop,
    faMagnet,
    faMagic, faInfo, faChessBoard, faDice
} from '@fortawesome/free-solid-svg-icons'
import makeRequest from "../utils/fetch-request";
import {faMobile, faCoins} from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";

const VissibleItemsMobile = React.lazy(() => import('./mobile-menu/vissible-items'));

const HeaderNav = (props) => {
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [state, dispatch] = useContext(Context);
    const location = useLocation(); // Hook to get current location
    const [searching, setSearching] = useState(false);
    const [matches, setMatches] = useState([]);
    const [search, setSearch] = useState("");
    const searchInputRef = useRef(null);
    const { pathname } = location;

    useEffect(() => {
        fetchMatches()
    }, [searching, search])

    const fetchMatches = async (search) => {
        if (search && search.length >= 3) {
            gaEventTracker('Searching')
            let method = "GET"
            let endpoint = "/v1/matches?page=" + (1) + `&limit=${10}&search=${search}`;
            await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
                if ([200, 201, 202, 204].includes(status)) {
                    setMatches(result?.data || result)
                }
            });
        }

    };

    const showSearchBar = () => {
        setSearching(true)
        searchInputRef.current.focus()
        gaEventTracker('Clicked on Search')
    }

    const dismissSearch = () => {
        setSearching(false)
        setMatches([])
    }

    // The competitions menu

    const [sport, setSport] = useState(79)
    const [competitions, setCompetitions] = useState(props?.competitions);

    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setCompetitions(c_result);
                setLocalStorage('categories', c_result);
            } else {
                fetchData()
            }
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


    const updateMenubarState = () => {
        let sport_id = (new URL(window.location.href).searchParams.get('sport_id'))
        if (sport_id === null && window.location.pathname === '/') {
            sport_id = 79
        }
        setSport(sport_id)
    }

    const getActiveSport = (matchId) => {
        return (Number(sport) === Number(matchId))

    }

    useEffect(() => {

    },[])

    const updateCurrentPage = (url) => {
        setLocalStorage('currentpath', url);
        dispatch({type:"SET", key: "currentpath", payload: pathname})
    }
    return (
        <>

            <div id="navbar-collapse-main" className={`navbar text-2xl ${searching ? 'hidden' : 'd-block'}`}>
                    <ListGroup as="ul" xs="12" horizontal
                               className="nav navbar-nav px-3 col-md-8 col-sm-12 change-display font-medium capitalize">

                        <li className={pathname === '/' ? "active" : ''} onClick={() => gaEventTracker('Visit Homepage')}>
                            <Link className="g url-link " to="/" title="Home"><IoMdHome size={20} className='text-white inline-block'/> Home</Link>
                        </li>
                        <li className={pathname === '/live' ? "active" : ''} onClick={() => gaEventTracker('Visit Live Page')}>
                            <Link className={`g url-link  ${pathname === '/live' ? 'active' : ''}`} to="/live"
                               title="Live">Live</Link>
                        </li>

                        <li className={pathname === '/jackpot' ? 'active' : ''}
                            onClick={() => gaEventTracker('Visit Jackpot Page')}>
                            <Link className="g url-link" to="/jackpot" title="Jackpot">
                                Jackpots
                            </Link>
                        </li>
                        <li className={pathname === '/app' ? 'active' : ''}
                            onClick={() => gaEventTracker('Visit App Page')}>
                            <Link className="g url-link" to="/aviator" title="App">
                                <span>
                                    aviator
                                </span>
                            </Link>
                        </li>

                        <li className={pathname === '/app' ? 'active' : ''}
                            onClick={() => gaEventTracker('Visit App Page')}>
                            <Link className="g url-link" to="/casino" title="App">
                                <span>
                                    casino
                                </span>
                            </Link>
                        </li>
                        
                        <li className={pathname.includes("promotions") ? 'active' : ''}
                            onClick={() => gaEventTracker('Visit Promotions Page')}>
                            <Link className="g url-link" to="/promotions" title="Promotions">
                                Promotions
                            </Link>
                        </li>
                        <li className={pathname.includes("livescore") ? 'active' : ''}>
                            <Link className="g url-link" to="/livescore"
                               title="Live Score" onClick={() => gaEventTracker('Visit Live Score Page')}>
                                <span>
                                   Live Score
                                </span>
                            </Link>
                        </li>
                        
                    </ListGroup>

                    <ListGroup as="ul" xs="12" horizontal className="nav navbar-nav col-md-4 change-display px-4">

                        
                        <li className={pathname === '/how-to-play' ? 'active' : ''}
                            onClick={() => gaEventTracker('Visit How To Play Page')}>
                            <Link className="g url-link" to="/how-to-play" title="How to play">
                                <span className=" space-icons">
                                    <FontAwesomeIcon icon={faQuestionCircle} className='secondary-color'/> </span> <span
                                className={'hide2'}>Help & Support</span>
                            </Link>
                        </li>
                        <li className={pathname === '/print-matches' ? 'active py-3' : ''}
                            onClick={() => gaEventTracker('Visit Print Matches')}>
                            <Link className="g url-link" to="/print-matches" title="Print Matches">
                                <span className=" space-icons">
                                    <FontAwesomeIcon icon={faPrint} className='secondary-color'/> </span>Print <span
                                className={'hide1'}>Matches</span>
                            </Link>
                        </li>

                        <li className={pathname === '/print-matches' ? 'spacing-end' : 'spacing-end'}>
                            <Link className="g url-link" to="#" title="Search"
                               onClick={() => showSearchBar()}>
                                <span className=" space-icons">
                                <FontAwesomeIcon icon={faSearch} className='secondary-color'/> </span><span
                                className={'hide2'}>Search</span>
                            </Link>
                        </li>
                    </ListGroup>

            </div>


            <section id="" className={`high-first-z-index fadeIn header-menu d-flex justify-content-center px-4 ${searching ? 'd-block' : 'd-none'}`}>
                <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss col-md-6 text-center">
                    <div className="d-flex w-full">
                        <div className="col-md-10">
                            <input type="text" placeholder={'Start typing to search for team ...'} ref={searchInputRef}
                                   onChange={(event) => fetchMatches(event.target.value)}
                                   className={'form-control input-field border-0 bg-dark text-white no-border-radius'}/>
                        </div>

                        <button className={'btn text-white -align-right'} onClick={() => dismissSearch()}>
                            <FontAwesomeIcon icon={faTimes} /> Close
                        </button>
                    </div>
                    <div
                        className={`autocomplete-box bg-dark2 position-fi border-dark col-md-5 mt-1 shadow-sm text-start w-full`}
                        onClick={() => gaEventTracker('View Search Results')}>
                        {matches.map((match, index) => (
                            <a href={`/?search=${match.home_team}`} key={index}>
                                <li>
                                    {match.home_team}
                                </li>
                            </a>
                        ))}
                    </div>
                </ListGroup>
            </section>
        </>
    )

}
export default React.memo(HeaderNav);