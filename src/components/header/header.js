import React, {useEffect, useCallback, useState, useContext, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Context} from '../../context/store';
import {getFromLocalStorage} from '../utils/local-storage';
import {ToastContainer} from 'react-toastify';
import makeRequest from '../utils/fetch-request';
import {setLocalStorage} from '../utils/local-storage';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ShareModal from "../sharemodal";
import logo from '../../assets/img/logo2.png';
import {Navbar} from "react-bootstrap";
import MobileMenu from './mobile-menu';
import MobileRightMenu from './mobile-right-menu';
import MobileDownloadBanner from './mobile-download-banner';
import MobileLoggedInBals from './mobile-logged-in-bals';
import LoginModal from '../loginmodal';
import { FaDivide } from 'react-icons/fa';
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
                let u = {...user, ...response?.data};
                setLocalStorage('user', u);
                setUser(u)
                dispatch({type: "SET", key: "user", payload: user});
            }
        });

    }, [current, state?.toggleuserbalance]);

    const updateUserOnLogin = useCallback(() => {
        if (!state?.user) {
            dispatch({type: "SET", key: "user", payload: user});
        }
        

    }, [user]);

    useEffect(() => {
        if (!user) {
            setUser(state?.user)
        }
    }, [state?.user])
    // const updateUser = () => {
    //     setUser(getFromLocalStorage("user"));
    // }
    // useEffect(()=>{
    //     updateUser();
    // },[user]);
    
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
                {/* <MobileDownloadBanner /> */}
                <div className='light-blue md:hidden text-white py-2 w-full'><MobileLoggedInBals/></div>
                <Container fluid className={'d-flex justify-content-between mobile-change'}>
                    
                    <div href="/" className="e col-md-5 col-sm-6 logo align-self-start" title="surebet">
                        <span className='inline-block md:!hidden text-white mr-3 '><MobileMenu /></span><a href='/'><img src={logo} alt="surebet" title="surebet" effects="blur"/></a>
                    </div>

                    <div className='inline-block md:hidden text-white col-sm-6'>
                        <MobileRightMenu />
                    </div>

                    <div className="col-md-7 change-size" id="navbar-collapse-main">
                        {user ? <ProfileMenu user={user}/> : <HeaderLogin setUser={setUser}/>}
                    </div>
                    <Row className={`hidden md:block second-nav ck pc os app-navbar app-header-nav`}>
                        <HeaderNav/>
                    </Row>
                    
                        
                </Container>
            </Navbar>

            {/* mobile bottom menu */}
            <div className={`${state?.showmobiletop && "show-mobile-top"} block md:hidden second-nav ck pc os app-navbar relative mobile-custom-scrollbar diminish-mobile-row row`}>
                <div className="hidden-icons px-4"><HeaderNav/></div>
            </div>

            {/* Only show if they are visible/third nav is available */}
            <div className='md:hidden w-full  mobile-custom-scrollbar overflow-scroll bg-[#ffffffb8]'>
                <div className="md:row third-mobile-nav border-b border-gray-200 ml-0 px-2 flex">
                    <MobileCurrentNavItems />
                </div>
            </div>

            

        <ShareModal shown={state?.showsharemodal === true} />
        
        <LoginModal />
        </>

    )
}
export default React.memo(Header);
