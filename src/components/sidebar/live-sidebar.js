import React, {useState, useEffect, useCallback} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeRequest from "../utils/fetch-request";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Menu, MenuItem, Sidebar, SubMenu} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import gameCategories from '../utils/static-data';

const LiveSideBar = (props) => {

    const [liveSports, setLiveSports] = useState([])
    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)

    const fetchData = useCallback(() => {
        let endpoint = "/v1/sports?live=1";
        makeRequest({url: endpoint, method: "GET"})
            .then(([c_status, c_result]) => {
                if (c_status == 200) {
                    setLiveSports(c_result)
                }
            });
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

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
    return (
            <div style={{
                display: 'flex',
                overflow: 'scroll initial',
                zIndex: 10,
                top: "100px"
            }}
                 className={`vh-100 text-white sticky-top d-none d-md-block up col-md-2`}>
                <Sidebar
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
                                        key={index}>
                                </SubMenu>
                            ))}
                        </Menu>
                </Sidebar>
                }
                            {liveSports && Object.entries(liveSports)?.map(([index, livesport]) => (
                                    <Menu iconShape="circle">
                                        <MenuItem>
                                            <Link className="col-12 font-[500]"
                                               to={`/live/${livesport.sport_id}`}>
                                                <Row>
                                                    <Col lg="11" md="11" sm="11" xs="11" className="topl">
                                                        <Row style={{color: "#69819a"}}>
                                                            <Col className={''}>{livesport.sport_name} </Col>
                                                            <Col>
                                                                <span className={'badge rounded-pill bg-dark'} style={{
                                                                    float: "right",
                                                                    color: "#fff"
                                                                }}>
                                                                        {livesport.count}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Link>
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
export default LiveSideBar;
