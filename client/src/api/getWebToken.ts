import { getLocalStorage } from '../utils/getLocalStorage';

const client_id = import.meta.env.VITE_CLIENT_ID || '';
const client_secret = import.meta.env.VITE_SECRET_ID || '';

export const getWebToken = async () => {
    let access_token = getLocalStorage('webAccessToken');
    let expires_in = getLocalStorage('webExpiration');
    const now = new Date();
    const nowTimeNumber = now.getTime();
    if (access_token && expires_in && parseInt(expires_in, 10) - 10 > nowTimeNumber) {
        return { access_token, expires_in };
    }
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id,
            client_secret,
        }),
    });
    if (!response.ok) {
        throw new Error('failed');
    }
    const json = await response.json();
    const newWebToken = json.access_token;
    const nowTime = new Date();
    const expirationTime = nowTime.getTime() + json.expires_in * 1000;
    const newExpiration = expirationTime.toString();
    return { access_token: newWebToken, expires_in: newExpiration };
};
