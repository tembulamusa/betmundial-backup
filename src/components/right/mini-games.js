import React, { useState } from 'react';
import { FaGamepad } from 'react-icons/fa'; 

const gamesList = [
    'European Roulette',
    'Pig Banker',
    'Book of Dead',
    'Legacy of Dead',
    'Outlaw Bounty',
    'Majestic Fury',
    'Buffalo Collector',
    'Sweet Bonanza',
    'Black Berries',
];

const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F3FF33', 
    '#FF33A8', 
    '#33FFF6', 
    '#FF8333', 
    '#A833FF',
    '#FFD333', 
];

const MiniGames = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGames = gamesList.filter(game =>
        game.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.miniGamesSection}>
            <h3>Mini Games</h3>
            <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
            />
            <div style={styles.gamesList}>
                {filteredGames.map((game, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.gameCard,
                            backgroundColor: colors[index % colors.length], 
                        }}
                        className="game-card"
                    >
                        <FaGamepad />
                        <span style={{ marginLeft: '10px' }}>{game}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    miniGamesSection: {
        marginTop: '50px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #ddd', 
        borderRadius: '5px',
    },
    searchInput: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    gamesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '10px',
    },
    gameCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        width: '120px',
        height: '200px', 
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'transform 0.2s', 
    },
};

// CSS for hover effect
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    .game-card:hover {
        transform: scale(1.05); // Scale up on hover
    }
`, styleSheet.cssRules.length);

export default MiniGames;
