
import React, { useEffect, useState } from "react";

const TakeBetsTimer = (props) => {
    const {setRunCoinSpin, setRoundStats, setPrepToStart, setCoinSettled } = props;
    const [timeLeft, setTimeLeft] = useState(650);
    const [roundBets, setRoundBets] = useState(0);

    const timeroundRangeMapper = {0: {min: 1126, max: 2200}, 1: {min: 1700, max: 2300}, 2: {min: 3500, max: 6050}, 3: {min: 6500, max: 10000}, 4: {min: 9990, max: 22000}, 5: {min:18000, max: 28000}, 6: {min: 27000, max: 45000}};
    

    const randomInc = (prev, min, max) => {
        return prev + Math.floor(Math.random() * (max - min) + min);
    }
  
    useEffect(() => {
      if (!timeLeft) {
        setRunCoinSpin(true);
        return;
      }
      setCoinSettled(true);
      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        }, 10);

      }, 1000);
      

      if(timeLeft <= 400) {setPrepToStart(true);setCoinSettled(false)} else {setPrepToStart(false)}
      return () => {clearTimeout(timeoutId)};
    }, [timeLeft]);

    const rangeMapperFnct = (time) => {
      time = parseInt(time);
      let rangeMapper;
      
      switch (true) {
        case (time <= 4):
          rangeMapper = 0;
          break;
        case (time <= 8):
          rangeMapper = 1;
          break;
        case (time <= 10):
          rangeMapper = 4;
          break;
        case (time <= 13):
          rangeMapper = 2;
          break;
        case (time <= 16):
          rangeMapper = 3;
          break;
        case (time <= 22):
          rangeMapper = 6;
          break;
        case (time <= 23):
          rangeMapper = 5;
          break;
        default:
          rangeMapper = 0;
          break;
      }
      return timeroundRangeMapper?.[rangeMapper]
    }

    useEffect(() => {
      const now = new Date();
      const getMappedRange = rangeMapperFnct(now.getHours());
      let fig = randomInc(0, getMappedRange?.max, getMappedRange?.min)
      setRoundBets(fig);
    }, []);


    useEffect(() => {      
      if (roundBets > 0) {
        let heads = randomInc( 0, 65, 35);
        const delay = randomInc(0, 1000, 100);
        let bets = roundBets
        setTimeout(() => {
          setRoundBets(roundBets + randomInc(0, 100, 1));
        }, delay);
        setRoundStats({
            bets: roundBets,
            heads:heads,
            tails:100 - heads
        });
      }
      
    }, [roundBets])
  
    const progress = (0 + timeLeft) / 650;
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