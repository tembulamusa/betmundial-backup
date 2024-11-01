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
        {name: "home", icon:"home.svg", link:"/", parentTo:null},
        {name: "live", icon:"livescore.svg", link:"/live", parentTo:null},
        {name: "jackpot", icon:"jackpot.svg", link:"/jackpot", parentTo:null},
        {name: "aviator", icon:"aviator.svg", link:"/aviator", parentTo:null},
        {name: "surecoin", icon:"surecoin.svg", link:"/surecoin", parentTo:null},
        {name: "casino", icon:"casino.svg", link:"/casino", parentTo:null},
        {name: "sport", icon:"sports.svg", link:null, parentTo:"sportscategories"},
        {name: "virtuals", icon:"virtuals.svg", link:"/virtuals", parentTo:null},
        {name: "league", icon:"league.svg", link:"/sure-league", parentTo:null},
        {name: "promotions", icon:"promos.svg", link:"/promotions", parentTo:null},
        {name: "livescore", icon:"livescore.svg", link:"/#livescore", parentTo:null},        
        {name: "basketball", icon:"basketball.svg", link:"/#basketball", parentTo:null},
        {name: "cricket", icon:"cricket.svg", link:"/#cricket", parentTo:null},
        {name: "tennis", icon:"tennis.svg", link:"/#tennis", parentTo:null},       
        {name: "rugby", icon:"rugby.svg", link:"/#rugby", parentTo:null},
        {name: "ice hockey", icon:"icehockey.svg", link:"/#icehockey", parentTo:null},
        {name: "aussie rules", icon:"aussie.svg", link:"/#aussie", parentTo:null},
        {name: "a.football", icon:"americanfootball.svg", link:"/#afootball", parentTo:null},
        {name: "darts", icon:"darts.svg", link:"/#darts", parentTo:null},
        {name: "boxing", icon:"boxing.svg", link:"/#boxing", parentTo:null},
        {name: "handball", icon:"handball.svg", link:"/#handball", parentTo:null},        
        {name: "baseball", icon:"baseball.svg", link:"/#baseball", parentTo:null},
        {name: "volleyball", icon:"volleyball.svg", link:"/#volleyball", parentTo:null},
        {name: "mma", icon:"mma.svg", link:"/#mma", parentTo:null},
        {name: "floorball", icon:"floorball.svg", link:"/#floorball", parentTo:null},
        {name: "print", icon:"print.svg", link:"/print-matches", parentTo:null},
    ]

    const getSportImageIcon = (sport_name) => {

        let default_img = 'sure'
        let sport_image;
        try {
            //sport_image = require(`../../assets/img/svgicons/${sport_name}`);
            sport_image = require(`../../assets/img/colorsvgicons/${sport_name}`);
        } catch (error) {
            sport_image = require(`../../assets/img/svgicons/default.png`);           
        }
        return sport_image
    }
    return (

        <>
            <div id="navbar-collapse-main"
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

            </div>
        </>
    )
}

export default React.memo(BigIconMenu)