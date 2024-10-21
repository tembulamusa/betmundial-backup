import React, {useEffect, useState} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Link} from "react-router-dom";
import SideBar from "../../sidebar/awesome/Sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Notify from "../../utils/Notify";
import {Button, ButtonGroup} from "react-bootstrap";

const Casino = (props) => {

    const [user] = useState(getFromLocalStorage("user"));

    const [categories, setCategories] = useState([])

    const [games, setGames] = useState([])

    const fetchGames = async (category = 'vs') => {
        let endpoint = "/v1/casino-games?game-type-id=" + category
        let method = "GET"
        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setCategories(result.types)
                setGames(result.data)
                setLocalStorage('category_games', result.data)
            }
        });
    }

    const getCategoryGames = (category) => {
        setGames([])
        fetchGames(category?.game_type_id)
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

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <>
        <h1>Casino</h1>
        <div className={'row p-2 '}>
            {games?.map((game) => (                 
                    <div className={'col-md-2'}>    
                        <div                        
                            className={'mt-1 mb-1 d-flex flex-column shadow-lg'} >
                            <div onClick={() => launchGame(game?.game_id, 1)}
                                    className=""       
                                    key={game.game_id}>
                                <LazyLoadImage src={`${game.game_icon}`}
                                                className={'virtual-game-image'}/>
                                <p className={'p-2 bold text-elipsis'}>{game?.game_name}</p>
                            </div>                  
                            <div className="overlay shadow-sm row">
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="warning" 
                                            onClick={() => launchGame(game?.game_id)}>
                                        Demo   
                                    </Button>       
                                    <Button style={{background:'#902065', border:"none"}}
                                            onClick={() => launchGame(game?.game_id, 1)}>
                                        Play Live   
                                    </Button>       
                                </ButtonGroup>      
                            </div>                  
                        </div>                      
                    </div>                          
                                                    
                )                                   
            )}                                      

        </div>
        </>
    )

}


export default Casino;
