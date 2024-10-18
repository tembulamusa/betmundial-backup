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
    faMobile,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import makeRequest from "../utils/fetch-request";
import { Link } from 'react-router-dom';

function MobileMenu() {
  const [show, setShow] = useState(false);
  const [state, ] = useContext(Context);
  const user = getFromLocalStorage("user");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const UserBalance = (props) => {
    return (
      <div class="bx">
        <div class="bx-1">BALANCE</div>
        <div class="bx-2 secondary-text">KSh. {state?.user?.balance}</div>
        <div class="bx-3"><div class="bx-3-1">Bonus: <span>KSh. {state?.user?.bonus_balance}</span></div></div></div>
    )
  }

  const CanvasBottom = (props) => {

    return (
      <div className='canvas-bottom'>
        <div className='bot1'>Dark Mode</div>
        <div className='bot-1'><Link to={"/logout"}>Logout</Link></div>
      </div>
    )
  }
  
  return (
    <span className="inline-block">
      
      <span className='font-[500] cursor-pointer'  onClick={handleShow} ><FontAwesomeIcon variant="toggle-menu"  icon={faUser}/> Profile</span>
      {/* <FaBars size={25}  className='inline-block'/> */}

      <Offcanvas placement="end" show={show} onHide={handleClose} className="header-account">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><FontAwesomeIcon variant="toggle-menu"  icon={faUser} className='mr-3'/>{state?.user?.msisdn}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='off-canvas'>
            {/* The  main menu*/}
            <div className='highlight-box'>
              <UserBalance />
            </div>


            <div className="cd"><div className="cd-l"><FontAwesomeIcon icon={faCoins} className='inline-block mr-3'/>Deposit</div>
            <div className="cd-l"><FontAwesomeIcon icon={faCoins} className='mr-3 inline-block' />Withdraw winnings</div><div className="cd-l">Confirm MPESA Deposit status</div><div className="cd-l">Transfer Money to Casino</div><a href="/bets" className="cd-l">My bets</a><a href="/promotions" className="cd-l">Promotions</a><a href="/exclude" className="cd-l">Exclude myself from betting</a></div>
        
          <div className=''><CanvasBottom /></div>
        </Offcanvas.Body>
      </Offcanvas>
    </span>
  );
}

export default MobileMenu;