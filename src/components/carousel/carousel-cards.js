import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const CarouselCards = ({ cardItems, onBetOpen }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = window.innerWidth <= 768;
    const itemsPerPage = isMobile ? 1 : 3;

    const prevCardSet = () => {
        setCurrentIndex((prevIndex) => (prevIndex == 0 ? Math.ceil(cardItems.length / itemsPerPage) - 1 : prevIndex - 1));
    };

    const nextCardSet = () => {
        setCurrentIndex((prevIndex) => (prevIndex == Math.ceil(cardItems.length / itemsPerPage) - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextCardSet();
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, []); 

    return (
        <div style={styles.cardsSection}>
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
                            {item.title == 'Free Bet' ? (
                                <Button variant="primary" style={{ backgroundColor: '#28347c' }} onClick={onBetOpen}>
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
    );
};

const styles = {
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
        backgroundColor: '#e4ecf5',
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
};

export default CarouselCards;
