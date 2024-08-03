import React, {useState, useEffect, useCallback} from 'react';
import football from '../../assets/svg/football.svg'
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeRequest from "../utils/fetch-request";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu} from "react-pro-sidebar";
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
                <ProSidebar
                    style={{backgroundColor: '#16202c !important'}}
                    image={false}>
                    <SidebarHeader>
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
                    </SidebarHeader>
                    <SidebarHeader>
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
                    </SidebarHeader>
                    <SidebarContent>
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
                    </SidebarContent>
                </ProSidebar>
            </div>
    );

    // return (
    //     <div className="gn d-md-block">
    //
    //       <PerfectScrollbar >
    //         <div className="qv rc aog alu web-element block-shadow bottom-std-margin-spacing">
    //             <header>
    //                 <div className="header-holder">
    //                     <span className="col-sm-10">Live Sports</span>
    //                     <span className="col-sm-2 header-icon">
    //                     <img
    //                       height="14px"
    //                       src={football}
    //                       alt="-"
    //                       />
    //                     </span>
    //                 </div>
    //             </header>
    //
    //             <ul className="aoi nav base-bg">
    //                 {  liveSports && Object.entries(liveSports).map(([index, livesport])  => (
    //                     <li className="li-white-h" key={index}>
    //                         <a className="col-12"
    //                             href={`/live/${livesport.sport_id}`}>
    //                             <Row>
    //                             <Col lg="11" md="11" sm="11" xs="11" className="topl" >
    //                                 <Row style={{color:"#69819a"}}>
    //                                     <Col>{livesport.sport_name} </Col>
    //                                     <Col><span style={{float:"right", color:"#fff"}}>{livesport.count }</span></Col>
    //                                 </Row>
    //                             </Col>
    //                            </Row>
    //                         </a>
    //                     </li>)
    //                   )
    //                 }
    //             </ul>
    //         </div>
    //       </PerfectScrollbar>
    //     </div>
    // )
}
export default LiveSideBar;
