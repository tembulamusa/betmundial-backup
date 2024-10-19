import React, { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/local-storage';
import { Context } from '../../context/store';
import { IoMdLogOut } from "react-icons/io";
import { BiMoneyWithdraw, BiTransfer } from "react-icons/bi";
import { FaGifts, FaRegUser } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import { IoListCircleOutline, IoMoon } from "react-icons/io5";
import { LuSunMedium } from "react-icons/lu";
import { MdCancel } from "react-icons/md";


function MobileMenu() {
  const [show, setShow] = useState(false);
  const [state] = useContext(Context);
  const user = getFromLocalStorage("user");
  const [darkMode, setDarkMode] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const UserBalance = () => (
    <div className="bx">
      <div className="bx-1">BALANCE</div>
      <div className="bx-2 secondary-text">KSh. {state?.user?.balance}</div>
      <div className="bx-3">
        <div className="bx-3-1">Bonus: <span>KSh. {state?.user?.bonus_balance}</span></div>
      </div>
    </div>
  );

  const CanvasBottom = () => {
    const [isHoveredMode, setIsHoveredMode] = useState(false);
    const [isHoveredLogout, setIsHoveredLogout] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };

    const iconStyle = {
      fontSize: '24px', 
    };
  
    const responsiveIconStyle = {
      fontSize: '18px', 
    };
  
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          justifyContent: 'space-between',
          padding: '10px',
          borderTop: '1px solid #e9ecef',
          margin: '20px',
          marginBottom: '0',
          boxSizing: 'border-box',
          borderWidth: '0',
          borderStyle: 'solid',
          borderColor: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: isHoveredMode ? 'white' : 'transparent', 
            transition: 'background-color 0.3s',
            padding: '5px', 
            borderRadius: '5px', 
          }}
          onMouseEnter={() => setIsHoveredMode(true)}
          onMouseLeave={() => setIsHoveredMode(false)}
          onClick={toggleDarkMode}
        >
           {darkMode ? (
          <LuSunMedium style={window.innerWidth < 768 ? responsiveIconStyle : iconStyle} />
        ) : (
          <IoMoon style={window.innerWidth < 768 ? responsiveIconStyle : iconStyle} />
        )}
        </div>
  
        <Link
          to="/logout"
          style={{
            color: '#dc3545',
            textDecoration: 'none',
            backgroundColor: isHoveredLogout ? 'white' : 'transparent', 
            transition: 'background-color 0.3s', 
            padding: '5px', 
            borderRadius: '5px', 
            fontSize: '20px', 
          }}
          onMouseEnter={() => setIsHoveredLogout(true)}
          onMouseLeave={() => setIsHoveredLogout(false)}
          onMouseOver={(e) => (e.currentTarget.style.color = '#c82333')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#dc3545')}
        >
          <IoMdLogOut style={{ marginRight: '8px' }} />
          Logout
        </Link>
      </div>
    );
  };
  
  return (
    <span className="inline-block" style={{ height: 'auto' }}>
      <span className='font-[500] cursor-pointer' onClick={handleShow}>
        <FaRegUser /> Profile
      </span>

      <Offcanvas
        placement="end"
        show={show}
        onHide={handleClose}
        className="header-account"
        style={{ maxHeight: '80vh', height: 'auto' }} 
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <FaRegUser className='mr-3' /> {state?.user?.msisdn}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='off-canvas' style={{ marginBottom: '20px', overflowY: 'auto' }}>
          {/* The main menu */}
          <div className='highlight-box'>
            <UserBalance />
          </div>

          <div className="cd">
            <div className="cd-l"><GiTwoCoins className='inline-block mr-3' /> Deposit</div>
            <div className="cd-l"><BiMoneyWithdraw className='mr-3 inline-block' /> Withdraw winnings</div>
            <div className="cd-l"><FaCheckToSlot className='mr-3 inline-block' /> Confirm MPESA Deposit status</div>
            <div className="cd-l"><BiTransfer className='mr-3 inline-block' /> Transfer Money to Casino</div>
            <Link to="/bets" className="cd-l"><IoListCircleOutline className='mr-3 inline-block' /> My bets</Link>
            <Link to="/promotions" className="cd-l"><FaGifts className='mr-3 inline-block' /> Promotions</Link>
            <Link to="/exclude" className="cd-l"><MdCancel className='mr-3 inline-block' /> Exclude myself from betting</Link>
          </div>

          <CanvasBottom />
        </Offcanvas.Body>
      </Offcanvas>
    </span>
  );
}

export default MobileMenu;
