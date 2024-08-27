import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/store";
import getSportImageIcon from "../utils/get-sport-image-icon";


const MobileCurrentNavItems = (props) => {
    const location = useLocation();
    const [currentNavItem, setCurrentNavItem] = useState("/sport");
    const [state, _] = useContext(Context);

    // setting pathname
    useEffect(() => {
        setCurrentNavItem(location.pathname);
    }, [location.pathname]);


    
    const GetCategories = (props) => {
        const categories = state?.categories;
        return (
            <>
                {categories?.all_sports?.map((category, idx) => (
                    <div className="inline mobile-categories-item px-2 py-2 my-2 bg-white border border-gray-100 rounded-md" style={{maxWidth:"100px"}}>
                        <img src={getSportImageIcon(category?.sport_name)} alt="" className="mx-auto mobile-second-nav-icon" />
                        <div className="text-center mobile-menu-item-wrap">{category?.sport_name}</div>
                    </div>
                ))}
            </>
        )
    }
    return (
        <>
            {/* condition to render categories is here */}
            {location.pathname.includes("sport") || location.pathname === "/" ? <GetCategories />: ""}
        </>
    )
}

export default React.memo(MobileCurrentNavItems);