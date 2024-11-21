import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";


const PageViewTracker = () => {
    const location = useLocation();

    useEffect(() => {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);
  
    // return null;
  };

  export default React.memo(PageViewTracker);