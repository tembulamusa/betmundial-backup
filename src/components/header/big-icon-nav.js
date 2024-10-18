import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome as HomeIcon,
    faSearch,
    faPrint,
    faQuestionCircle,
    faClock,
    faVideo,
    faCoins,
    faVolumeUp
} from '@fortawesome/free-solid-svg-icons';

const BigIconMenu = () => {
    const pathname = window.location.pathname;


    const linkItems = [
        {name: "home", icon:"home.png", link:"/", parentTo:null},
        {name: "live", icon:"live.jpg", link:"/live", parentTo:null},
        {name: "jackpot", icon:"jackpot.jpg", link:"/jackpot", parentTo:null},
        {name: "aviator", icon:"aviator.png", link:"/aviator", parentTo:null},
        {name: "casino", icon:"casino3.jpg", link:"/casino", parentTo:null},
        {name: "sport", icon:"sport.jpg", link:null, parentTo:"sportscategories"},
        {name: "virtuals", icon:"virtual.jpg", link:"/virtuals", parentTo:null},
        {name: "league", icon:"sure-league.jpg", link:"/sure-league", parentTo:null},
        {name: "promotions", icon:"promotions.jpg", link:"/promotions", parentTo:null},
        {name: "livescore", icon:"livescore.jpg", link:"/", parentTo:null},        
        {name: "basketball", icon:"basketball.jpg", link:"/", parentTo:null},
        {name: "cricket", icon:"cricket.jpg", link:"/", parentTo:null},
        {name: "tennis", icon:"tennis.jpg", link:"/", parentTo:null},       
        {name: "rugby", icon:"rugby.jpg", link:"/", parentTo:null},
        {name: "ice hockey", icon:"icehockey.jpg", link:"/", parentTo:null},
        {name: "aussie rules", icon:"aussie.png", link:"/", parentTo:null},
        {name: "a.football", icon:"americanfootball.png", link:"/", parentTo:null},
        {name: "darts", icon:"darts.png", link:"/", parentTo:null},
        {name: "boxing", icon:"boxing.jpg", link:"/", parentTo:null},
        {name: "handball", icon:"handball.jpg", link:"/", parentTo:null},        
        {name: "baseball", icon:"baseball.jpg", link:"/", parentTo:null},
        {name: "volleyball", icon:"volleyball.jpg", link:"/", parentTo:null},
        {name: "mma", icon:"mma.jpg", link:"/", parentTo:null},
        {name: "floorball", icon:"floorball.jpg", link:"/", parentTo:null},
        {name: "print", icon:"print.jpg", link:"/print-matches", parentTo:null},
        {name: "app", icon:"app.jpg", link:"/app", parentTo:null},
    ]

    const getSportImageIcon = (sport_name) => {

        let default_img = 'sure'
        let sport_image;
        try {
            sport_image = require(`../../assets/img/header-images/${sport_name}`);
        } catch (error) {
            sport_image = require(`../../assets/img/header-images/default.png`);
        }
        return sport_image
    }
    return (

        <>
            <Container id="navbar-collapse-main"
                       className={`d-sm-flex d-flex flex-row  header-menu `}>
                <ListGroup as="ul" xs="12" horizontal className={`nav navbar-nav og d-flex ale ss  col-lg-12 col-md-12 col-sm-12 change-display`}>
                    
                    {linkItems.map((item, idx) => (
                        <>
                            <li className={`${pathname === item.link ? "active" : ''} menu-item text-center capitalize`}>
                                <Link className="" to={item.link} title={item.name}>
                                    <div className="menu-icon"><img src={getSportImageIcon(item.icon)} alt={item.name}/></div>
                                    <div className="menu-name">{item.name}</div>
                                </Link>
                            </li>   
                        </>
                    ))}
                    
                    
                </ListGroup>

            </Container>
        </>
    )
}

export default React.memo(BigIconMenu)