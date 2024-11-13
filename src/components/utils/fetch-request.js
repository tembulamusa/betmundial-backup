import {setLocalStorage, getFromLocalStorage, removeItem} from './local-storage';

const ENC_KEY = '2bdVweTeI42s5mkLdYHyklTMxQS5gLA7MDS6FA9cs1uobDXeruACDic0YSU3si04JGZe4Y';
// const BASE_URL = 'https://bikoapi.bikosports.co.tz';
const BASE_URL = 'https://apisb.surebet.co.ke/';
const BASE2_URL = 'https://apisb.surebet.co.ke/bet-service';
const ACCOUNTS_URL = 'https://api.surebet.co.ke';
const CASINOFAZI = 'https://apisb.surebet.co.ke/fazi/casino/';
const SURECOIN_URL = 'https://apisb.surebet.co.ke/v1/surecoin/user/';

const makeRequest = async ({url, method, data = null, use_jwt = false, api_version = 1, serviceType}) => {

    if (api_version == 2) {        
        url = BASE2_URL + url;
    } else { 
        if (api_version == 3) {
            url = ACCOUNTS_URL + url
        } else {
            if (api_version == "faziCasino") {
                url = CASINOFAZI + url
            } else if (api_version == "sureCoin") {
                url = SURECOIN_URL + url
            }
        }
    }
    
    
    let headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "origin":"surebet.co.ke"
    };

    let user = getFromLocalStorage('user');

    const updateUserSession = () => {
        if (user) {
            setLocalStorage('user', user);
        }
    }
    // let jwt = null;

    // if (use_jwt) {
    //     const sign = require('jwt-encode');
    //     const payload = {
    //         ...data,
    //         iat: Math.floor(Date.now() / 1000) + (1 * 60)
    //     };
    //     jwt = sign(payload, ENC_KEY);

    //     url += (url.match(/\?/g) ? '&' : '?') + 'token=' + jwt;
    //     data = null;
    // } else {
        // headers = {...headers, ...{"content-type": "application/json"}}
    // }

    

    const token = user?.token;
    // compute session validity and prompt login in case it's expired
    
    if (token) {
        headers = {...headers, ...{Authorization: "Bearer " + token}}
    }

    try {
        let request = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            // credentials: 'same-origin',
            headers: headers,
            redirect: 'follow',
            // referrerPolicy: 'no-referrer',
        }
        if (data) {
            request['body'] = JSON.stringify(data)
        }
        const response = await fetch(url, request);
        
        let result = await response?.json();
        let status = response?.status;
        return [status, result];
    } catch (err) {
        let status = err.response?.status,
            result = err.response?.data;
        return [status, result]
    } finally {
        updateUserSession();
    }
};

export default makeRequest;
