import React, { useContext, useEffect, useState, useRef } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Context } from '../../context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome as HomeIcon,
  faPrint,
  faQuestionCircle,
  faMobile,
  faCoins,
  faClock,
  faVideo,
  faInfo,
  faDice,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { FaMagic } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';

const HeaderNav = (props) => {
  const [, dispatch] = useContext(Context);
  const pathname = window.location.pathname;
  const [searching, setSearching] = useState(false);
  const searchInputRef = useRef(null);
  const [time, setTime] = useState();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false); 
  const [allItemsShown, setAllItemsShown] = useState(false); 
  const [showMoreButton, setShowMoreButton] = useState(true); 

  // Media query to check for mobile screen
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (searching === true) {
      navigate('/home');
    }
  }, [searching]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString().slice(10, 22));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateSearchTerm = (event) => {
    if (event.target.value.length >= 3) {
      dispatch({ type: 'SET', key: 'searchterm', payload: event.target.value });
    }
  };

  const showSearchBar = () => {
    setSearching(true);
  };

  const dismissSearch = () => {
    setSearching(false);
  };

  const toggleMoreItems = () => {
    setShowMore((prev) => !prev);
    
    if (!showMore) {
      setAllItemsShown(true);
      setShowMoreButton(false); 
    } else {
      setShowMoreButton(true);
    }
  };

  const handleClose = () => {
    setShowMore(false); 
    setShowMoreButton(true); 
    setAllItemsShown(false);
  };

  const iconBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isMobile ? '40px' : '50px', 
    height: isMobile ? '30px' : '40px',
    borderRadius: '10px',
    backgroundColor: '#e00c54',  
    //backgroundColor: '#28347c',
    color: 'white', 
    marginBottom: '8px',
  };

  const listItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: isMobile ? (allItemsShown ? '20%' : '70px') : (allItemsShown ? '100px' : '100px'),
    padding: '8px',
    cursor: 'pointer',
  };

  const menuItemStyle = {
    fontSize: isMobile ? '10px' : '12px',
     color: 'white',
  };

  const closeButtonStyle = {
    display: showMore ? 'block' : 'none',
    width: '70%',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    margin: '20px auto 0', 
  };

  return (
    <>
      <Container
        id="navbar-collapse-main"
        className={`d-sm-flex d-flex flex-row header-menu ${searching ? 'hidden' : 'd-block'}`}
      >
        <ListGroup
          as="ul"
          horizontal
          className={`font-bold nav navbar-nav d-flex align-items-center justify-content-around col-lg-12 col-md-12 col-sm-12 overflow-auto`}
          style={{ overflowX: 'auto' }} 
        >
          {/* Render all items for desktop view */}
          {!isMobile &&
            <>
              <li style={listItemStyle} className={pathname === '/' ? 'active' : ''}>
                <Link to="/" className="url-link not-selectable">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={HomeIcon} />
                  </div>
                  <span style={menuItemStyle}>Home</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/live' ? 'active' : ''}>
                <Link to="/live" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faVideo} />
                  </div>
                  <span style={menuItemStyle}>Live</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/jackpot' ? 'active' : ''}>
                <Link to="/jackpot" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faCoins} />
                  </div>
                  <span style={menuItemStyle}>Jackpot</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/app' ? 'active' : ''}>
                <Link to="/app" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faMobile} />
                  </div>
                  <span style={menuItemStyle}>APP</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/promotions' ? 'active' : ''}>
                <Link to="/promotions" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faVolumeUp} />
                  </div>
                  <span style={menuItemStyle}>Promotions</span>
                </Link>
              </li>

              <li style={listItemStyle}>
                <Link to="#" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faDice} />
                  </div>
                  <span style={menuItemStyle}>Casino</span>
                </Link>
              </li>

              <li style={listItemStyle}>
                <Link to="#" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faInfo} />
                  </div>
                  <span style={menuItemStyle}>Aviator</span>
                </Link>
              </li>

              <li style={listItemStyle}>
                <Link to="#" className="url-link">
                  <div style={iconBoxStyle}>
                    <FaMagic />
                  </div>
                  <span style={menuItemStyle}>Virtuals</span>
                </Link>
              </li>

              <li style={listItemStyle}>
                <Link to="#" className="url-link">
                  <div style={iconBoxStyle}>
                    <FaMagic />
                  </div>
                  <span style={menuItemStyle}>Live Score</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/print-matches' ? 'active' : ''}>
                <Link className="g url-link fix-print" to={"/print-matches"}>
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faPrint} />
                  </div>
                  <span style={menuItemStyle}>Print  Matches</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/how-to-play' ? 'active' : ''}>
                <Link className="url-link" to="/how-to-play">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </div>
                  <span style={menuItemStyle}>Help</span>
                </Link>
              </li>

              <li style={listItemStyle}>
                <div style={iconBoxStyle}>
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <span style={menuItemStyle}>{time}</span>
              </li>
            </>
          }

          {/* Mobile layout */}
          {isMobile && (
            <>
              {/* First four items */}
              <li style={listItemStyle} className={pathname === '/' ? 'active' : ''}>
                <Link to="/" className="url-link not-selectable">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={HomeIcon} />
                  </div>
                  <span style={menuItemStyle}>Home</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/live' ? 'active' : ''}>
                <Link to="/live" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faVideo} />
                  </div>
                  <span style={menuItemStyle}>Live</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/jackpot' ? 'active' : ''}>
                <Link to="/jackpot" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faCoins} />
                    </div>
                  <span style={menuItemStyle}>Jackpot</span>
                </Link>
              </li>

              <li style={listItemStyle} className={pathname === '/app' ? 'active' : ''}>
                <Link to="/app" className="url-link">
                  <div style={iconBoxStyle}>
                    <FontAwesomeIcon icon={faMobile} />
                  </div>
                  <span style={menuItemStyle}>APP</span>
                </Link>
              </li>

              {/* Other items (hidden if 'showMore' is false) */}
              {showMore && (
                <>
                  <li style={listItemStyle} className={pathname === '/promotions' ? 'active' : ''}>
                    <Link to="/promotions" className="url-link">
                      <div style={iconBoxStyle}>
                        <FontAwesomeIcon icon={faVolumeUp} />
                      </div>
                      <span style={menuItemStyle}>Promotions</span>
                    </Link>
                  </li>

                  <li style={listItemStyle}>
                    <Link to="#" className="url-link">
                      <div style={iconBoxStyle}>
                        <FontAwesomeIcon icon={faDice} />
                      </div>
                      <span style={menuItemStyle}>Casino</span>
                    </Link>
                  </li>

                  <li style={listItemStyle}>
                    <Link to="#" className="url-link">
                      <div style={iconBoxStyle}>
                        <FontAwesomeIcon icon={faInfo} />
                      </div>
                      <span style={menuItemStyle}>Aviator</span>
                    </Link>
                  </li>

                  <li style={listItemStyle}>
                    <Link to="#" className="url-link">
                      <div style={iconBoxStyle}>
                        <FaMagic />
                      </div>
                      <span style={menuItemStyle}>Virtuals</span>
                    </Link>
                  </li>

                  <li style={listItemStyle}>
                    <Link to="#" className="url-link">
                      <div style={iconBoxStyle}>
                        <FaMagic />
                      </div>
                      <span style={menuItemStyle}>Live Score</span>
                    </Link>
                  </li>

                  <li style={listItemStyle} className={pathname === '/print-matches' ? 'active' : ''}>
                    <Link className="g url-link fix-print" to={"/print-matches"}>
                      <div style={iconBoxStyle}>
                        <FontAwesomeIcon icon={faPrint} />
                      </div>
                      <span style={menuItemStyle}>Print  Matches</span>
                    </Link>
                  </li>

                  <li style={listItemStyle} className={pathname === '/how-to-play' ? 'active' : ''}>
                    <Link className="url-link" to="/how-to-play">
                      <div style={iconBoxStyle}>
                        <FontAwesomeIcon icon={faQuestionCircle} />
                      </div>
                      <span style={menuItemStyle}>Help</span>
                    </Link>
                  </li>

                  <li style={listItemStyle}>
                    <div style={iconBoxStyle}>
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                    <span style={menuItemStyle}>{time}</span>
                  </li>
                </>
              )}

              {/* "More" button to toggle visibility of extra items */}
              {showMoreButton && (
                <li style={listItemStyle} onClick={toggleMoreItems}>
                  <div style={iconBoxStyle}>
                    <FiMoreVertical />
                  </div>
                  <span style={menuItemStyle}>More</span>
                </li>
              )}
            </>
          )}
          {/* Close button for mobile view */}
          {isMobile && (
            <button onClick={handleClose} style={closeButtonStyle}>
              Close
            </button>
          )}
        </ListGroup>

        
      </Container>

      {/* Search Bar Handling */}
      {searching && (
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search..."
            onChange={updateSearchTerm}
            ref={searchInputRef}
            className="search-input"
          />
          <button onClick={dismissSearch} className="close-search">
            X
          </button>
        </div>
      )}
    </>
  );
};

export default HeaderNav;

