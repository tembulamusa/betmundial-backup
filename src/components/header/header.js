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
import MobileRightMenu from './mobile-right-menu';
import MobileLoggedInBals from './mobile-logged-in-bals';
import LoginModal from '../loginmodal';
import BigIconNav from './big-icon-nav';
import CheckMpesaDepositStatus from '../webmodals/check-mpesa-deposit-status';
import DepositModal from '../webmodals/deposit-modal';
const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderLogin = React.lazy(() => import('./top-login'));
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
        const repeatBalRequest = setInterval(() => {
            makeRequest({url: endpoint, method: "GET", api_version:2}).then(([_status, response]) => {
                if (_status == 200) {
                    let u = {...user, ...response?.data};
                    setLocalStorage('user', u);
                    setUser(u)
                    dispatch({type: "SET", key: "user", payload: u});

                    console.log("I HAVE REQUESTED FOR THIS BAL THIS TIME ::::: ", response?.data)
                    return                
                }
            });
        }, 2000)

        console.log("STARTING TO POLL BALS FROM THE HEADER ::::: ====== ", state?.user?.balance)
        const timerId = setTimeout(() => {
            clearInterval(repeatBalRequest);
        }, 6000)


    }, [state?.toggleuserbalance]);

    const updateUserOnLogin = useCallback(() => {
        if (!state?.user) {
            dispatch({type: "SET", key: "user", payload: user});
        }
        

    }, [user]);

    const checkUserExpiry = () => {
        setInterval(function() {
            console.log("Check user expiry");
            clearInterval(checkUserExpiry)
        }, 5000)
    }
    useEffect(() => {
        if (!user) {
            setUser(state?.user)
        }
        state?.user && checkUserExpiry()
    }, [state?.user])
    
    useEffect(() => {
        updateUserOnHistory()
    }, [updateUserOnHistory])

    useEffect(() => {
        updateUserOnLogin()
    }, [updateUserOnLogin])

    
    const expand = "md"

    
    return (
        <>
            
            <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" style={{flexWrap:"wrap"}}>
                {/* <MobileDownloadBanner /> */}
                <div className='main-header-top w-full p-0'><div className='light-blue md:hidden text-white py-1 w-full px-3'><MobileLoggedInBals/></div>
                    <Container fluid className={'d-flex justify-content-between mobile-change'}>
                        
                        <div href="/" className="e col-md-5 col-sm-6 logo align-self-start" title="surebet">
                            <a className='my-2' href='/'><img src={logo} alt="surebet" title="surebet" effects="blur"/></a>
                        </div>

                        <div className="col-md-7 col-sm-6" id="navbar-collapse-main">
                            {/* {user ? <ProfileMenu user={user}/> : <HeaderLogin setUser={setUser}/>} */}
                            {user ? <ProfileMenu user={user}/> : <HeaderLogin setUser={setUser}/>}
                        </div>
                            
                    </Container>
                </div>
                <div className='block w-full'><BigIconNav /></div>
            </Navbar>

            {/* mobile bottom menu */}
           

            {/* Only show if they are visible/third nav is available */}
            

            

        <ShareModal shown={state?.showsharemodal == false} />
        
        <LoginModal />
        <CheckMpesaDepositStatus />
        <DepositModal />
        </>

    )
}

export default React.memo(Header);
