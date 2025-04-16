import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import { 
    useParams,
    useSearchParams
} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Stack} from "react-bootstrap";

const GamePlay = (props) => {
    const {game_id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const live = searchParams.get("live");
    const [gameUrl, setGameUrl] = useState('')

    const [games] = useState(getFromLocalStorage('category_games'))

    const [isLoggedIn] = useState(getFromLocalStorage('user'))

    const [gameUrlLoaded, setGameUrlLoaded] = useState(false)

    const createPlayer = async () => {

        let endpoint = '/v1/casino/create/player'

        let method = "GET"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status == 200) {
            }
        });
    }

    const startGame = async (game_id) => {

        let endpoint = live == '0' 
            ? `/v1/casino/game/demo-url?game-id=${game_id}` 
            : `/v1/casino/game/url?game-id=${game_id}`;

        let method = "GET"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status == 200) {
                setGameUrl(result?.result.gameURL)
                setGameUrlLoaded(true)

            }
        });
    }

    const CategoryGames = () => (

        <Stack direction="horizontal" gap={1} style={{overflow: "scroll"}}
               className={'d-flex justify-content-center w-100'}>
            { games &&
                games.map((game, index) => (
                    <LazyLoadImage
                        key={index}
                        onClick={() => startGame(game.game_id)}
                        style={{height: "50px", width: "60px", float: "left"}}
                        src={`${game.game_icon}`}
                        className={'virtual-game-image'}/>
                ))
            }
        </Stack>
    )

    useEffect(() => {
        isLoggedIn ?
            createPlayer().then(() => {
                startGame(game_id)
            }) :
            window.location.href = "/casino"

    }, [])
    return (
        <>
        <h1>Game play</h1>
        <div
            className={`col-md-12 ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
            <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                <Skeleton height={'100px'}/>
            </SkeletonTheme>
        </div>
        {gameUrlLoaded && <>
            <iframe className={'mt-3 shadow-lg'}
                src={gameUrl} title="Gadme" width={'100%'} height={'600px'} allowFullScreen={true} webkitAllowFullScreen={true} mozAllowFullScreen={true} ></iframe>
        </>}
        </>
    )
}

export default GamePlay
