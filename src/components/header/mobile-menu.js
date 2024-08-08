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
            <a href='/'>
              <FontAwesomeIcon icon={HomeIcon} /> Home
            </a>
          </li>
          <li>
            <a href='/live'>
              <FontAwesomeIcon icon={faVideo} /> Live Games
            </a>
          </li>
          {/* <li>
            <a href='/'>
              <FaHome className='inline-block'/>Aviator
            </a>
          </li> */}
          {/* <li>
            <a href='/'>
              <FaHome className='inline-block'/>Casino
            </a>
          </li>
          <li>
            <a href='/'>
              <FaHome className='inline-block'/>Virtuals
            </a>
          </li> */}
          <li>
            <a href='/jackpot'>
              <FontAwesomeIcon icon={faCoins} />Jackpots
            </a>
          </li>
          <li>
            <a href='/'>
              <FontAwesomeIcon icon={faMobile} />App
            </a>
          </li>
          <li>
            <a href='/'>
              <FontAwesomeIcon icon={faVolumeUp} />Promotions
            </a>
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
            <a href='/deposit'>
              <FontAwesomeIcon icon={faCoins} />Deposit
            </a>
          </li>
          <li>
            <a href='/withdraw'>
              <FontAwesomeIcon icon={faDollarSign} />Withdraw
            </a>
          </li>
          <li>
            <a href='/history'>
              <FontAwesomeIcon icon={faCalendarCheck} />Bet History
            </a>
          </li>
          <li>
            <a href='/transactions'>
              <FontAwesomeIcon icon={faClock} />Transaction History
            </a>
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