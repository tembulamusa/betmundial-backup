import React, { useState, useContext, useEffect } from 'react';
import QuickLogin from './quick-login';
import BetSlip from './betslip';
import { FiX } from 'react-icons/fi';
import { Context } from '../../context/store';
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mpesa from "../../assets/img/mpesa-1.png";

import MiniGames from './mini-games';

const AlertMessage = (props) => {
  return (
    <div className={`alert alert-dismissible ${props.classname}`} role="alert">
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
      {props.message}
    </div>
  );
};

const SlipCounter = (props) => {
  const { sliptype } = props;
  const [state] = useContext(Context);

  return <span className="">{state?.sliptype?.count || 0}</span>;
};

const PaybillNumbersSection = () => (
  <section className='betslip-paybill bg-secondary'>
    <div className="paybillnumbers pt-3">
      <h2>Paybill Numbers</h2>
      <p>Your account/reference number should be your registered number.</p>
      <ul>
        <li className="mpesa">
          <span className="lazy lazy-loaded">
            <img src={Mpesa} style={{ maxWidth: "110px" }} alt='paybill' />
          </span>
          <span>599488</span>
        </li>
      </ul>
    </div>
  </section>
);

const CustomerCareSection = () => (
  <section className='betslip-paybill bg-secondary'>
    <div className="paybillnumbers pt-3">
      <h2>Customer Care</h2>
      <p>Surebet is the place to be all day long for 24/7 customer support.</p>
      <div className='text-3xl py-3'>0724599488</div>
      <p>customercare@surebet.co.ke</p>
    </div>
  </section>
);


