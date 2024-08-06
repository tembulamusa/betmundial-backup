import React, {useState, useEffect, useCallback} from 'react';
import football from '../../assets/svg/football.svg'
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeRequest from "../utils/fetch-request";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Menu, MenuItem, Sidebar, SubMenu} from "react-pro-sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {setLocalStorage} from "../utils/local-storage";

const LiveSideBar = (props) => {

    const [liveSports, setLiveSports] = useState()

    console.log(liveSports)

    const fetchData = useCallback(() => {
        let endpoint = "/v1/sports?live=1";
        makeRequest({url: endpoint, method: "get", data: null})
            .then(([c_status, c_result]) => {
                console.log("V1 sports result ", c_result, c_status);
                if (c_status === 200) {
                    setLiveSports(c_result?.data)
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
                            {liveSports && Object.entries(liveSports).map(([index, livesport]) => (
                                    <Menu iconShape="circle">
                                        <MenuItem>
                                            <a className="col-12"
                                               href={`/live/${livesport.sport_id}`}>
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
                                            </a>
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
