import React, {useState, useEffect, useCallback, useContext} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeRequest from "../utils/fetch-request";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Menu, MenuItem, Sidebar, SubMenu} from "react-pro-sidebar";
import { Link, useNavigate } from 'react-router-dom';
import gameCategories from '../utils/static-data';
import useInterval from '../../hooks/set-interval.hook';
import { removeItem, setLocalStorage } from '../utils/local-storage';
import { Context } from '../../context/store';

const LiveSideBar = (props) => {

    const [liveSports, setLiveSports] = useState([])
    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [, dispatch] = useContext(Context);
    const navigate = useNavigate();

    const fetchData = () => {
        const abortController = new AbortController();
        let endpoint = "/v2/sports/live";
        makeRequest({url: endpoint, method: "GET", api_version:2})
            .then(([c_status, c_result]) => {
                // console.log("THE REQUEST RESULT IS HERE  ::: ", c_result)
                if (c_status == 200) {
                    setLiveSports(c_result?.data)
                }
            });

            return () => abortController.abort();
        };

    // useInterval(async () => {
    //     fetchData();
    // }, 15000);

    useEffect(() => {
        fetchData();

        const abortController = new AbortController();
        return () => {
            abortController.abort();
        };
    }, []);

    const getSportImageIcon = (sport_name, folder = 'svg', topLeagues = false) => {

        let default_img = 'sure'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../assets${sport_name}`) : require(`../../assets/${folder}/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../assets/${folder}/${default_img}.png`);
        }
        return sport_image
    }

    
    const handleLiveSportsNavigation = (livesport) => {

        dispatch({type:"SET", key:"selectedLivesport", payload: livesport})
        setLocalStorage("selectedLivesport", liveSports, 1000 * 60 * 60);
        navigate(`/live/${livesport.sport_id}`)
    }
    useEffect(()=> {
        return () => {
            removeItem("selectedLivesport");
            dispatch({type:"DEL", key:"selectedLivesport"});
        }
    }, [])
    return (
            <div style={{
                display: 'flex',
                overflow: 'scroll initial',
                zIndex: 10,
                top: "100px"
            }}
                 className={`px-2 vh-100 text-white sticky-top d-none d-md-block up col-md-2`}>
                <Sidebar
                    id='live-sidebar-left'
                    style={{backgroundColor: '#16202c !important'}}
                    image={false}>
                    <div>
                        <div
                            style={{
                                padding: '5px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 14,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                padding: '5px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 14,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>
                            <div className="d-flex">
                                LIVE SPORTS
                            </div>
                        </div>
                    </div>
                        <Menu iconShape="circle">
                        {!liveSports &&
                    <Sidebar
                    style={{backgroundColor: '#16202c !important'}}
                    image={false}
                    // onToggle={handleToggleSidebar}
                    collapsed={collapsed}
                    toggled={toggled}>
                        <Menu iconShape="circle">
                            {gameCategories.map((competition, index) => (
                                    <SubMenu title={competition.sport_name} defaultOpen={competition.sport_name == "Soccer"}
                                        icon={<img style={{borderRadius: '50%', height: '30px'}}
                                                    src={getSportImageIcon(competition.sport_name)} alt=''/>}
                                        label={competition.sport_name}
                                        className={`${['bandy','pesapallo', 'dota 2', 'starcraft', 'gaelic football', 'gaelic hurling', 'gaelic football'].includes(competition?.sport_name?.toLowerCase()) && 'force-reduce-img'}`}
                                        key={`live-listing-${index}`}>
                                </SubMenu>
                            ))}
                        </Menu>
                </Sidebar>
                }
                            {liveSports && Object.entries(liveSports)?.map(([index, livesport]) => (
                                    <Menu iconShape="circle">
                                        <MenuItem key={`live-sidebar-item-${index}`}>
                                            <div className="col-12 font-[500]" onClick={() => handleLiveSportsNavigation(livesport)}>
                                                <Row>
                                                    <Col lg="11" md="11" sm="11" xs="11" className="topl">
                                                        <Row style={{color: "#69819a"}}>
                                                            <Col className={''}>{livesport?.sport_name} </Col>
                                                            <Col>
                                                                <span className={'badge rounded-pill bg-dark'} style={{
                                                                    float: "right",
                                                                    color: "#fff"
                                                                }}>
                                                                        {livesport?.count}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </MenuItem>
                                    </Menu>
                                )
                            )
                            }
                        </Menu>
                </Sidebar>
            </div>
    );

}
export default React.memo(LiveSideBar);
