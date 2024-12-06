import React, { useEffect, useState, useRef } from "react";
import { getFromLocalStorage, setLocalStorage } from "../../utils/local-storage";
import { BiSolidVolumeMute } from "react-icons/bi";
import { FaVolumeHigh } from "react-icons/fa6";

import SureBoxGrid from "./surebox-grid";
import SureBoxControls from "./surebox-controls";
import RandomPlayers from "./random-players";

import GamePlaySoundFile from "../../../assets/img/casino/surebox-track.mp3";
import OpenBoxSoundFile from "../../../assets/img/casino/surebox-openbox.mp3";
import LooseSoundFile from "../../../assets/img/casino/surebox-loose.mp3";
import WinSoundFile from "../../../assets/img/casino/surebox-win.mp3";
import WinGif from "../../../assets/img/casino/surebox-win.gif";
import LostGif from "../../../assets/img/casino/surebox-close.gif";


const SureBoxIndex = () => {
  const [userMuted, setUserMuted] = useState(getFromLocalStorage("sureboxmuted"));
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxOdds, setBoxOdds] = useState([]);
  const [currentOdds, setCurrentOdds] = useState(1);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [possibleWin, setPossibleWin] = useState(0);
  const [autoBet, setAutoBet] = useState(false);
  const [bets, setBets] = useState([]);
  const [isActionSuspended, setIsActionSuspended] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [showWinGif, setShowWinGif] = useState(false);
  const [showLostGif, setShowLostGif] = useState(false);

  const gamePlaySound = useRef(new Audio(GamePlaySoundFile));
  const openBoxSound = useRef(new Audio(OpenBoxSoundFile));
  const looseSound = useRef(new Audio(LooseSoundFile));
  const winSound = useRef(new Audio(WinSoundFile));

  const isMutedToggle = () => {
    const newMutedState = !userMuted;
    setLocalStorage("sureboxmuted", newMutedState, 1000 * 60 * 60 * 24 * 7);
    setUserMuted(newMutedState);
    gamePlaySound.current.muted = newMutedState;
  };

  const startGame = () => {
    const newBoxOdds = Array.from({ length: 20 }, () => {
      return Math.random() > 0.4 ? parseFloat((Math.random() * 2.5 + 0.5).toFixed(2)) : 0;
    });

    setBoxOdds(newBoxOdds);
    setSelectedBoxes([]);
    setCurrentOdds(1);
    setPossibleWin(0);
    setCashoutAmount(0);
    setGameActive(true);
    setOutcome(null); // Reset outcome
  };

  const handleBoxSelection = (id) => {
    if (!gameActive || isActionSuspended || selectedBoxes.includes(id)) return;

    setIsActionSuspended(true);
    gamePlaySound.current.pause();
    openBoxSound.current.play();

    const selectedOdds = boxOdds[id - 1];
    setTimeout(() => {
      openBoxSound.current.pause();

      if (selectedOdds === 0) {
        looseSound.current.play();

        setShowLostGif(true);
        setOutcome("lost"); // Update outcome
        setTimeout(() => {
          setShowLostGif(false);
          resetGame();
          gamePlaySound.current.play();
        }, 2000);
      } else {
        const updatedOdds = currentOdds * selectedOdds;
        setCurrentOdds(updatedOdds);
        setPossibleWin((updatedOdds * betAmount).toFixed(2));
        setCashoutAmount((updatedOdds * betAmount * 0.75).toFixed(2));
        setSelectedBoxes([...selectedBoxes, id]);
        gamePlaySound.current.play();

        const newBet = {
          betNumber: bets.length + 1,
          amountWon: (updatedOdds * betAmount).toFixed(2),
        };
        setBets([...bets, newBet]);
      }

      setIsActionSuspended(false);
    }, openBoxSound.current.duration * 1000);
  };

  const cashOut = () => {
    if (!gameActive) return;

    setIsActionSuspended(true);
    winSound.current.play();

    setShowWinGif(true);
    setOutcome("won"); // Update outcome
    setTimeout(() => {
      setShowWinGif(false);
      alert(`You cashed out and won ${cashoutAmount} KES!`);
      resetGame();
      gamePlaySound.current.play();
    }, 1500);
  };

  const resetGame = () => {
    setGameActive(false);
    setSelectedBoxes([]);
    setBetAmount('3');
    setBoxOdds([]);
    setCurrentOdds(1);
    setPossibleWin(0);
    setCashoutAmount(0);
    setBets([]);
    setAutoBet(false);
    setTimeout(() => setOutcome(null), 2000); 
  };

  useEffect(() => {
    gamePlaySound.current.loop = true;
    if (!userMuted) gamePlaySound.current.play();

    return () => {};
  }, [userMuted]);

  return (
    <div className="surebox-container">
      <div className="surebox-section">
        <div className="surebox-header">
          <h1 className="surebox-title">SureBox</h1>
          <div className="surebox-sound-icon" onClick={isMutedToggle}>
            {userMuted ? <BiSolidVolumeMute /> : <FaVolumeHigh />}
          </div>
        </div>

        {outcome && (
          <div
            className={`surebox-notify-outcome ${
              outcome === "won" ? "surebox-won" : "surebox-lost"
            }`}
          >
            {outcome === "won" ? (
              <>
                <span>WON</span>
                <span>KES {cashoutAmount}</span>
              </>
            ) : (
              <>
                <span>Empty Box! </span>
                <span>Better luck next time!</span>
              </>
            )}
          </div>
        )}

        {showWinGif && (
          <div className="win-gif-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
            <img src={WinGif} alt="You Win!" className="w-64 h-64 object-contain" />
          </div>
        )}

        {showLostGif && (
          <div className="lost-gif-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
            <img src={LostGif} alt="You Lost!" className="w-64 h-64 object-contain" />
          </div>
        )}

        <div className="surebox-content">
          <SureBoxGrid
            selectedBoxes={selectedBoxes}
            setSelectedBoxes={handleBoxSelection}
            boxOdds={boxOdds}
          />
          <SureBoxControls
            autoBet={autoBet}
            setAutoBet={setAutoBet}
            startGame={gameActive ? () => alert("Game already in progress") : startGame}
            cashOut={gameActive ? cashOut : () => alert("No game to cash out from")}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            possibleWin={possibleWin}
            cashOutAmount={cashoutAmount}
            gameInProgress={gameActive}
            bets={bets}
            pickRandomBox={() => {}}
          />
        </div>
      </div>
      <RandomPlayers />
    </div>
  );
};

export default React.memo(SureBoxIndex);
