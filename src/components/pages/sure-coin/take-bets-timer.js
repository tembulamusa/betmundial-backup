
import React, { useEffect, useState } from "react";

const TakeBetsTimer = (props) => {
    const {setRunCoinSpin, roundStats, setRoundStats, isOnline } = props;

    const [timeLeft, setTimeLeft] = useState(450);

    const randomInc = (prev, min, max) => {

        return prev + Math.floor(Math.random() * (max - min) + min);
    }
  
    useEffect(() => {
      if (!timeLeft) {
        setRunCoinSpin(true);
        return;
      }
      let randStatMax = randomInc( 0, 60, 30);
      let randStatMin = randomInc( 0, 20, 0);
  
      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        let heads = randomInc( 0, 80, 20);
        setRoundStats({
            bets:randomInc(roundStats?.bets || 0, randStatMax, randStatMin),
            heads:heads,
            tails:100 -heads
        });

      }, 10);
  
      return () => clearInterval(intervalId);
    }, [timeLeft]);
  
    const progress = (0 + timeLeft) / 450;
  
    return (
      <div>
        <div className="time-left"><span className="text">starts in </span><span className="counter">{parseInt(timeLeft / 100)}</span></div>
        <div style={{ backgroundColor: 'rgba(255,255,255, 0.4)', height: '6px' }}>
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              borderRadius: '3px',
              backgroundColor: '#FFB200',
            }}
          />
        </div>
      </div>
    );
  };

  export default React.memo(TakeBetsTimer);