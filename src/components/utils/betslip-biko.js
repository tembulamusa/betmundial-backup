import { 
    getFromLocalStorage, 
    setLocalStorage,
    removeItem
} from './local-storage';

export const addToSlip = (slip) => {
    //Reve any othe betslips
    removeItem('old_betslip');

    let current_slip = getFromLocalStorage('betslip');
    if(current_slip){
        current_slip[slip.match_id] = slip;
    } else {
        current_slip = {[slip.match_id] : slip};
    }
    setLocalStorage('betslip', current_slip, 1*60*60*1000);
    return current_slip;
}

export const removeFromSlip = (match_id) => {
   let current_slip = getFromLocalStorage('betslip');
   delete current_slip[match_id];
   setLocalStorage('betslip', current_slip, 1*60*60*1000);
   return current_slip;
}

export const clearSlip = () => {
   removeItem('betslip');
}
export const getBetslip = () => {
    return getFromLocalStorage('betslip');
}

export const getJackpotBetslip =  () =>{
    return  getFromLocalStorage('jackpotbetslip');
}

export const addToJackpotSlip = (slip) => {
    let current_slip = getFromLocalStorage('jackpotbetslip');
    if(current_slip){
        current_slip[slip.match_id] = slip;
    } else {
        current_slip = {[slip.match_id] : slip};
    }
    setLocalStorage('jackpotbetslip', current_slip, 1*60*60*1000);
    return current_slip;
}

export const removeFromJackpotSlip = (match_id) => {
   let current_slip = getFromLocalStorage('jackpotbetslip');
   if(current_slip) {
      delete current_slip[match_id];
   }
   setLocalStorage('jackpotbetslip', current_slip, 1*60*60*1000);
   return current_slip;
}

export const clearJackpotSlip = () => {
   removeItem('jackpotbetslip');
}
export const formatNumber = (number) => {
    return number === undefined || number === 0 ? '0' : number.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .replace(".00", '');
}
