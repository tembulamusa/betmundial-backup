import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/store";
import { getFromLocalStorage } from "../../utils/local-storage";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const CasinoSidebar = (props) => {
    const [state, dispatch] = useContext(Context);
    const [categories, setCategories] = useState([]); 
    const [providers, setProviders] = useState([]);
    const navigate = useNavigate();
    const [searchParams, ] = useSearchParams();
    const loc = useLocation();
    
    const getSportImageIcon = (sport_name) => {

        let sport_image;
        try {
            sport_image = require(`../../../assets/img/casino/icons/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../assets/img/casino/icons/${"SetDefault"}.svg`);
        }
        return sport_image;
    }

    useEffect(() => {
        console.log("I clicked on game", searchParams.get("selected-category"))
    }, [searchParams.get("selected-category")])
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
                            <a href={"/casino"} className="inline-block" >
                                <img  src={getSportImageIcon('home')} className="casino-icon inline-block" alt=""/>{"All games"}
                            </a>
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
                    <h1 className="my-2 mt-2 text-2xl font-[400] casino-class-header">Categories</h1>
                    <ul className="casino-sidebar-items">
                        {categories?.map((category, idx) => (
                                <>
                                <Link to={`/casino?category=${category?.name?.toLowerCase()}&&id=${category?.id}`} key={"categories-" + idx} 
                                    className={`${state?.casinogamesfilter?.category?.id == category?.id && 'active'} cursor-pointer menu-item block py-2 boder-b border-gray-100` }>
                                    <img  src={getSportImageIcon(category.name)} className="casino-icon  inline-block" alt=""/>{category?.name}
                                </Link>
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
                    <h1 className="mb-2 text-2xl font-[400] casino-class-header">Providers</h1>
                    <ul className="casino-sidebar-items">
                    {providers?.map((provider, idx) => (
                        <Link to={provider?.name?.toLowerCase() == "surecoin" ? "/surecoin" : `/casino?provider=${provider?.name?.split(" ").join("-")}&&id=${provider?.id}`} 
                            className={`${loc?.pathname?.includes(provider?.name) && 'active'} cursor-pointer menu-item block py-2` }>
                            <img  src={getSportImageIcon(provider.name)} className="casino-icon inline-block" alt=""/>{provider?.name}
                        </Link>))
                    }
                    </ul>
                </div>
            </>
        )
    }
    return (
        <div className="casino-sidebar ml-2">
            <h1 className="mb-2 bg-white pt-2 pb-3  text-4xl px-3 text-gray-600 font-[600] border-b border-gray-200">Casino</h1>
            <Favorites />
            <CasinoCategories />
            <CasinoProviders />
        </div>
    )
}

export default React.memo(CasinoSidebar);