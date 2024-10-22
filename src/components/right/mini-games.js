import React, { useState } from 'react';

import game1 from '../../assets/img/advertgames/game1.png';
import game2 from '../../assets/img/advertgames/game2.png';
import game3 from '../../assets/img/advertgames/game3.png';
import game4 from '../../assets/img/advertgames/game4.png';
import game5 from '../../assets/img/advertgames/game5.png';
import game6 from '../../assets/img/advertgames/game6.png';
import game7 from '../../assets/img/advertgames/game7.png';
import game8 from '../../assets/img/advertgames/game8.png';
import game9 from '../../assets/img/advertgames/game9.png';
import game10 from '../../assets/img/advertgames/game10.png';
import game11 from '../../assets/img/advertgames/game11.png';
import game12 from '../../assets/img/advertgames/game12.png';

const games = [
    { name: 'Rocketman', image: game1 },
    { name: 'Spaceman', image: game2 },
    { name: 'Roulette', image: game3 },
    { name: 'Spin 2 Win', image: game4 },
    { name: 'High Flyer', image: game5 },
    { name: 'Football X', image: game6 },
    { name: '777 Strike', image: game7 },
    { name: 'Stock Market', image: game8 },
    { name: 'Sweet Bonanza', image: game9 },
    { name: 'Big Bass', image: game10 },
    { name: 'Baccarat', image: game11 },
    { name: 'Extra Juicy', image: game12 },
];

const MiniGames = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false); 

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.miniGamesSection}>
            <h3 style={styles.headingText}>Mini Games</h3>
            <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
                style={{
                    ...styles.searchInput,
                    backgroundColor: isFocused ? '#fff' : 'transparent', 
                }}
            />
            <div style={styles.gamesList}>
                {filteredGames.map((game, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.gameCard,
                            backgroundImage: `url(${game.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        className="game-card"
                    >
                        <span className="game-name" style={styles.gameName}>{game.name}</span>
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
        backgroundColor: '#24367e',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    headingText: {
        color: '#fff',
    },
    searchInput: {
        width: '100%',
        padding: '8px',
        margin: '0 auto 10px auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    gamesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
    },
    gameCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%', 
        maxWidth: '150px', 
        height: 'auto',
        aspectRatio: '1 / 1',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        position: 'relative',
        overflow: 'hidden',
    },
    gameName: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        fontWeight: 'bold',
        color: '#fff',
        opacity: 0, 
        transition: 'opacity 0.3s ease-in-out', 
    },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    .game-card:hover {
        transform: scale(1.05);
    }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
    .game-card:hover .game-name {
        opacity: 1; // Show game name on hover
    }
`, styleSheet.cssRules.length);

export default MiniGames;
