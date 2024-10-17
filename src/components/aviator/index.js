import React, { useState, useEffect } from 'react';
import { PiAirplaneTakeoffLight, PiAirplaneInFlightLight, PiAirplaneLanding } from 'react-icons/pi';

const AviatorGame = () => {
  const [balance, setBalance] = useState(3000); // initial balance
  const [bet, setBet] = useState(0); // user's current bet
  const [multiplier, setMultiplier] = useState(1.0); // multiplier starts at 1.0
  const [isFlying, setIsFlying] = useState(false); // plane's flying state
  const [hasCashedOut, setHasCashedOut] = useState(false); // if user cashed out
  const [planeStatus, setPlaneStatus] = useState('inflight'); // plane status

  useEffect(() => {
    let interval;
    let randomStop = Math.random() * (5 - 1) + 1.5; // random stop between 1.5x to 5x

    if (isFlying && !hasCashedOut) {
      interval = setInterval(() => {
        setMultiplier((prevMultiplier) => {
          const newMultiplier = (prevMultiplier + 0.1).toFixed(2);
          if (newMultiplier >= randomStop) {
            clearInterval(interval);
            setPlaneStatus('landing');
            endGame();
          }
          return parseFloat(newMultiplier);
        });

        // Update the plane's status depending on the multiplier
        if (multiplier > 1.5) {
          setPlaneStatus('takeoff');
        } else if (multiplier > 1.0 && multiplier <= 1.5) {
          setPlaneStatus('inflight');
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isFlying, hasCashedOut, multiplier]);

  // Start the game
  const startGame = () => {
    if (bet > 0) {
      setMultiplier(1.0);
      setIsFlying(true);
      setHasCashedOut(false);
      setPlaneStatus('inflight');
    } else {
      alert('Please place a bet first!');
    }
  };

  // End the game after the plane lands
  const endGame = () => {
    setIsFlying(false);
    if (!hasCashedOut) {
      setBalance((prev) => prev - bet); // user loses the bet
    }
  };

  // Handle Cashout
  const handleCashout = () => {
    if (isFlying && !hasCashedOut) {
      setBalance((prev) => prev + bet * multiplier); // add earnings to balance
      setHasCashedOut(true);
      setIsFlying(false); // stop the game
    }
  };

  // Plane icon rendering based on status
  const renderPlaneIcon = () => {
    if (planeStatus === 'takeoff') {
      return <PiAirplaneTakeoffLight size={50} color="white" />;
    } else if (planeStatus === 'inflight') {
      return <PiAirplaneInFlightLight size={50} color="white" />;
    } else {
      return <PiAirplaneLanding size={50} color="white" />;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div id="balance">
          <span style={{ color: '#30fcbe' }}>Balance: </span>
          <span style={{ color: '#fff' }}>{balance.toFixed(2)} €</span>
        </div>
      </div>

      <div id="mid-wrapper" style={styles.midWrapper}>
        <div id="plane" style={styles.planeWrapper}>
          {renderPlaneIcon()}
          <h2 style={styles.multiplier}>{multiplier.toFixed(2)}x</h2>
        </div>

        <div style={styles.controls}>
          <input
            type="number"
            placeholder="Enter your bet"
            value={bet}
            onChange={(e) => setBet(parseFloat(e.target.value))}
            style={styles.betInput}
          />
          <button onClick={startGame} style={styles.betButton}>
            Bet
          </button>
          <button onClick={handleCashout} style={styles.cashoutButton}>
            Cash Out
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    height: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  midWrapper: {
    marginTop: '50px',
  },
  planeWrapper: {
    position: 'relative',
  },
  multiplier: {
    fontSize: '42px',
    color: 'white',
    marginTop: '20px',
  },
  controls: {
    marginTop: '20px',
  },
  betInput: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '10px',
    border: '2px solid white',
    backgroundColor: 'transparent',
    color: 'white',
  },
  betButton: {
    padding: '10px 20px',
    backgroundColor: '#fb024c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cashoutButton: {
    padding: '10px 20px',
    backgroundColor: '#30fcbe',
    color: 'black',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

export default AviatorGame;
