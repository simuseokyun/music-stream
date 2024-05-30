import Cookies from 'js-cookie';
import { refreshToken } from './api';

export const saveLocalStorage = (name: string, value: string) => {
    localStorage.setItem(name, value);
};

export const saveTokenExpires = (expi: string) => {
    localStorage.setItem('expirationTime', expi);
};
export const getTokenLocalStorage = (name: string) => {
    return localStorage.getItem(name);
};

export const loginSpotify = () => {
    const client_id = process.env.REACT_APP_CLIENT_ID || '';
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI || '';
    const scopes = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming';
    const state = Math.random().toString(36).substring(7);
    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id,
        scope: scopes,
        redirect_uri,
        state: state,
    });
    const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
    window.location.href = authUrl;
};

export const msTransform = (ms: number) => {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return { minutes, seconds };
};
export const commaSeparate = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export async function playSong(trackUri?: string, deviceId?: string) {
    const token = Cookies.get('accessToken');

    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            uris: [trackUri],
        }),
    });
    if (response.status === 401) {
        try {
            const { access_token } = await refreshToken();
            Cookies.set('accessToken', access_token);
            const retryResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    uris: [trackUri],
                }),
            });

            if (retryResponse.status === 204) {
                console.log('노래를 성공적으로 재생했습니다.');
            } else {
                console.error('노래를 재생하는 중 문제가 발생했습니다.', retryResponse.status);
            }
        } catch (error) {
            alert('로그인이 필요한 서비스입니다.');
        }
    }
    // if (response.status == 404) {
    //     alert('웹 플레이어를 다시 생성하기 위해 로그아웃 하겠습니다.');
    //     Cookies.remove('accessToken');
    //     Cookies.remove('refreshToken');
    //     window.location.href = '/';
    //     return;
    // }
}
