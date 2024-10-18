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
import logo from '../../assets/img/logo.png';
import {Navbar} from "react-bootstrap";
import MobileMenu from './mobile-menu';
import MobileRightMenu from './mobile-right-menu';
import MobileDownloadBanner from './mobile-download-banner';
import MobileLoggedInBals from './mobile-logged-in-bals';
import LoginModal from '../loginmodal';
import { FaDivide } from 'react-icons/fa';
import BigIconNav from './big-icon-nav';
const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderLogin = React.lazy(() => import('./top-login'));
const HeaderNav = React.lazy(() => import('./header-nav'));
const MobileCurrentNavItems = React.lazy(()=> import('./mobile-current-nav-items'));

const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    // const containerRef = useRef();
    // const {current} = containerRef;


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
        let endpoint = "/v2/user/balance";
        
        makeRequest({url: endpoint, method: "GET", api_version:2}).then(([_status, response]) => {
            if (_status == 200) {
                let u = {...user, ...response?.data};
                setLocalStorage('user', u);
                setUser(u)
                dispatch({type: "SET", key: "user", payload: user});
            }
        });

    }, [state?.toggleuserbalance]);

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
                    
                    <div href="/" className="e col-md-5 col-sm-6 logo align-self-start" title="surebet"  style={{ marginTop: '-20px' }}>
                        <span className='inline-block md:!hidden text-white mr-3 '></span><a href='/'><img src={logo} alt="surebet" title="surebet" effects="blur"/></a>
                    </div>

                    <div className='inline-block md:hidden text-white col-sm-6'>
                        <MobileRightMenu />
                    </div>

                    <div className="col-md-7 change-size" id="navbar-collapse-main">
                        {user ? <ProfileMenu user={user}/> : <HeaderLogin setUser={setUser}/>}
                    </div>
                        
                </Container>
            </Navbar>

            {/* mobile bottom menu */}
           

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
