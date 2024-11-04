import React, { useContext, useEffect } from "react";
import { Context } from "../../../context/store";
import { getFromLocalStorage } from "../../utils/local-storage";

const CasinoSidebar = (props) => {
    const {categories, providers} = props;
    const [state, dispatch] = useContext(Context);

    const NewItemsLinks = (props) => {

        return (
            <div className="casino-list-block menu-card">
                <ul className="casino-sidebar-items">
                    <li className="menu-item">New</li>
                </ul>
            </div>
        )
        
    }
    const getSportImageIcon = (sport_name) => {

        let sport_image;
        try {
            sport_image = require(`../../../assets/img/casino/icons/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../assets/img/casino/icons/Default.svg`);
        }
        return sport_image;
    }

    const filterGames = (filterName, filterItem) => {
        let payload = {filterType: "category", category: filterItem}
        if(filterName == "provider") {
            payload = {filterType: "provider", provider: filterItem}
        }
        dispatch({type:"SET", key:"casinogamesfilter", payload: payload})
    }
    const CasinoCategories = (props) => {
        return (
            <>
                <div className="casino-list-block menu-card">
                    <ul className="casino-sidebar-items">
                        <h1 className="my-4 text-2xl font-[400] text-gray-400">Categories</h1>
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
                <div className="casino-list-block menu-card">
                    <ul className="casino-sidebar-items">
                    <h1 className="my-2 text-2xl font-[400] text-gray-400">Providers</h1>
                    {providers?.map((provider, idx) => (
                            <li key={"providers-"+idx} className="menu-item">{provider?.name}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }
    return (
        <div className="casino-sidebar pt-5 px-4">
            <NewItemsLinks />
            <CasinoCategories />
            <CasinoProviders />
        </div>
    )
}

export default React.memo(CasinoSidebar);