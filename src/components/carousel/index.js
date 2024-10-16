import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CarouselCards from './carousel-cards';

import Breakfast from '../../assets/img/banner/carousel/breakfast.png';
import App from '../../assets/img/banner/carousel/app.png';
import Sharebet from '../../assets/img/banner/carousel/Sharebet.png';
import Tick from '../../assets/img/banner/carousel/Tick.png';
import Epl from '../../assets/img/banner/carousel/epl.png';
import Live from '../../assets/img/banner/carousel/Live-Betting.png';
import { FaDice, FaFutbol, FaGift, FaAviato, FaGamepad, FaFireAlt } from 'react-icons/fa';

const CarouselLoader = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
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
            <CarouselCards cardItems={cardItems} onBetOpen={openModal} /> {/* Use CarouselCards */}

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
    betButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '10px',
    },
    betButton: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#28347c',
        color: 'white',
        cursor: 'pointer',
    },
};

export default CarouselLoader;
