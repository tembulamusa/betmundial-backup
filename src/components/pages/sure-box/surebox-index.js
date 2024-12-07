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
import LostGif from "../../../assets/img/casino/surebox-close.gif";

const SureBoxIndex = () => {
  const [state, dispatch] = useContext(Context);
  const [userMuted, setUserMuted] = useState(getFromLocalStorage("sureboxmuted"));
  const user = getFromLocalStorage("user");
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxOdds, setBoxOdds] = useState([]);
  const [currentOdds, setCurrentOdds] = useState(1);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [sessionId, setSessionId] = useState(null);
  const [bets, setBets] = useState([]);
  const [isActionSuspended, setIsActionSuspended] = useState(false);
  const [outcome, setOutcome] = useState(null);

  const gamePlaySound = useRef(new Audio(GamePlaySoundFile));
  const openBoxSound = useRef(new Audio(OpenBoxSoundFile));
  const looseSound = useRef(new Audio(LooseSoundFile));
  const winSound = useRef(new Audio(WinSoundFile));

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

  const fetchOdds = async () => {
    try {
      const response = await makeRequest("/api/surebox/odds", "GET", null, {
        Authorization: `Bearer ${user.token}`,
      });
      setBoxOdds(response.odds);
    } catch (error) {
      console.error("Error fetching odds:", error);
      alert("Failed to fetch box odds. Please try again.");
    }
  };

  const startGame = async () => {
    if (!user) {
      if (!state?.showloginmodal) {
        dispatch({ type: "SET", key: "showloginmodal", payload: true });
      }
      return; // Stop the game if user is not logged in
    }
  
    if (user.balance < betAmount) {
      alert("Insufficient balance to start the game.");
      return;
    }
  
    // Use the existing session ID if available
    const existingSessionId = getFromLocalStorage("sessionId");
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setLocalStorage("sessionId", newSessionId, 1000 * 60 * 60 * 24); // Store session for 24 hours
    }
  
    await fetchOdds();
    setSelectedBoxes([]);
    setCurrentOdds(1);
    setCashoutAmount(0);
    setGameActive(true);
    setOutcome(null);
  };

  const numberToWords = (num) => {
    const words = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY"];
    return words[num - 1] || "";
  }
  

  const handleBoxSelection = async (id) => {
    if (!gameActive || isActionSuspended || selectedBoxes.includes(id)) return;
  
    setIsActionSuspended(true);
    openBoxSound.current.play();
  
    setTimeout(async () => {
      if (!user?.profile_id) {
        if (!state?.showloginmodal) {
          dispatch({ type: "SET", key: "showloginmodal", payload: true });
        }
        return;
      }
  
      const boxInWords = numberToWords(id); // Convert box number to words
  
      if (!gameActive) {
        console.log("Game not active, not making the request");
        return; // Exit if the game is not active
      }
      
      const data = {
        session_id: sessionId,
        bet_amount: betAmount,
        box: boxInWords,
        profile_id: user?.profile_id,
      }
      makeRequest({url: 'play', 
        method: 'POST',
        data: data,
        api_version:"sureBox", responseType:"text"}).then(([status, response]) => {
        
        console.log("THE RESPONSE IS HERE :::: ", response)
        if(status == 200) {
            let cpBt = elizabeth(response, process.env.REACT_APP_OTCMEKI);
          //   const newBet = {
          //   betNumber,
          //   amountWon: (selectedOdds * betAmount).toFixed(2),
          // };
          // setBets((prevBets) => [...prevBets, newBet]);
            if (cpBt?.[process.env.REACT_APP_RSPST] == 200) {
                console.log("SUCCEEDED    ", cpBt)
            } else {
                console.log("FAILED SOME STUFF")
            }
          } else {
              console.log("AN ERROR OCCURED   ::::: ")
          }
        })  
      setIsActionSuspended(false);
    }, openBoxSound.current.duration * 1000);
  };
  
  
  
  const cashOut = async () => {
    if (!gameActive) return;
    setIsActionSuspended(true);

    try {
      let endpoint = 'cash-out';
      const response = await makeRequest({
        url: endpoint, 
        method: 'POST',
        data: {
          session_id: sessionId,
          betAmount,
          box: selectedBoxes[0],  
          profile_id: user?.profile_id,
        },
        api_version: 'sureBox'
      });

      // Decrypt response and handle accordingly
      const decryptedResponse = elizabeth(response.data, process.env.REACT_APP_OTCMEKI);
      if (decryptedResponse?.status === 200) {
        winSound.current.play();
        setOutcome("won");
        alert(`You cashed out and won ${decryptedResponse.winnings} KES!`);
        resetGame();
      } else {
        alert(decryptedResponse?.message || "Cashout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error cashing out:", error);
      alert("Cashout failed. Please try again.");
    }
  };


  const resetGame = () => {
    setGameActive(false);
    setSelectedBoxes([]);
    setCurrentOdds(1);
    setCashoutAmount(0);
    setBoxOdds([]);
    setSessionId(null);
    setLocalStorage("sessionId", null); // Clear session ID from storage
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
        <div className="surebox-content">
          <SureBoxGrid
            selectedBoxes={selectedBoxes}
            setSelectedBoxes={handleBoxSelection}
            boxOdds={boxOdds}
          />
          <SureBoxControls
            autoBet={false}
            setAutoBet={() => {}}
            startGame={gameActive ? () => alert("Game already in progress") : startGame}
            cashOut={gameActive ? cashOut : () => alert("No game to cash out from")}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            possibleWin={(currentOdds * betAmount).toFixed(2)}
            cashOutAmount={cashoutAmount}
            gameInProgress={gameActive}
            bets={bets} // API can be integrated for detailed bets list
          />
        </div>
      </div>
      <RandomPlayers />
    </div>
  );
};

export default React.memo(SureBoxIndex);

