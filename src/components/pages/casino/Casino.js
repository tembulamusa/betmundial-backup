import React, {useContext, useEffect, useState} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Link} from "react-router-dom";
import SideBar from "../../sidebar/awesome/Sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Notify from "../../utils/Notify";
import {Button, ButtonGroup} from "react-bootstrap";
import CasinoCarousel from '../../carousel/casino-carousel';
import { Context } from '../../../context/store';
import { ShimmerTable } from "react-shimmer-effects";
import NoEvents from '../../utils/no-events';
import CategoryListing from './category-listing';

const Casino = (props) => {

    const [user] = useState(getFromLocalStorage("user"));
    const [categories, setCategories] = useState([])
    const [state, dispatch] = useContext(Context);
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [fetching, setFetching] = useState(false);

    const fetchCasinoGames = async () => {
        setFetching(true);
        let endpoint = "games-list";

        // change fetch if there's a filter
        if (state?.casinogamesfilter?.filterType == "category") {
            endpoint = `game-type/games-list/${state?.casinogamesfilter?.category?.id}`
        }

        await makeRequest({url: endpoint, method: "GET", api_version:"faziCasino"}).then(([status, result]) => {
            if (status == 200) {
                if (state?.casinogamesfilter) {
                   let newGames = {...games, games: result}
                   setGames(newGames);
                //    dispatch({type:"SET", key:"casinogames", payload: result});
                } else {
                    setGames(result);
                    dispatch({type:"SET", key:"casinogames", payload: result});
                    setLocalStorage('casinogames', result)
                }
                
            }
        });
        setTimeout(() => {setFetching(false)}, 3000)
    }

    const getCategoryGames = (category) => {
        setGames(null)
        fetchCasinoGames()
    }

    const showLoginNotification = () => {
        let message = {
            status: 500,
            message: "Please Log In to continue."
        }
        Notify(message)
    }

    const launchGame = (game_id, live=0) => {

        if (user?.token) {
            return window.location.href = `/virtuals/launch/${game_id}?live=${live}`
        }

        return showLoginNotification()
    }

    const getFaziGamesFromLocalStorage = () => {
        let hasFaziGames = false;
        let localGames = getFromLocalStorage("casinogames");
        if (localGames && Object.keys(localGames) > 0) {
            setGames(localGames);
            hasFaziGames = true;
        }

        return hasFaziGames
    }

    useEffect(() => {
        // Get Fazi Games from local storage else fetch them
        let localGames = getFromLocalStorage("casinogames");
        dispatch({type:"SET", key:"bodyheaderspacing", payload:"no-body-header-spacing"});
        if (localGames ) {

            if (Object.keys(localGames).length > 0) {
                setGames(localGames);
                dispatch({type:"SET", key:"casinogames", payload: localGames});
                dispatch({type:"SET", key:"casinoactiveitem", payload: {type:'category', id:1}});
            } else {
                fetchCasinoGames();
            }
        } else {
            fetchCasinoGames();
        }
        return () => {dispatch({type:"DEL", key:"bodyheaderspacing"})}
    }, []);

    useEffect(() => {
        fetchCasinoGames();
    }, [state?.casinogamesfilter])

    return (
        <>
        <CasinoCarousel />
        {/* <section className='casino-filter md:hidden'>
            <div className='filter-nav'>
                <ul className="filter-nav-list">
                    <li className='filter-item'>All games</li>
                    <li className='filter-item'>Popular</li>
                    <li className='filter-item'>New</li>
                    <li className='filter-item'>Tables</li>
                </ul>
            </div>
        </section> */}
        <div className={'casino-games-list'}>
            {games?.games?.length < 1 && <div>{fetching ? <ShimmerTable row={3}/> :<NoEvents message="Casino Games not found" />}</div>}
            {games?.games?.map((category, idx) => (                 
                <>                        
                    <CategoryListing games={category?.gameList} gamestype={category?.game_type}/>
                </> 
               )                                   
            )}                                    

        </div>
        </>
    )

}


export default Casino;
