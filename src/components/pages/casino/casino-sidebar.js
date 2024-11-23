import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/store";
import { getFromLocalStorage } from "../../utils/local-storage";
import { useNavigate } from "react-router-dom";

const CasinoSidebar = (props) => {
    const [state, dispatch] = useContext(Context);
    const [categories, setCategories] = useState([]); 
    const [providers, setProviders] = useState([]);
    const navigate = useNavigate();
    
    const getSportImageIcon = (sport_name) => {

        let sport_image;
        try {
            sport_image = require(`../../../assets/img/casino/icons/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../assets/img/casino/icons/${"SetDefault"}.svg`);
        }
        return sport_image;
    }


    // load categories and providers
    useEffect(() => {
        setCategories(state?.casinofilters?.categories);
        setProviders(state?.casinofilters?.providers);
    }, [state?.casinofilters]);

    useEffect(() => {
        let availableFilters = getFromLocalStorage("casinofilters");
        if (availableFilters) {
            dispatch({type:"SET", key:"casinofilters", payload:availableFilters});
        }
    }, [])
    const filterGames = (filterName, filterItem) => {
        let payload = {filterType: "category", category: filterItem}
        if(filterName == "provider") {
            if(filterItem?.name.toLowerCase() == "surecoin") {
               navigate("/surecoin") 
            }
            payload = {filterType: "provider", provider: filterItem}
        }
        dispatch({type:"SET", key:"casinogamesfilter", payload: payload})
    }

    const Favorites = (props) => {

        return (
            <div className="pt-3 casino-list-block menu-card rounded-lg  capitalize">
                    <ul className="casino-sidebar-items">
                    <li key={"all-" + 23} 
                        className={`cursor-pointer menu-item capitalize` }
                        onClick={() => filterGames("all", "all")}>
                        <img  src={getSportImageIcon('home')} className="casino-icon" alt=""/>{"All games"}
                    </li>
                    <li key={"all-" + 24}
                        className={`cursor-pointer menu-item capitalize` }
                        onClick={() => filterGames("popular", "popular")}>
                        <img  src={getSportImageIcon('popular')} className="casino-icon" alt=""/>{"Popular"}
                    </li>
                </ul>
            </div>
        )
    }

    const CasinoCategories = (props) => {
        return (
            <>
                <div className="casino-list-block menu-card rounded-lg  capitalize">
                    <ul className="casino-sidebar-items">
                        <h1 className="my-4 mt-2 text-2xl font-[400] casino-class-header">Categories</h1>
                        {categories?.map((category, idx) => (
                                <>
                                <li key={"categories-" + idx} 
                                    className={`${state?.casinogamesfilter?.category == category?.id && 'active'} cursor-pointer menu-item` }
                                    onClick={() => filterGames("category", category)}>
                                    <img  src={getSportImageIcon(category.name)} className="casino-icon" alt=""/>{category?.name}
                                </li>
                                </>
                            ))}
                    </ul>
                </div>
            </>
        )
    }

    const CasinoProviders = (props) => {

        return (
            <>
                <div className="casino-list-block menu-card rounded-lg">
                    <ul className="casino-sidebar-items">
                    <h1 className="mb-4 text-2xl font-[400] casino-class-header">Providers</h1>
                    {providers?.map((provider, idx) => (
                        <li key={"providers-" + idx} 
                            className={`${state?.casinogamesfilter?.provider == provider?.id && 'active'} cursor-pointer menu-item` }
                            onClick={() => filterGames("provider", provider)}>
                            <img  src={getSportImageIcon(provider.name)} className="casino-icon" alt=""/>{provider?.name}
                        </li>))
                    }
                    </ul>
                </div>
            </>
        )
    }
    return (
        <div className="casino-sidebar ml-2">
            <h1 className="mb-3 bg-white pt-4 pb-3  text-4xl px-3 text-gray-600 font-[600] border-b border-gray-200">Casino</h1>
            <Favorites />
            <CasinoCategories />
            <CasinoProviders />
        </div>
    )
}

export default React.memo(CasinoSidebar);