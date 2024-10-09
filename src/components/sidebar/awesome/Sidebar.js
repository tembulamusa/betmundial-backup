import React, {useCallback, useEffect, useState, useContext} from 'react';
import {
    Sidebar, 
    Menu, 
    MenuItem, 
    SubMenu, 
    SidebarHeader, 
    //SidebarContent 
} from 'react-pro-sidebar';

//import 'react-pro-sidebar/dist/css/styles.css';
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import makeRequest from "../../utils/fetch-request";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PerfectScrollbar from 'react-perfect-scrollbar';

import 'react-perfect-scrollbar/dist/css/styles.css';
import {Context} from '../../../context/store';
import LiveSideBar from '../live-sidebar';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import gameCategories from '../../utils/static-data';
import Notify from '../../utils/Notify';

const ProSidebar = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [sport, setSport] = useState(79)
    const [loc, setLoc] = useState("/");
    const [state, dispatch] = useContext(Context);
    const location = useLocation()
    const [searchParams, ] = useSearchParams();
    const queryParamValue = searchParams.get('id');
    const [competitions, setCompetitions] = useState(null);

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    useEffect(() => {
        setLoc(location?.pathname)
    }, [location])

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const changeMatches = (gameType, competition) => {
        setLocalStorage('active_item', competition.sport_id);
        if(gameType === "competition") {
            dispatch({type: "SET", key: "filtercompetition", payload: {competition_id: competition?.competition_id}})
        }
    }

    const fetchData = async() => {


        // get all categories
        let cached_competitions2 = getFromLocalStorage("categories2");
        let endpoint2 = "/v2/sports";
        let cached_competitions = getFromLocalStorage('categories');

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint2, method: "get", api_version:2}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setCompetitions(c_result?.data);
                setLocalStorage('categories', c_result?.data);
                dispatch({type:"SET", key:"categories", payload:c_result});
            } else {
                Notify({status: 400, message: "Sport categories not found"});
            }
        } else {
            setCompetitions(cached_competitions);
            dispatch({type:"SET", key:"categories", payload:cached_competitions});
        }
        
    };

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);

    const [width, setWidth] = useState(window.innerWidth);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
        if (width >= 768 && width <= 991) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }
    }
    const updateSidebarState = () => {
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
        updateDimensions()
        updateSidebarState()
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const getSportImageIcon = (sport_name, folder = 'svg', topLeagues = false) => {

        let default_img = 'sure'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../../assets${sport_name}`) : require(`../../../assets/${folder}/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../assets/${folder}/${default_img}.png`);
        }
        return sport_image
    }

    const getDefaultMarketsForSport = (competition) => {
        return competition?.default_display_markets
    }


    return (
        <>
        {loc.includes("/live") ? <LiveSideBar /> : 
            <div style={{
                display: 'flex',
                overflow: 'scroll initial',
                zIndex: 10,
                top: "100px"
            }}
                 className={`vh-100 sticky-top d-none d-md-block up col-md-2`}>
                    {!competitions &&
                    <Sidebar
                    style={{backgroundColor: '#16202c !important'}}
                    image={false}
                    onToggle={handleToggleSidebar}
                    collapsed={collapsed}
                    toggled={toggled}>
                        <Menu iconShape="circle">
                            {gameCategories?.map((competition, index) => (
                                    <SubMenu title={competition.sport_name} defaultOpen={competition.sport_name === "Soccer"}
                                        icon={<img style={{borderRadius: '50%', height: '30px'}}
                                                    src={getSportImageIcon(competition.sport_name)} alt=''/>}
                                        label={competition.sport_name}
                                        className={`${['bandy','pesapallo', 'dota 2', 'starcraft', 'gaelic football', 'gaelic hurling', 'gaelic football'].includes(competition?.sport_name?.toLowerCase()) && 'force-reduce-img'}`}
                                        key={index}>
                                {/* <SubMenu title={'Countries'}
                                             style={{maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}}> */}
                                        <PerfectScrollbar >
                                        
                                        {/* For soccer, let's have the top soccer leagues here as well */}
                                        {
                                            competition.sport_name =="Soccer"
                                            &&
                                            competitions?.top_soccer?.map ((league, idx) => (
                                                <MenuItem
                                                    title={league.competition_name}
                                                    // label = {country.category_name}
                                                    key={league?.competition_id}
                                                    icon = {<img style={{borderRadius: '1px', height: '13px', width:"13px" }}
                                                    src={getSportImageIcon(league?.flag, 'img/flags-1-1', true)}
                                                    alt='' className='inline-block mr-2'/>}
                                                    >
                                                        <Link className={`sidebar-link ${(queryParamValue == league.competition_id) && 'active'}`} to={`/sports/competition/matches?id=${league.competition_id}`}
                                                            onClick={() => changeMatches("competition", league)}>
                                                            <span>{league?.competition_name}</span>
                                                        </Link>
                                                </MenuItem>
                                            ))
                                        
                                        }
                                        {/* {competition?.categories.map((country, countryKey) => (
                                                <SubMenu
                                                        title={country.category_name}
                                                        label = {country.category_name}
                                                        icon={<img style={{borderRadius: '50%', height: '15px'}}
                                                        className=''
                                                        src={getSportImageIcon(country.cat_flag, 'img/flags-1-1')}
                                                        alt=''/>}
                                                        className='inner-submenu'
                                                        key={countryKey}>

                                                            {country?.competitions?.map((league, leagueKey) => (
                                                                <MenuItem
                                                                title={league.competition_name}
                                                                // label = {country.category_name}
                                                                key={league?.competition_id}
                                                                >
                                                                    <Link className='country-competition-item' to={`/competition/country/league/${league.competition_id}/all`}
                                                                        onClick={() => changeMatches("competition", league)}>
                                                                        <span>{league?.competition_name}</span>
                                                                    </Link>
                                                                </MenuItem>
                                                            ))                                                                
                                                            }
                                                            
                                                </SubMenu>
                                        ))} */}
                                        </PerfectScrollbar >
                                { /* </SubMenu> */}
                                </SubMenu>
                            ))}
                        </Menu>
                </Sidebar>
                }



                {/* The new  */}

                <Sidebar
                    style={{backgroundColor: '#16202c !important'}}
                    image={false}
                    onToggle={handleToggleSidebar}
                    collapsed={collapsed}
                    toggled={toggled}>
                        <Menu iconShape="circle">
                            {
                                competitions?.map((sport, idx) => (
                                    <SubMenu title={sport?.sport_name} defaultOpen={sport?.sport_name === "Soccer"}
                                        icon={<img style={{borderRadius: '50%', height: '30px'}}
                                                    src={getSportImageIcon(sport?.sport_name)} alt=''/>}
                                        label={sport?.sport_name}
                                        className={`${['bandy','pesapallo', 'dota 2', 'starcraft', 'gaelic football', 'gaelic hurling', 'gaelic football'].includes(sport?.sport_name?.toLowerCase()) && 'force-reduce-img'}`}
                                        key={idx}>
                                {/* <SubMenu title={'Countries'}
                                             style={{maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}}> */}
                                        <PerfectScrollbar >
                                        
                                        {/* For soccer, let's have the top soccer leagues here as well */}
                                        {
                                            sport?.sport_name =="Soccer"
                                            &&
                                            sport?.top_soccer?.map ((league, idx) => (
                                                <MenuItem
                                                    title={league?.competition_name}
                                                    // label = {country.category_name}
                                                    key={league?.competition_id}
                                                    icon = {<img style={{borderRadius: '1px', height: '13px', width:"13px" }}
                                                    src={getSportImageIcon(league?.flag, 'img/flags-1-1', true)}
                                                    alt='' className='inline-block mr-2'/>}
                                                    >
                                                        <Link className={`sidebar-link ${(queryParamValue == league.competition_id) && 'active'}`} to={`/sports/competition/matches?id=${league.competition_id}`}
                                                            onClick={() => changeMatches("competition", league)}>
                                                            <span>{league?.competition_name}</span>
                                                        </Link>
                                                </MenuItem>
                                            ))
                                        
                                        }
                                        {sport?.categories.map((country, countryKey) => (
                                                <SubMenu
                                                        title={country.category_name}
                                                        label = {country.category_name}
                                                        icon={<img style={{borderRadius: '50%', height: '15px'}}
                                                        className=''
                                                        src={getSportImageIcon(country.cat_flag, 'img/flags-1-1')}
                                                        alt=''/>}
                                                        className='inner-submenu'
                                                        key={countryKey}>

                                                            {country?.competitions?.map((league, leagueKey) => (
                                                                <MenuItem
                                                                title={league.competition_name}
                                                                // label = {country.category_name}
                                                                key={league?.competition_id}
                                                                >
                                                                    <Link className='country-competition-item' to={`/competition/country/league/${league.competition_id}/all`}
                                                                        onClick={() => changeMatches("competition", league)}>
                                                                        <span>{league?.competition_name}</span>
                                                                    </Link>
                                                                </MenuItem>
                                                            ))                                                                
                                                            }
                                                            
                                                </SubMenu>
                                        ))}
                                        </PerfectScrollbar >
                                { /* </SubMenu> */}
                                </SubMenu>
                                ))
                            }
                        </Menu>
                </Sidebar>









                <Sidebar
                    style={{backgroundColor: '#16202c !important'}}
                    image={false}
                    onToggle={handleToggleSidebar}
                    collapsed={collapsed}
                    toggled={toggled}>
                        <Menu iconShape="circle">
                            {competitions?.all_sports?.map((competition, index) => (
                                    <SubMenu title={competition.sport_name} defaultOpen={competition.sport_name === "Soccer"}
                                        icon={<img style={{borderRadius: '50%', height: '30px'}}
                                                    src={getSportImageIcon(competition.sport_name)} alt=''/>}
                                        label={competition.sport_name}
                                        className={`${['bandy','pesapallo', 'dota 2', 'starcraft', 'gaelic football', 'gaelic hurling', 'gaelic football'].includes(competition?.sport_name?.toLowerCase()) && 'force-reduce-img'}`}
                                        key={index}>
                                {/* <SubMenu title={'Countries'}
                                             style={{maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}}> */}
                                        <PerfectScrollbar >
                                        
                                        {/* For soccer, let's have the top soccer leagues here as well */}
                                        {
                                            competition.sport_name =="Soccer"
                                            &&
                                            competitions?.top_soccer?.map ((league, idx) => (
                                                <MenuItem
                                                    title={league.competition_name}
                                                    // label = {country.category_name}
                                                    key={league?.competition_id}
                                                    icon = {<img style={{borderRadius: '1px', height: '13px', width:"13px" }}
                                                    src={getSportImageIcon(league?.flag, 'img/flags-1-1', true)}
                                                    alt='' className='inline-block mr-2'/>}
                                                    >
                                                        <Link className={`sidebar-link ${(queryParamValue == league.competition_id) && 'active'}`} to={`/sports/competition/matches?id=${league.competition_id}`}
                                                            onClick={() => changeMatches("competition", league)}>
                                                            <span>{league?.competition_name}</span>
                                                        </Link>
                                                </MenuItem>
                                            ))
                                        
                                        }
                                        {competition?.categories.map((country, countryKey) => (
                                                <SubMenu
                                                        title={country.category_name}
                                                        label = {country.category_name}
                                                        icon={<img style={{borderRadius: '50%', height: '15px'}}
                                                        className=''
                                                        src={getSportImageIcon(country.cat_flag, 'img/flags-1-1')}
                                                        alt=''/>}
                                                        className='inner-submenu'
                                                        key={countryKey}>

                                                            {country?.competitions?.map((league, leagueKey) => (
                                                                <MenuItem
                                                                title={league.competition_name}
                                                                // label = {country.category_name}
                                                                key={league?.competition_id}
                                                                >
                                                                    <Link className='country-competition-item' to={`/competition/country/league/${league.competition_id}/all`}
                                                                        onClick={() => changeMatches("competition", league)}>
                                                                        <span>{league?.competition_name}</span>
                                                                    </Link>
                                                                </MenuItem>
                                                            ))                                                                
                                                            }
                                                            
                                                </SubMenu>
                                        ))}
                                        </PerfectScrollbar >
                                { /* </SubMenu> */}
                                </SubMenu>
                            ))}
                        </Menu>
                </Sidebar>
            </div>
        }
            
        </>
        
    );
};

export default ProSidebar;
