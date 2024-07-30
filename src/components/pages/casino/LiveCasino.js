import React, {useEffect, useState} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import SideBar from "../../sidebar/awesome/Sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Notify from "../../utils/Notify";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChair, faCircle, faDotCircle} from "@fortawesome/free-solid-svg-icons";

const LiveCasino = (props) => {

    const [dgaConnected, setDgaConnected] = useState(false)
    const [tableKeys, setTableKeys] = useState({})
    const [tableData, setTableData] = useState([])

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

    const showLoginNotification = () => {
        let message = {
            status: 500,
            message: "Please Log In to continue."
        }
        Notify(message)
    }

    const launchGame = (game_id) => {

        if (user?.token) {
            return window.location.href = `/virtuals/launch/${game_id}?live=1`
        }

        return showLoginNotification()
    }

    const initializeDGAEvents = async () => {
        window.dga.onWsError = (err) => {
            // console.log("Error connecting DGA ws socket", err)
            setDgaConnected(false)
        }
        window.dga.onConnect = () => {
            // console.log("Successfully Connected DGA ws socket")
            setDgaConnected(true)
        }
        window.dga.onMessage = (data) => {
            let dataResult = []
            if (data.hasOwnProperty('tableKey')) {
                data?.tableKey?.forEach((key) => {
                    let result = {
                        id: key,
                        data: {}
                    }
                    dataResult.push(result)
                })
                // console.log("Table result is ", dataResult)
                setTableKeys(dataResult)
            } else {
                let localData = tableData
                // console.log(data)
                let index = tableData.findIndex((item) => item.tableId === data?.tableId)
                // console.log("Index found as ", index)
                if (index !== -1) {
                    // exists, updating request received...
                    localData[index] = data
                } else {
                    let length = localData.length
                    if (length === 0) {
                        localData[0] = data
                    } else {
                        localData[length] = data
                    }
                }
                setTableData([...localData])

                console.log(localData)
            }
        }
    }

    const initializeDGA = async () => {
        try {
            let url = "prelive-dga0.pragmaticplaylive.net/ws?key=testKey&stylename=lmntgmng_bethipo";
            window.dga.connect(url)
            // console.log("Connected to DGA Web Socket on PP")
        } catch (e) {
            // console.log("Error connecting to DGA Web Socket ", e)
        }
    }

    const getCasinoGames = () => {
        // console.log("DGA connnected", dgaConnected)
        if (dgaConnected) {
            window.dga.available('ppcdk00000010157')
        }
    }

    const getGamesForTableKeys = () => {
        // console.log("Table keys are ", typeof tableKeys)
        Object.values(tableKeys).forEach((data, key) => {
            window.dga.subscribe('ppcdk00000010157', data?.id, 'Ksh')
        })
    }

    useEffect(() => {
        initializeDGA().then(() => {
            initializeDGAEvents()
        })
        //fetchGames()
    }, [])

    useEffect(() => {
        getCasinoGames()
    }, [dgaConnected])

    useEffect(() => {
        getGamesForTableKeys()
    }, [tableKeys])

    useEffect(() => {
        // console.log("Table Data changed", tableData)
    }, [tableData])


    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col">
                                    <div className={'row text-white p-2 shadow-lg'}>
                                        <div className="row">
                                            {tableData?.map((tableDataItem) => (
                                                <div className={'col-md-3 p-2'}
                                                     onClick={() => launchGame(tableDataItem?.tableId)}>
                                                    <div
                                                        className="col shadow-lg p-2 cursor-pointer virtual-game-container"
                                                        style={{borderRadius: "4px"}}>
                                                        <div className="col text-uppercase text-center bold" style={{
                                                            color: "#24367e"
                                                        }}>
                                                            {tableDataItem?.tableName}
                                                        </div>
                                                        <LazyLoadImage src={`${tableDataItem?.tableImage}`}
                                                                       style={{borderRadius: "4px"}}
                                                                       className={'casino-game-image'}/>
                                                        <div className="row d-flex flex-column">
                                                            <div className="col">
                                                                <div className="d-flex flex-row">
                                                                    <div className={'col-md-6 flex-row'}>
                                                                        <FontAwesomeIcon icon={faChair}
                                                                                         className={'text-warning'}/>
                                                                        <span style={{color:"#6082B6"}}>&nbsp;{tableDataItem?.totalSeatedPlayers} seats</span>
                                                                    </div>
                                                                    <div className={'col-md-6 text-end'} style={{color:"#6082B6"}}>
                                                                        <FontAwesomeIcon icon={faCircle}
                                                                                         className={`${tableDataItem?.tableOpen ? 'text-success' : 'text-danger'}`}/>
                                                                        {tableDataItem?.tableOpen ? ' Table Open' : ' Table Closed'}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                     className={'mt-1 flex-row row'}>
                                                                    <div className={'col flex-column text-secondary'}>
                                                                        <div className={'small'}>
                                                                            Max Bet
                                                                        </div>
                                                                        <div>
                                                                            {tableDataItem?.tableLimits?.maxBet}
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={'col flex-column text-center text-secondary'}>
                                                                        <div className={'small'}>
                                                                            Max Players
                                                                        </div>
                                                                        <div>
                                                                            {tableDataItem?.tableLimits?.maxPlayers}
                                                                        </div>

                                                                    </div>
                                                                    <div
                                                                        className={'col flex-column text-end text-secondary'}>
                                                                        <div className={'small'}>
                                                                            Min Bet
                                                                        </div>
                                                                        <div>
                                                                            {tableDataItem?.tableLimits?.minBet}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <button className={'btn btn-lg col-md-12'} style={{
                                                                    background: "#902065"
                                                                }}>
                                                                    <strong className={'text-white'}>
                                                                        Play {tableDataItem?.tableName}
                                                                    </strong>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}


export default LiveCasino;

