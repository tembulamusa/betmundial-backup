import React, {useContext, useEffect, useState, useRef} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {Context} from '../../context/store';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faPrint,
    faQuestionCircle,
    faTimes,
    faLaptop,
    faClock,
    faMagnet,
    faMagic, faInfo, faChessBoard, faDice
} from '@fortawesome/free-solid-svg-icons'
import makeRequest from "../utils/fetch-request";
import {faMobile, faCoins} from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "../../assets/svg/Home.svg";
import LiveIcon from "../../assets/svg/Live.svg";
import JackpotIcon from "../../assets/svg/JP.svg";
import HipoIcon from "../../assets/img/search-icon.png";
import PromotionIcon from "../../assets/svg/Promotions.svg";

const HeaderNav = (props) => {
    const [state,] = useContext(Context);
    const pathname = window.location.pathname;
    const [searching, setSearching] = useState(false)
    const [matches, setMatches] = useState([])
    const searchInputRef = useRef(null)
    const [time, setTime] = useState();
    

    useEffect(() => {
        fetchMatches()
    }, [searching])


    useEffect(() => {
        const timer = setInterval(() => {
          setTime(new Date().toLocaleString().slice(10,22));
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      }, []);

    const fetchMatches = async (search) => {
        if (search && search.length >= 3) {
            let method = "POST"
            let endpoint = "/v1/matches?page=" + (1) + `&limit=${10}&search=${search}`;
            await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
                if (status === 200) {
                    setMatches(result?.data || result)
                }
            });
        }

    };

    const showSearchBar = () => {
        setSearching(true)
        searchInputRef.current.focus()
    }

    const dismissSearch = () => {
        setSearching(false)
        setMatches([])
    }
    return (
        <>
            <Container id="navbar-collapse-main"
                       className={`d-none d-sm-flex d-flex flex-row  header-menu ${searching ? 'hidden' : 'd-block'}`}>

                <ListGroup as="ul" xs="12" horizontal className="nav navbar-nav og d-flex ale ss  col-lg-12 col-md-12 col-sm-12 change-display">
                    
                    <li className={pathname === '/' ? "active" : ''}>
                        <a className="cg fm ox anl url-link not-selectable " href="/" title="Home"><img src={HomeIcon} alt=""  className="svg-menu-img-icon hide1" /> Home</a>
                    </li>
                    <li>
                        <a className={`g url-link live-game ${pathname === '/live' ? 'active' : ''}`} href="/live"
                           title="Live"><img src={LiveIcon} alt="" className="svg-menu-img-icon hide1" />Live</a>
                    </li>

                    <li className={pathname === '/jackpot' ? 'active' : ''}>
                        <a className="cg fm ox anl url-link" href="/jackpot" title="Jackpot">
                            <img src={JackpotIcon} alt="" className="svg-menu-img-icon hide1" /> Jackpot
                        </a>
                    </li>
                    <li className={pathname === '/app' ? 'active' : ''}>
                        <a className="g url-link" href="/app" title="App">
                            <span>
                                <FontAwesomeIcon icon={faMobile} className="hide1"/> APP
                            </span>
                        </a>
                    </li>

                   { (window.location.hostname.includes("test") || window.location.hostname.includes("localhost")) && 
                       (
                           <>
                            {/* <li className={pathname === '/virtuals/index' || pathname.includes("virtuals/index") ? 'active' : ''}>
                                <a className="g url-link" href="/virtuals/index" title="Virtuals">
                                    <span >
                                        <FontAwesomeIcon icon={faLaptop} className="hide1"/> Virtuals
                                    </span>
                                </a>
                            </li> */}
                            {/* <li className={pathname === '/virtuals/casino' || pathname.includes("virtuals/casino") ? 'active' : ''}>
                                <a className="g url-link" href="/virtuals/casino" title="Casino">
                                    <span >
                                        <FontAwesomeIcon icon={faLaptop} className="hide1"/> Casino
                                    </span>
                                </a>
                            </li>
                            <li className={pathname === '/livecasino' || pathname.includes("livecasino") ? 'active' : ''}>
                                <a className="g url-link" href="/livecasino" title="Live Casino">
                                    <span >
                                        <FontAwesomeIcon icon={faLaptop} className="hide1"/> Live Casino
                                    </span>
                                </a>
                            </li> */}
                        </> )
                   }
                    {/*<li className={pathname === '/casino' || pathname.includes("virtuals") ? 'active' : ''}>*/}
                    {/*    <a className="g url-link" href="/virtuals/index" title="Casino">*/}
                    {/*        <FontAwesomeIcon icon={faDice}/> Casino*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    <li className={pathname === '/promotions' || pathname.includes("promotions") ? 'active' : ''}>
                        <a className="g url-link" href="/promotions" title="Promotions">
                            <img src={PromotionIcon} alt="" className="svg-menu-img-icon hide1" /> Promotions
                        </a>
                    </li>

                    <li className={pathname === '/print-matches' ? 'active py-3' : 'py-md-0 py-lg-3 py-sm-0 d-flex align-items-center'}>
                        <a className="g url-link fix-print" href="/print-matches" title="Print Matches">
                            <span className=" space-icons hide1"><FontAwesomeIcon icon={faPrint}/> </span>Print <span>Matches</span>
                        </a>
                    </li>
                    {/**
                    <li>
                        <a className="g url-link" href="/livescore"
                           title="Live Score">
                            <span>
                                <FontAwesomeIcon icon={faInfo}/> Live Score
                            </span>
                        </a>
                    </li>
                    **/ 
                    }
                    <li className={pathname === '/print-matches' ? 'spacing-end' : 'spacing-end'}>
                        <a className="g url-link fix-display" href="#" title="Search"
                           onClick={() => showSearchBar()}>
                            <span className=" space-icons"><FontAwesomeIcon icon={faSearch} /> </span><span className={'hide2'}>Search</span>
                        </a>
                    </li>
                    <li className={pathname === '/how-to-play' ? 'active' : ''}>
                        <a className="g url-link fix-display" href="/how-to-play" title="How to play">
                            <span className=" space-icons"><FontAwesomeIcon icon={faQuestionCircle}/> </span> <span className={'hide2'}>Help</span>
                        </a>
                    </li>
                    <li className={""}>
                        <a className="g url-link fix-display" href="#" title="Current Time">
                            <span className=" space-icons"><FontAwesomeIcon icon={faClock}/> </span> <span className={'hide2'}>{time}</span>
                        </a>
                    </li>
                </ListGroup>

            </Container>
            <Container id="navbar-collapse-main"
                       className={`fadeIn header-menu d-flex justify-content-center px-4 ${searching ? 'd-block' : 'd-none'}`}>
                <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss col-md-6 text-center">
                    <div className="d-flex">
                        <div className="col-md-10">
                            <input type="text" placeholder={'Start typing to search for team ...'} ref={searchInputRef}
                                   onInput={(event) => fetchMatches(event.target.value)}
                                   className={'form-control input-field border-0  no-border-radius'}/>
                        </div>

                        <button className={'btn text-white -align-right'} onClick={() => dismissSearch()}>
                            <FontAwesomeIcon icon={faTimes}/> Close
                        </button>
                    </div>
                    <div
                        className={`autocomplete-box position-fixed bg-white border-dark col-md-5 mt-1 shadow-lg text-start`}>
                        {matches.map((match, index) => (
                            <a href={`/?search=${match.home_team}`} key={index}>
                                <li style={{borderBottom: "1px solid #eee"}}>
                                    {match.home_team}
                                </li>
                            </a>
                        ))}
                    </div>
                </ListGroup>
            </Container>
        </>
    )

}
export default React.memo(HeaderNav);
