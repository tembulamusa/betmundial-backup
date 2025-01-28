import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Context } from "./context/store";

export const PromoTracker = () => {
    const location = useLocation();
    const [promoInfo, setPromoInfo] = React.useState(null);
    const [promoTimestamp, setPromoTimestamp] = React.useState(null);
    const [state, dispatch] = React.useContext(Context);  

    // List of valid paths
    const validPaths = [
        "/", "/match/:id", "/casino", "/casino/:filterType/:filterName", 
        "/casino-game/:provider/:gameName", "/match/live/:id", "/jackpot", 
        "/live", "/live/:spid", "/privacy-policy", "/anti-money-laundering", 
        "/responsible-gambling", "/dispute-resolution", "/cookie-policy", 
        "/faqs", "/terms-and-conditions", "/how-to-play", "/signup", 
        "/login", "/reset-password", "/forgot-password", "/verify-account", 
        "/app", "/logout", "/check-deposit-status", "/exclude", 
        "/surecoin", "/surebox", "/livescore", "/deposit", "/withdraw", 
        "/my-bets"
    ];

    useEffect(() => {
        // Check if promo info is valid based on the timestamp
        const now = new Date().getTime();
        if (promoTimestamp && now - promoTimestamp < 30 * 60 * 1000) {
            // Avoid setting the same value again
            if (promoInfo !== state.promoInfo) {
                setPromoInfo(promoInfo);
                dispatch({ type: "SET", key: "promoInfo", payload: promoInfo }); 
            }
        } else {
            // Reset if expired
            if (promoInfo !== null) {
                setPromoInfo(null);
                setPromoTimestamp(null);
                dispatch({ type: "SET", key: "promoInfo", payload: null }); 
            }
        }
    }, [promoInfo, promoTimestamp, dispatch, state.promoInfo]);

    useEffect(() => {
        const path = location.pathname;

        // Check if the path is not in the list of valid paths
        const isPromoPath = !validPaths.some(validPath => {
            const regex = new RegExp(`^${validPath.replace(/:[^\s/]+/g, '[^/]+')}$`);
            return regex.test(path);
        });

        if (isPromoPath && path !== promoInfo) {
            const now = new Date().getTime();
            const promoName = path.startsWith("/") ? path.slice(1) : path;

            // Only update if promoName is different
            if (promoName !== promoInfo) {
                setPromoInfo(promoName);
                setPromoTimestamp(now);
                dispatch({ type: "SET", key: "promoInfo", payload: promoName });
            }
        }
    }, [location, promoInfo, validPaths, dispatch]);

    return null;
};
