import React, { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars, FaHome } from "react-icons/fa";
import { getFromLocalStorage } from '../utils/local-storage';
import { Context } from '../../context/store';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome as HomeIcon,
    faSearch,
    faPrint,
    faQuestionCircle,
    faTimes,
    faLaptop,
    faClock,
    faMagnet,
    faVideo,
    faCoins,
    faMagic, faInfo, faChessBoard, faDice,
    faVolumeUp,
    faCalendarCheck,
    faDollarSign,
    faMobile
} from '@fortawesome/free-solid-svg-icons';
import makeRequest from "../utils/fetch-request";
import { Link } from 'react-router-dom';

function MobileMenu() {
  const [show, setShow] = useState(false);
  const [state, ] = useContext(Context);
  const user = getFromLocalStorage("user");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const SurebetMenu = (props) => {
    return (
      <>
        <ul className='canvas-links'>
          <li>
            <Link to='/'>
              <FontAwesomeIcon icon={HomeIcon} /> Home
            </Link>
          </li>
          <li>
            <Link to='/live'>
              <FontAwesomeIcon icon={faVideo} /> Live Games
            </Link>
          </li>
          {/* <li>
            <Link to='/'>
              <FaHome className='inline-block'/>Aviator
            </Link>
          </li> */}
          {/* <li>
            <Link to='/'>
              <FaHome className='inline-block'/>Casino
            </Link>
          </li>
          <li>
            <Link to='/'>
              <FaHome className='inline-block'/>Virtuals
            </Link>
          </li> */}
          <li>
            <Link to='/jackpot'>
              <FontAwesomeIcon icon={faCoins} />Jackpots
            </Link>
          </li>
          <li>
            <Link to='/'>
              <FontAwesomeIcon icon={faMobile} />App
            </Link>
          </li>
          <li>
            <Link to='/'>
              <FontAwesomeIcon icon={faVolumeUp} />Promotions
            </Link>
          </li>
        </ul>
      </>
    )
  }
  const AccountMenu = (props) => {
    return (
      <>
        <ul className='canvas-links'>
          <li>
            <Link to='/deposit'>
              <FontAwesomeIcon icon={faCoins} />Deposit
            </Link>
          </li>
          <li>
            <Link to='/withdraw'>
              <FontAwesomeIcon icon={faDollarSign} />Withdraw
            </Link>
          </li>
          <li>
            <Link to='/my-bets'>
              <FontAwesomeIcon icon={faCalendarCheck} />Bet History
            </Link>
          </li>
          <li>
            <Link to='/transactions'>
              <FontAwesomeIcon icon={faClock} />Transaction History
            </Link>
          </li>
        </ul>
      </>
    )
  }
  return (
    <span class="inline-block">
      
      <FaBars variant="toggle-menu" size={25} onClick={handleShow} className='inline-block'/>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>SureBet</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {/* The  main menu*/}
            <div className='off-canvas-content-box'>
              <SurebetMenu />
            </div>

            <hr className='canvas-content-box-separator'/>
            {/* Account Menu */}
            <div className='off-canvas-content-box'>
              <h1 className='title font-bold uppercase text-gray-700 mb-2'>Account</h1>
              <AccountMenu />
            </div>

        </Offcanvas.Body>
      </Offcanvas>
    </span>
  );
}

export default MobileMenu;