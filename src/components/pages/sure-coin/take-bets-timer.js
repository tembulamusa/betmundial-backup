
import React, { useEffect, useState } from "react";

const TakeBetsTimer = (props) => {
    const {setRunCoinSpin } = props;

    const [timeLeft, setTimeLeft] = useState(450);
  
    useEffect(() => {
      if (!timeLeft) {
        setRunCoinSpin(true);
        return;
      }
  
      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
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