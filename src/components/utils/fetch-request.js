import {setLocalStorage, getFromLocalStorage} from './local-storage';

const ENC_KEY = '2bdVweTeI42s5mkLdYHyklTMxQS5gLA7MDS6FA9cs1uobDXeruACDic0YSU3si04JGZe4Y';
// const BASE_URL = 'https://bikoapi.bikosports.co.tz';
const BASE_URL = 'https://api.surebet.co.ke';

const makeRequest = async ({url, method, data = null, use_jwt = false}) => {
    url = BASE_URL + url;
    let headers = {
        "accept": "*/*"
    };

    let user = getFromLocalStorage('user');

    const updateUserSession = () => {
        if (user) {
            setLocalStorage('user', user);
        }
    }
    let jwt = null;

    if (use_jwt) {
        const sign = require('jwt-encode');
        const payload = {
            ...data,
            iat: Math.floor(Date.now() / 1000) + (1 * 60)
        };
        jwt = sign(payload, ENC_KEY);

        url += (url.match(/\?/g) ? '&' : '?') + 'token=' + jwt;
        data = null;
    } else {
        headers = {...headers, ...{"content-type": "application/json"}}
    }

    const token = user?.token;

    if (token) {
        headers = {...headers, ...{Authorization: "Bearer " + token}}
    }

    try {
        let request = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }
        if (data) {
            request['body'] = JSON.stringify(data)
        }
        const response = await fetch(url, request);
        let result = await response.json();
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

