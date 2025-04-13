import { getLocalStorage } from '../utils/getLocalStorage';
import { setLocalStorage } from '../utils/setLocalStorage';
import { getSdkTokenWithRefreshToken } from '../api/getSdkTokenWithRefreshToken';
import { useRecoilState } from 'recoil';
import { deviceInfo } from '../store/atoms';
import { nowSongInfo } from '../store/atoms';

export const useToggleMusic = () => {
    const token = getLocalStorage('sdkAccessToken');
    const [deviceId, setDevice] = useRecoilState(deviceInfo);
    const [song, setSong] = useRecoilState(nowSongInfo);
    const createPlayer = () => {
        return new Promise((resolve, reject) => {
            const player = new window.Spotify.Player({
                name: 'util에서 생성된 플레이어',
                getOAuthToken: (cb) => {
                    cb(token!);
                },
                volume: 0.5,
            });

            player.addListener('ready', ({ device_id }) => {
                console.log('플레이어 준비됨, device_id:', device_id);
                setDevice(device_id);
                resolve(device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('플레이어 준비 안됨, device_id:', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error('Initialization Error:', message);
                reject(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error('Authentication Error:', message);
                reject(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error('Account Error:', message);
                reject(message);
            });

            player.addListener('playback_error', ({ message }) => {
                console.error('Playback Error:', message);
                reject(message);
            });

            player.connect();
        });
    };
    const play = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setSong((prev) => {
                    return { ...prev, is_playing: true };
                });
            }
            if (response.status == 401) {
                const { access_token } = await getSdkTokenWithRefreshToken();
                setLocalStorage('sdkAccessToken', access_token);
                const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                if (response.ok) {
                    setSong((prev) => {
                        return { ...prev, is_playing: true };
                    });
                }
            }
            if (response.status == 404) {
                createPlayer();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const pause = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setSong((prev) => {
                    return { ...prev, is_playing: false };
                });
            }
            if (response.status == 401) {
                const { access_token } = await getSdkTokenWithRefreshToken();
                setLocalStorage('sdkAccessToken', access_token);
                const response = await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                if (response.ok) {
                    setSong((prev) => {
                        return { ...prev, is_playing: false };
                    });
                }
            }
            if (response.status == 404) {
                createPlayer();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return { play, pause };
};
