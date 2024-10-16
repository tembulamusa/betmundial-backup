import React, { useState } from 'react';
import { FaGamepad } from 'react-icons/fa'; 

const image = 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
    'Six Dice',
    'Spin Up',
    'Calico Jack',
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
    '#FF8C00', 
    '#8A2BE2', 
    '#5F9EA0', 
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
                            borderColor: colors[index % colors.length], 
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        className="game-card"
                    >
                        <FaGamepad style={styles.icon} />
                        <span style={styles.gameName}>{game}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    miniGamesSection: {
        marginTop: '15px',
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
        height: '120px', 
        border: '2px solid', 
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        color: '#fff',
    },
    gameName: {
        marginLeft: '10px',
        fontWeight: 'bold',
    },
    icon: {
        fontSize: '24px',
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