const LoadedBetslip = ({ betslipValidationData, jackpotData }) => {
  const [betSlipMobile, setBetSlipMobile] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [footerMobileValue, setFooterMobileValue] = useState(state?.isjackpot ? jackpotData?.bet_amount : 100);
  const [bongeBonusMessage, setBongeBonusMessage] = useState('Select 3 or more games to win big bonus');


  // UseEffect to determine if there's a betslip or jackpotbetslip
  useEffect(() => {
    if (state?.betslip || state?.jackpotbetslip) {
      if (Object.entries(state?.betslip || state?.jackpotbetslip || {}).length > 0) {
        setBetSlipMobile(true); // Show the betslip modal on mobile when bets are present
      } else {
        setBetSlipMobile(false);
      }
    } else {
      setBetSlipMobile(false);
    }
  }, [state?.betslip, state?.jackpotbetslip]);

  const showShareModalDialog = () => {
    if (!state?.user) {
      dispatch({ type: 'SET', key: 'showloginmodal', payload: true });
    } else {
      dispatch({ type: 'SET', key: 'showsharemodal', payload: true });
    }
  };

  const BongeBetMarkupMessage = () => {
    return !state?.isjackpot && Object.keys(state?.betslip || {}).length > 0 && (
      <div className="bonge-bonus" style={{ padding: '5px', background: '#fbd702', marginTop: '10px' }}>
        <div id="bonus-centage-advice" style={{ fontWeight: '100' }}>{bongeBonusMessage}</div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile BetSlip Modal */}
      <div
        className={`betslip-container-mobile d-block d-md-none ${betSlipMobile ? 'd-block' : 'd-none'}`}
        style={{
          position: 'fixed',
          zIndex: 1000,
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '80%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <div
          className="betslip-header d-flex justify-content-between align-items-center"
          style={{
            padding: '10px',
            borderBottom: '1px solid #ccc',
            backgroundColor: '#f8f8f8',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1001,
          }}
        >
          <span className="col-8 slp">BETSLIP</span>
          <div className="col-4 d-flex justify-content-end align-items-center">
            {/* Cancel Button */}
            <button
              className="btn btn-outline-danger"
              style={{ marginRight: '10px' }}
              onClick={() => setBetSlipMobile(false)}
            >
              <FiX size={20} /> Cancel
            </button>
            {/* Share Bet Button */}
            <div className="betslip-header bg-secondary uppercase">
              {state?.isjackpot ? 'jackpot' : 'Betslip'}
              {!state?.isjackpot && (
                <span className="col-sm-2 slip-counter">({Object.keys(state?.betslip || {}).length})</span>
              )}
              {Object.keys(state?.betslip || state?.jackpotbetslip || {}).length > 0 && (
                <span className="col-sm-2 yellow-btn font-bold !float-end share-btn btn btn-light"
                  style={{ width: 'fit-content' }}
                  onClick={showShareModalDialog}
                >
                  <span><FontAwesomeIcon icon={faShare} /></span>
                  <span>Share</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bet-option-list" style={{ paddingTop: '60px', height: 'calc(100% - 60px)', overflowY: 'auto' }}>
          <div className="bet alu block-shadow">
            <div id="betslip" className="betslip">
              {Object.keys(state?.betslip || {}).length === 0 && <BongeBetMarkupMessage />}
              <BetSlip jackpot={state?.isjackpot} betslipValidationData={betslipValidationData} jackpotData={jackpotData} />
              <QuickLogin />
            </div>
          </div>

          <PaybillNumbersSection />
          <CustomerCareSection />
          
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <section
        className={`d-block d-md-none fixed-bottom text-center text-white bg-tertiary bet-slip-footer-toggle capitalize`}
        style={{ position: 'fixed', zIndex: 1000, bottom: '5%', left: 0, right: 0 }}
      >
        <div className="flex mobile-sticky-footer-slip">
          <div className="col-3 text-left" style={{ paddingLeft: '10px' }}>
            <a href="#betslip" className="bg-primary text-white mobile-footer-slip" onClick={() => setBetSlipMobile(true)}>
              slip <span className="mobile-footer-slip-counter rounded-full yellow-bg">{Object.entries(state?.betslip || state?.jackpotbetslip || {}).length}</span>
            </a>
          </div>
          <div className="col-3 text-left">
            <input
              className="capture-input"
              type="number"
              onChange={(ev) => dispatch({ type: 'SET', key: 'mobilefooteramount', payload: ev.target.value })}
              value={state?.mobilefooteramount ?? 100}
            />
          </div>
          <div className="col-3 text-left">
            <div>
              Odds: <span className="font-[500]">{state?.totalodds}</span>
            </div>
            <div>
              Win: <span className="font-[500]">{state?.slipnetwin}</span>
            </div>
          </div>
          <div className="col-3">
            <button className="bet-button yellow-bg uppercase btn">Bet Now</button>
          </div>
        </div>
      </section>
    </>
  );
};


const Right = (props) => {
  const { betslipValidationData, jackpotData } = props;
  const [state, dispatch] = useContext(Context);
  const [bongeBonusMessage, setBongeBonusMessage] = useState('Select 3 or more games to win big bonus');

  const showShareModalDialog = () => {
    if (!state?.user) {
      dispatch({ type: 'SET', key: 'showloginmodal', payload: true });
    } else {
      dispatch({ type: 'SET', key: 'showsharemodal', payload: true });
    }
  };

  const BongeBetMarkupMessage = () => {
    return !state?.isjackpot && Object.keys(state?.betslip || {}).length > 0 && (
      <div className="bonge-bonus" style={{ padding: '5px', background: '#fbd702', marginTop: '10px' }}>
        <div id="bonus-centage-advice" style={{ fontWeight: '100' }}>{bongeBonusMessage}</div>
      </div>
    );
  };

  return (
    <>
      <div className="col-md-3 betslip-container sticky-top">
        <section id="betslip" className="betslip-v2">
          <div className="betslip-header bg-secondary uppercase">
            {state?.isjackpot ? 'jackpot' : 'Betslip'}
            {!state?.isjackpot && (
              <span className="col-sm-2 slip-counter">({Object.keys(state?.betslip || {}).length})</span>
            )}
            {Object.keys(state?.betslip || {}).length > 0 && (
              <span className="col-sm-2 yellow-btn font-bold !float-end share-btn btn btn-light"
                style={{ width: 'fit-content' }}
                onClick={showShareModalDialog}
              >
                <span><FontAwesomeIcon icon={faShare} /></span>
                <span>Share</span>
              </span>
            )}
          </div>
          {Object.keys(state?.betslip || {}).length > 0 && <BongeBetMarkupMessage />}
          <BetSlip jackpot={state?.isjackpot} betslipValidationData={betslipValidationData} jackpotData={jackpotData} />
          <QuickLogin />
        </section>
        <PaybillNumbersSection />
        <MiniGames />
        <CustomerCareSection />
      
       
      </div>

      {/* Mobile version of BetSlip */}
      <LoadedBetslip betslipValidationData={betslipValidationData} jackpotData={jackpotData} />
    </>
  );
};

export default Right;
