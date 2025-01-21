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
import useInterval from "../../hooks/set-interval.hook";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import socket from '../utils/socket-connect';

const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderLogin = React.lazy(() => import('./top-login'));


const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    


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
   
    useEffect(() => {
        if (user) {
            const expirationTime = Date.now() + 1000 * 60 * 60 * 3; 
            setLocalStorage("user", { ...user, expirationTime }, expirationTime);
            dispatch({ type: "SET", key: "user", payload: user });
        }
    }, [user]);

    useEffect(() => {
        const checkSession = () => {
            const storedUser = getFromLocalStorage("user");
            const currentTime = Date.now();
    
            if (!storedUser || storedUser.expirationTime <= currentTime) {
                // Session expired
                localStorage.clear();
                dispatch({ type: "DEL", key: "user" });
                dispatch({ type: "DEL", key: "mybets" });
                navigate("/"); 
            }
        };
    
        const interval = setInterval(checkSession, 30000); 
    
        return () => clearInterval(interval);
    }, [dispatch, navigate]);
    
    const updateUserOnHistory = async() => {
        if (!user) {
            return;
        }
        let endpoint = "/v2/user/balance";
      
        await makeRequest({url: endpoint, method: "GET", api_version:2}).then(([_status, response]) => {
            if (_status == 200) {
                let u = {...user, ...response?.data, bonus_balace: response?.data?.bonus};
                let prevUser = user;
                if (u !== user){setUser(u);}
                // check if still on deposit page and if has next url and navigate
                if(parseInt(prevUser?.balance) < parseInt(response?.data?.balance)){
                    nextNavigate();
                }
                return                
            }
        });
    };

    useInterval( async () => {
        if(!socket.connected){updateUserOnHistory()}
    }
    ,3000);
    
    const nextNavigate = () => {
        const path = location.pathname
        const next = searchParams.get("next") || "/";
        if(path == "/deposit") {
            navigate(next)
        }
        
    }
    const expand = "md"
// toggle bal requ every 7 seconds

    
    return (
        <>
            <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" style={{flexWrap:"wrap"}}>
                {/* <MobileDownloadBanner /> */}
                <div className='main-header-top w-full p-0'><div className='light-blue md:hidden text-white py-1 w-full px-3'><MobileLoggedInBals/></div>
                    <Container fluid className={'d-flex justify-content-between mobile-change'}>
                        
                        <div className="e col-md-5 col-sm-6 logo align-self-start  items-center" title="surebet">
                            <a className="my-2 mt-3 inline-block" href="/" style={{ display: "inline-block" }}>
                                <img src={logo} alt="surebet" title="surebet" effects="blur" />
                            </a>
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
        
        <LoginModal setUser={setUser} />
        <CheckMpesaDepositStatus />
        <DepositModal />
        </>

    )
}

export default React.memo(Header);
