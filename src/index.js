import React, {useEffect, useCallback, Suspense, useContext} from "react";
import { createRoot } from 'react-dom/client';

import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/application.css';
import './assets/css/tolkits.css';
import './assets/css/sidebar-menu.css';
import './index.css';
import Store from './context/store';

import Index from './components/index';

import MatchAllMarkets from './components/all-markets';
import Jackpot from './components/jackpot';
import Live from './components/live';
import MyBets from './components/my-bets';
import HowToPlay from './components/pages/HowToPlay';
import TermsAndConditions from './components/pages/terms-and-conditions/index';
import CookiePolicy from './components/pages/cookie-policy/index';
import DisputeResolution from './components/pages/dispute-resolution/index';
import ResponsibleGambling from './components/pages/responsible-gambling';
import AntimoneyLaundering from './components/pages/anti-money-laundering';
import PrivacyPolicy from './components/pages/privacy-policy/index';
import Withdraw from './components/pages/deposit-withraw/Withdraw';
import Deposit from './components/pages/deposit-withraw/Deposit';
import Signup from './components/pages/signup';
import ResetPassword from './components/pages/auth/reset-password';
import VerifyAccount from './components/pages/auth/verify-account';

import MobileApp from './components/pages/app';
import ProtectedRoute from './components/utils/protected-route';

import PrintMatches from './components/pages/downloads';

import Casino from './components/pages/casino/Casino';
import LiveCasino from './components/pages/casino/LiveCasino';
import Virtuals from './components/pages/casino/Virtuals';

import CasinoGamePlay from './components/pages/casino/GamePlay';

import Promotions from './components/pages/promotions/Promotions';
import Login from './components/pages/login';
import LiveScore from './components/pages/livescore/LiveScore';
import Right from "./components/right/index";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { Row } from "react-bootstrap";
import Sidebar from "./components/sidebar/awesome/Sidebar";
import { Context } from './context/store';

const Logout = () => {
    let navigate = useNavigate();
    localStorage.clear();
    const out = useCallback(() => {
        localStorage.clear();
        // window.location.href = "/"; 
    }, []);
    useEffect(() => {
        out();
    }, [out]);
    localStorage.clear();
    navigate("/");

    return null
}

const container = document.getElementById("app");


const App = () => {
    const [state, ] = useContext(Context);
    return (
            <BrowserRouter>
            <div className={state?.currentmode}>
                <Suspense fallback={<p></p>}>
                <Header />
                <div className="amt">
                    <div className="diminish-mobile-row row">
                        {/* Conditional load live or otherwise */}
                        <Sidebar />
                
                        <div className="col-md-7 home mx-auto">
                        <Routes>
                            
                            <Route exact path="/" element={<Index/>}/>
                            <Route exact path="/virtuals" element={<Casino/>}/>
                            <Route exact path="/virtuals/index" element={<Virtuals />}/>
                            <Route exact path="/virtuals/casino" element={<Casino />}/>
                            <Route exact path="/livescore" element={<LiveScore/>}/>
                            <Route exact path="/casino" element={<Casino/>}/>
                            <Route exact path="/livecasino" element={<LiveCasino/>}/>
                            <Route exact path="/virtuals/launch/:game_id" element={<CasinoGamePlay/>}/>
                            <Route exact path="/highlights" element={<Index/>}/>
                            <Route exact path="/upcoming" element={<Index/>}/>
                            <Route exact path="/tomorrow" element={<Index/>}/>
                            <Route exact path="/competition/:id" element={<Index/>}/>
                            <Route exact path="/competition/:sportid/:categoryid/:competitionid"
                                element={<Index/>}/>
                            <Route exact path="/match/:id" element={<MatchAllMarkets/>}/>
                            <Route exact path="/match/live/:id" element={<MatchAllMarkets live/>}/>
                            <Route exact path="/jackpot" element={<Jackpot/>}/>
                            <Route exact path="/live" element={<Live/>}/>
                            <Route exact path="/live/:spid" element={<Live/>}/>
                            <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
                            <Route exact path="/anti-money-laundering" element={<AntimoneyLaundering/>}/>
                            <Route exact path="/responsible-gambling" element={<ResponsibleGambling/>}/>
                            <Route exact path="/dispute-resolution" element={<DisputeResolution/>}/>
                            <Route exact path="/cookie-policy" element={<CookiePolicy/>}/>
                            <Route exact path="/terms-and-conditions" element={<TermsAndConditions/>}/>
                            <Route exact path="/how-to-play" element={<HowToPlay/>}/>
                            <Route exact path="/signup" element={<Signup/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/reset-password" element={<ResetPassword/>}/>
                            <Route exact path="/verify-account" element={<VerifyAccount/>}/>
                            <Route exact path="/app" element={<MobileApp/>}/>
                            <Route exact path="/logout" element={<Logout/>}/>
                            <Route exact path="/print-matches" element={<PrintMatches/>}/>
                            <Route exact path="/promotions" element={<Promotions/>}/>
                            <Route exact path="/deposit"
                                element={<ProtectedRoute><Deposit/></ProtectedRoute>}/>
                            <Route exact path="/withdraw"
                                element={<ProtectedRoute><Withdraw/></ProtectedRoute>}/>
                            <Route exact path="/my-bets"
                                element={<ProtectedRoute><MyBets/> </ProtectedRoute>}/>
                            <Route path="*" element={<Index/>}/>
                            </Routes>
                    </div>
                    <Right />
                 
                </div>
            </div>
            <Footer />
            </Suspense>
            </div>
            </BrowserRouter>
    )
    

}



const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Store><App /></Store>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
