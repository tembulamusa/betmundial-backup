import React, { useEffect, useContext, useState, useRef } from "react";
import { Context } from "../../../context/store";
import { getFromLocalStorage, setLocalStorage } from "../../utils/local-storage";
import makeRequest from "../../utils/fetch-request";
import CryptoJS from "crypto-js";
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
import LostGif from "../../../assets/img/casino/surebox-unlucky.gif";

const SureBoxIndex = () => {
  const [state, dispatch] = useContext(Context);
  const [userMuted, setUserMuted] = useState(getFromLocalStorage("sureboxmuted"));
  const user = getFromLocalStorage("user");
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxOdds, setBoxOdds] = useState([]);
  const [currentOdds, setCurrentOdds] = useState(1);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [betAmount, setBetAmount] = useState(5);
  const [sessionId, setSessionId] = useState(null);
  const [betId, setBetId] = useState(null);
  const [bets, setBets] = useState([]);
  const [isActionSuspended, setIsActionSuspended] = useState(false);
  const [autoRestart, setAutoRestart] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [showWinGif, setShowWinGif] = useState(false);
  const [showLostGif, setShowLostGif] = useState(false);
  
  const gamePlaySound = useRef(new Audio(GamePlaySoundFile));
  const openBoxSound = useRef(new Audio(OpenBoxSoundFile));
  const looseSound = useRef(new Audio(LooseSoundFile));
  const winSound = useRef(new Audio(WinSoundFile));

  const handleGameEnd = (result) => {
    setGameActive(false);
    setOutcome(result);
  
    setTimeout(() => {
      setOutcome(null); 
      if (autoRestart) {
        startGame(); 
      }
    }, 2000); 
  };

  useEffect(() => {
    if (!gameActive && autoRestart) {
      startGame();
    }
  }, [autoRestart, gameActive]);

  useEffect(() => {
    const user = getFromLocalStorage("user");
    if (user) {
        dispatch({type:"SET", key:"user", payload:user})
    }
  }, [])

  function elizabeth(encryptedData, encryptionKey) {
    try {
      const adjustedKey = encryptionKey.padEnd(16, '0').substring(0, 16);
      const key = CryptoJS.enc.Utf8.parse(adjustedKey);
      const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);
      const decryptedBytes = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBytes },
        key,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      );
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      return null;
    }
  }

  const generateSessionId = () => {
    return `${user.profile_id}-${Math.floor(Math.random()* (4000 - 260) + 260)}`;
  };

  const isMutedToggle = () => {
    const newMutedState = !userMuted;
    setLocalStorage("sureboxmuted", newMutedState, 1000 * 60 * 60 * 24 * 7);
    setUserMuted(newMutedState);
    gamePlaySound.current.muted = newMutedState;
  };

  
  const startGame = async () => {
    if (!user) {
      if (!state?.showloginmodal) {
        dispatch({ type: "SET", key: "showloginmodal", payload: true });
      }
      return;
    }
  
    if (user.balance < betAmount) {
      console.log("Insufficient balance to start the game.");
      return;
    }
  
    const newSessionId = generateSessionId(); 
    setSessionId(newSessionId);
    setLocalStorage("sessionId", newSessionId, 1000 * 60 * 60 * 24); 
  
    setSelectedBoxes([]);
    setBets([]);
    setCurrentOdds(1);
    setCashoutAmount(0);
    setGameActive(true);
    setOutcome(null);
  };  

  const numberToWords = (num) => {
    const words = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY"];
    return words[num - 1] || "";
  }
  
  const wordsToNumber = (word) => {
    const words = [
      "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN",
      "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN",
      "EIGHTEEN", "NINETEEN", "TWENTY"
    ];
    return words.indexOf(word.toUpperCase()) + 1;
  };
  

  const handleBoxSelection = async (id) => {
    if (!gameActive || isActionSuspended || selectedBoxes.includes(id)) return;
  
    setIsActionSuspended(true);
    openBoxSound.current.play();
  
    setTimeout(async () => {
      const boxInWords = numberToWords(id);
      const data = {
        session_id: sessionId,
        bet_amount: betAmount,
        box: boxInWords,
        profile_id: user?.profile_id,
      };
  
      try {
        const [status, response] = await makeRequest({
          url: "play",
          method: "POST",
          data: data,
          api_version: "sureBox",
          responseType: "text",
        });
  
        if (status === 200) {
          const cpBt = elizabeth(response, process.env.REACT_APP_OTCMEKI);
  
          if (cpBt?.response_status === 200) {
            const { win, possible_win, multiplier, winning_box, bet_id } = cpBt;
  
            if (!win) {
              looseSound.current.play();
              setShowLostGif(true);
              //setOutcome("lost");
              handleGameEnd("lost");
              setTimeout(() => {
                setShowLostGif(false);
                resetGame();
              }, 2000);
              return;
            }
  
            setSelectedBoxes((prev) => [...prev, id]);
            setBets((prevBets) => [
              ...prevBets,
              {
                box: id,
                multiplier,
                possibleWin: possible_win,
              },
            ]);
  
            setCurrentOdds(multiplier);
            setCashoutAmount(possible_win);
            setBoxOdds(multiplier);
            setBetId(bet_id);
  
            if (win && wordsToNumber(winning_box) === id) {
              winSound.current.play();
            }
          } else {
            console.log("An error occurred. Please try again.");
          }
        } else {
          console.log("Failed to process the request. Please try again.");
        }
      } catch (error) {
        console.error("Error handling box selection:", error);
      } finally {
        setIsActionSuspended(false);
      }
    }, openBoxSound.current.duration * 1000);
  };
  
  
  
  const cashOut = async () => {
    if (!gameActive) return;
    if (!betId) {
      console.log("Bet ID is missing. Cannot cash out.");
      return;
    }
    setIsActionSuspended(true);
  
    try {
      const lastBoxNumber = selectedBoxes[selectedBoxes.length - 1];
      const lastBoxInWords = numberToWords(lastBoxNumber);
  
      const data = {
        session_id: sessionId,
        profile_id: user?.profile_id,
        last_box: lastBoxInWords, 
        bet_id: betId,
      };
  
      const [status, response] = await makeRequest({
        url: "cash-out",
        method: "POST",
        data: data,
        api_version: "sureBox",
        responseType: "text", 
      });
  
      if (status === 200) {
        const decryptedResponse = elizabeth(response, process.env.REACT_APP_OTCMEKI);
        //console.log('Decrypted Cashout Response', decryptedResponse);
  
        if (decryptedResponse?.response_status === 200) {
          winSound.current.play();
          setShowWinGif(true);
          //setOutcome("won");
          handleGameEnd("won");
          setTimeout(() => {
            setShowWinGif(false);
            console.log(`You cashed out and won ${decryptedResponse.possible_win} KES!`);
            resetGame();
          }, 1500);
        } else {
          console.log(decryptedResponse?.message || "Cashout failed. Please try again.");
        }        
      } else {
        console.error("Request Failed:", {
          status: status,
          response: response
        });
      }
    } catch (error) {
      console.error("Error cashing out:", error);
    } finally {
      setIsActionSuspended(false);
    }
  };
  

  const resetGame = () => {
    setGameActive(false);
    setBets([]);
    setSelectedBoxes([]);
    setCurrentOdds(1);
    setCashoutAmount(0);
    setBoxOdds([]);
    setSessionId(null);
    setBetId(null);
    setLocalStorage("sessionId", null); 
    setOutcome(null);
    setTimeout(() => setOutcome(null), 2000);
  };  
  
  useEffect(() => {
    gamePlaySound.current.loop = true;
    if (!userMuted) gamePlaySound.current.play();

    return () => {
      gamePlaySound.current.pause();
    };
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
                <span>Empty Box!</span>
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
            autoRestart={autoRestart}
            setAutoRestart={setAutoRestart}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            possibleWin={currentOdds * betAmount}
            startGame={startGame}
            cashOut={cashOut}
            gameInProgress={gameActive}
            cashOutAmount={cashoutAmount}
            bets={bets}
          />
        </div>
      </div>
      <RandomPlayers />
    </div>
  );
};

export default React.memo(SureBoxIndex);

