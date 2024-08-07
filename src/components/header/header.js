import React, {useEffect, useCallback, useState, useContext, useRef} from 'react';
import {useNavigate} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage} from '../utils/local-storage';
import {ToastContainer} from 'react-toastify';
import makeRequest from '../utils/fetch-request';
import {setLocalStorage} from '../utils/local-storage';
import 'react-lazy-load-image-component/src/effects/blur.css';

import logo from '../../assets/img/logo2.png';
import {Navbar} from "react-bootstrap";
import MobileMenu from './mobile-menu';
import MobileRightMenu from './mobile-right-menu';
import MobileTabsMenu from "./mobile-tabs-menu.js";
const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderLogin = React.lazy(() => import('./top-login'));
const HeaderNav = React.lazy(() => import('./header-nav'));
const MobileCurrentNavItems = React.lazy(()=> import('./mobile-current-nav-items'));

const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    const containerRef = useRef();
    const {current} = containerRef;


    const NotifyToastContaner = () => {
        return <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    };
    const updateUserOnHistory = useCallback(() => {
        if (!user) {
            return false;
        }
        let endpoint = "/v1/balance";
        let udata = {
            token: user.token
        }
        makeRequest({url: endpoint, method: "post", data: udata}).then(([_status, response]) => {
            if (_status == 200) {
                let u = {...user, ...response.user};
                setLocalStorage('user', u);
                setUser(u)
                dispatch({type: "SET", key: "user", payload: user});
            }
        });

    }, [current]);

    const updateUserOnLogin = useCallback(() => {
        dispatch({type: "SET", key: "user", payload: user});
    }, [user?.msisdn, user?.balance]);

    useEffect(()=>{
        setUser(getFromLocalStorage("user"));
    },[state?.user]);
    useEffect(() => {
        updateUserOnHistory()
    }, [updateUserOnHistory])


    useEffect(() => {
        updateUserOnLogin()
    }, [updateUserOnLogin])

    const expand = "md"
    return (
        <>
            <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark">
                <Container fluid className={'d-flex justify-content-between mobile-change'}>
                    <div className='inline-block md:hidden text-white col-sm-2'>
                        <MobileMenu />
                    </div>
                    <Navbar.Brand href="/" className="e col-md-5 col-sm-6 logo align-self-start" title="surebet">
                                <LazyLoadImage src={logo} alt="surebet" title="surebet" effects="blur"/>
                    </Navbar.Brand>

                    <div className='inline-block md:hidden text-white col-sm-5'>
                        <MobileRightMenu />
                    </div>

                    <div className="col-md-7 change-size" id="navbar-collapse-main">
                        {user ? <ProfileMenu user={user}/> : <HeaderLogin setUser={setUser}/>}
                    </div>
                   
                    <Row className="hidden md:block second-nav ck pc os app-navbar app-header-nav">
                        <HeaderNav/>
                    </Row>
        { /** <Navbar.Offcanvas
                        style={{width: "100% !important", height: "100%"}}
                        className='off-canvas background-primary p-0'
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start">
                        <Offcanvas.Header closeButton className='text-white'>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                <div className="col-3">
                                    <div>
                                        <LazyLoadImage src={logo} alt="surebet" title="surebet" effects="blur"/>
                                    </div>
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <SidebarMobile/>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas> */}
                </Container>
            </Navbar>

            {/* mobile bottom menu */}

            <Row className="block md:hidden second-nav ck pc os app-navbar relative mobile-custom-scrollbar px-3">
                <div className="hidden-icons"><HeaderNav/></div>
                
            </Row>

            {/* Only show if they are visible/third nav is available */}
            <Row className="third-mobile-nav border-b border-gray-200 mobile-custom-scrollbar">
                <MobileCurrentNavItems />
            </Row>

            {/* Only show if fourth nav is available/ tabs or so */}
            {/* <Row className="tabs">
                <MobileTabsMenu />
            </Row> */}
        </>

    )
}
export default React.memo(Header);
