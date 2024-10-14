import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FaDice, FaFutbol, FaGift, FaAviato, FaGamepad, FaFireAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Breakfast from '../../assets/img/banner/carousel/breakfast.png';
import App from '../../assets/img/banner/carousel/app.png';
import Sharebet from '../../assets/img/banner/carousel/Sharebet.png';
import Tick from '../../assets/img/banner/carousel/Tick.png';
import Epl from '../../assets/img/banner/carousel/epl.png';
import Live from '../../assets/img/banner/carousel/Live-Betting.png';


const CarouselLoader = () => {
    const isMobile = window.innerWidth <= 768;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [betOutcome, setBetOutcome] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleBet = (outcome) => {
        setBetOutcome(outcome);
        alert(`You bet on ${outcome === '1' ? 'Manchester United' : outcome === 'X' ? 'Draw' : 'Liverpool'}!`);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const carouselItems = [
        { src: Breakfast, alt: 'Breakfast', link: '/breakfast' },
        { src: App, alt: 'App', link: '/app' },
        { src: Sharebet, alt: 'Sharebet', link: '/sharebet' },
        { src: Tick, alt: 'Tick', link: '/tick' },
        { src: Epl, alt: 'Epl', link: '/epl' },
        { src: Live, alt: 'Live', link: '/live' }
    ];

    const cardItems = [
        { icon: <FaDice />, title: 'Casino' },
        { icon: <FaGamepad />, title: 'Live Games' },
        { icon: <FaFireAlt />, title: "Today's Hot Games" },
        { icon: <FaGift />, title: 'Free Bet' },
        { icon: <FaAviato />, title: 'Aviator' },
        { icon: <FaFutbol />, title: 'New Leagues' }
    ];

    const itemsPerPage = isMobile ? 1 : 3; 

    const prevCardSet = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(cardItems.length / itemsPerPage) - 1 : prevIndex - 1));
    };

    const nextCardSet = () => {
        setCurrentIndex((prevIndex) => (prevIndex === Math.ceil(cardItems.length / itemsPerPage) - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextCardSet();
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, []); 

    return (
        <div>
            {/* Top Banner Carousel */}
            <Carousel>
                {carouselItems.map((item, index) => (
                    <Carousel.Item key={index} style={styles.itemStyle}>
                        <Link to={item.link}>
                            {!imageLoaded && (
                                <div className="loading-spinner">Loading...</div> 
                            )}
                            <img
                                className="d-block w-100"
                                style={{
                                    ...styles.imageStyle,
                                    display: imageLoaded ? 'block' : 'none',
                                }}
                                src={item.src}
                                onLoad={() => setImageLoaded(true)}
                                alt={item.alt}
                            />
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* Cards Section */}
            <div style={styles.cardsSection}>
                <h3>What's New?</h3>
                <div style={styles.cardContainer}>
                    <button style={styles.leftButton} onClick={prevCardSet}>
                        <FaChevronLeft />
                    </button>
                    {cardItems
                        .slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage)
                        .map((item, index) => (
                            <div
                                key={index}
                                style={styles.featureCard}
                                onMouseEnter={(e) => (e.currentTarget.style = styles.featureCardHover)}
                                onMouseLeave={(e) => (e.currentTarget.style = styles.featureCard)}
                            >
                                <div style={styles.icon}>{item.icon}</div>
                                {item.title === 'Free Bet' ? (
                                    <Button variant="primary" style={{ backgroundColor: '#28347c' }} onClick={openModal}>
                                        View Free Bets
                                    </Button>
                                ) : (
                                    <h4 style={{ margin: '0' }}>{item.title}</h4>
                                )}
                            </div>
                        ))}
                    <button style={styles.rightButton} onClick={nextCardSet}>
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            {/* Free Bets Modal */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Free Bets</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Manchester United vs Liverpool</p>
                    <div style={styles.betButtons}>
                        <button onClick={() => handleBet('1')} style={styles.betButton}>1 (2.5)</button>
                        <button onClick={() => handleBet('X')} style={styles.betButton}>X (3.2)</button>
                        <button onClick={() => handleBet('2')} style={styles.betButton}>2 (1.8)</button>
                    </div>
                    <hr />
                    <p>Chelsea vs Arsenal</p>
                    <div style={styles.betButtons}>
                        <button onClick={() => handleBet('1')} style={styles.betButton}>1 (2.1)</button>
                        <button onClick={() => handleBet('X')} style={styles.betButton}>X (3.4)</button>
                        <button onClick={() => handleBet('2')} style={styles.betButton}>2 (1.9)</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const styles = {
    itemStyle: {
        maxHeight: '200px',
        overflow: 'hidden',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    cardsSection: {
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'nowrap',
        position: 'relative',
        backgroundColor: '#f8f9fa',
        overflowX: 'hidden', 
        scrollBehavior: 'smooth',
    },
    featureCard: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        width: '250px',
        height: '100px',
        textAlign: 'center',
        transition: 'box-shadow 0.3s ease',
        margin: '10px',
    },
    featureCardHover: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    icon: {
        fontSize: '2.5rem',
        marginBottom: '10px',
        color: '#28347c',
    },
    leftButton: {
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        fontSize: '2rem',
        backgroundColor: '#e00c54',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    rightButton: {
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        fontSize: '2rem',
        backgroundColor: '#e00c54',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    betButtons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    betButton: {
        backgroundColor: '#28347c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
    },
};

export default CarouselLoader;
