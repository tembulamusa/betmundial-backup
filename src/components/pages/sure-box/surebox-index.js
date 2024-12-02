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
  const [isActionSuspended, setIsActionSuspended] = useState(false);
  const [showWinGif, setShowWinGif] = useState(false);

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
        looseSound.current.onended = () => {
          resetGame();
          gamePlaySound.current.play();
        };
      } else {
        const updatedOdds = currentOdds * selectedOdds;
        setCurrentOdds(updatedOdds);
        setPossibleWin((updatedOdds * betAmount).toFixed(2));
        setCashoutAmount((updatedOdds * betAmount * 0.75).toFixed(2));
        setSelectedBoxes([...selectedBoxes, id]);
        gamePlaySound.current.play();
      }

      setIsActionSuspended(false);
    }, openBoxSound.current.duration * 1000);
  };

  const cashOut = () => {
    if (!gameActive) return;

    setIsActionSuspended(true);
    winSound.current.play();

    setShowWinGif(true);
    setTimeout(() => {
      setShowWinGif(false); 
      alert(`You cashed out and won ${cashoutAmount} coins!`);
      resetGame();
      gamePlaySound.current.play();
    }, 1500);
  };
   

  const resetGame = () => {
    setGameActive(false);
    setSelectedBoxes([]);
    setBoxOdds([]);
    setCurrentOdds(1);
    setPossibleWin(0);
    setCashoutAmount(0);
    setAutoBet(false);
  };

  useEffect(() => {
    gamePlaySound.current.loop = true;
    if (!userMuted) gamePlaySound.current.play();

    return () => {
    };
  }, [userMuted]);

  return (
    <div className="surebox-container">
      <div className="surebox-section">
        <div className="surebox-header">
          <h1 className="surebox-title">SureBox</h1>
          <div className="surebox-sound-icon" onClick={() => isMutedToggle()}>
            {userMuted ? <BiSolidVolumeMute /> : <FaVolumeHigh />}
          </div>
        </div>
        <p className="surebox-prompt text-lg font-semibold text-white mb-4">
          Select a box to get started
        </p>

        {showWinGif && (
          <div className="win-gif-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
            <img src={WinGif} alt="You Win!" className="w-64 h-64 object-contain" />
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
            autoPick={false}
            setAutoPick={() => {}}
            startGame={gameActive ? () => alert("Game already in progress") : startGame}
            cashOut={gameActive ? cashOut : () => alert("No game to cash out from")}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            possibleWin={possibleWin}
            cashOutAmount={cashoutAmount}
            gameInProgress={gameActive}
            pickRandomBox={() => {}}
          />
        </div>
      </div>
      <RandomPlayers />
    </div>
  );
};

export default SureBoxIndex;
