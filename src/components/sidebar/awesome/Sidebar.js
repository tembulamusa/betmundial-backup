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

const ProSidebar = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [sport, setSport] = useState(79)
    const [, dispatch] = useContext(Context);

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

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
                dispatch({type:"SET", key:"categories", payload:c_result});
            } else {
                fetchData()
            }
        } else {
            setCompetitions(cached_competitions);
            dispatch({type:"SET", key:"categories", payload:cached_competitions});
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

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

        let default_img = 'hipo'
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
    const pathname = window.location.pathname;


    return (
        <>
        {pathname == "/live" ? <LiveSideBar /> : 
            <div style={{
                display: 'flex',
                overflow: 'scroll initial',
                zIndex: 10,
                top: "100px"
            }}
                 className={`vh-100 text-white sticky-top d-none d-md-block up col-md-2`}>
                <Sidebar
    
                    style={{backgroundColor: '#16202c !important'}}
                    image={false}
                    onToggle={handleToggleSidebar}
                    collapsed={collapsed}
                    toggled={toggled}>
                        <Menu iconShape="circle">
    
                            
                            {competitions?.all_sports.map((competition, index) => (
    
                                <SubMenu title={competition.sport_name} defaultOpen={getActiveSport(competition.sport_id) && index !== 0}
                                         icon={<img style={{borderRadius: '50%', height: '30px'}}
                                                    src={getSportImageIcon(competition.sport_name)} alt=''/>}
                                         key={index}>
                                {/* <SubMenu title={'Countries'}
                                             style={{maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}}> */}
                                        <PerfectScrollbar >
                                        {competition?.categories.map((country, countryKey) => (
                                                <MenuItem title={country.category_name}
                                                         icon={<img style={{borderRadius: '50%', height: '15px'}}
                                                         src={getSportImageIcon(country.cat_flag, 'img/flags-1-1')}
                                                         alt=''/>} key={countryKey} >
    
                                                            <a href={`/competition/${competition.sport_id}/${country.category_id}/all`}
                                                               onClick={() => setLocalStorage('active_item', competition.sport_id)}>
                                                                {country.category_name}
                                                            </a>
                                                </MenuItem>
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
