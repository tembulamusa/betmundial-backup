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
        {name: "home", icon:""}
    ]

    return (

        <>
            <Container id="navbar-collapse-main"
                       className={`d-sm-flex d-flex flex-row  header-menu `}>
                <ListGroup as="ul" xs="12" horizontal className={`font-bold nav navbar-nav og d-flex ale ss  col-lg-12 col-md-12 col-sm-12 change-display ${searching && "!hidden"}`}>
                    
                    <li className={pathname === '/' ? "active" : ''}>
                        <Link className="cg fm ox anl url-link not-selectable " to={"/"} title="Home"><span className=" space-icons"><FontAwesomeIcon icon={HomeIcon} /> </span> Home</Link>
                    </li>
                    
                </ListGroup>

            </Container>
        </>
    )
}

export default React.memo(BigIconMenu)