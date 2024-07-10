import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { deviceInfo, nowSongInfo, playerPrevAndNext } from '../../state/atoms';
import { useEffect, useRef, useState } from 'react';
import { useToggleSong, getLocalStorage, setLocalStorage, usePlayMusic } from '../../utils/util';

import { refreshToken } from '../../api/api잠시주석';

export const CreatePlayer = () => {
    const setDevice = useSetRecoilState(deviceInfo);
    const sdkToken = getLocalStorage('sdkAccessToken');
    const [, setSong] = useRecoilState(nowSongInfo);
    useEffect(() => {
        console.log('플레이어 랜더링 했습니다');
        const createPlayer = () => {
            const player = new window.Spotify.Player({
                name: '분리한 플레이어',
                getOAuthToken: (cb) => {
                    cb(sdkToken!);
                },
                volume: 0.5,
            });
            player.addListener('ready', ({ device_id }) => {
                console.log('플레이어 준비됨, device_id:', device_id);
                setDevice(device_id);
            });
            player.addListener('not_ready', ({ device_id }) => {
                console.log('플레이어 준비 안됨');
            });

            player.addListener('player_state_changed', (state) => {
                if (state && state.paused && !state.loading) {
                    setSong((prev) => {
                        return { ...prev, is_playing: false };
                    });
                }
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error('Initialization Error:', message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error('Authentication Error:', message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error('Account Error:', message);
            });

            player.addListener('playback_error', ({ message }) => {
                console.error('Playback Error:', message);
            });
            player.connect();
        };
        const loadSpotifySDK = () => {
            let script = document.querySelector(
                'script[src="https://sdk.scdn.co/spotify-player.js"]'
            ) as HTMLScriptElement;
            if (!script) {
                script = document.createElement('script');
                script.src = 'https://sdk.scdn.co/spotify-player.js';
                script.async = true;
                document.body.appendChild(script);
            } else {
                if (window.Spotify && window.Spotify.Player) {
                    createPlayer();
                }
            }
            window.onSpotifyWebPlaybackSDKReady = createPlayer;
        };
        const checkTokenValidity = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${sdkToken}`,
                    },
                });
                if (response.ok) {
                    // 토큰 유효
                    return true;
                } else {
                    // 토큰 만료
                    const newTokenData = await refreshToken();
                    const newAccessToken = newTokenData.access_token;
                    setLocalStorage('sdkAccessToken', newAccessToken);
                    return true;
                }
            } catch (error) {
                return false; // 요청 중 오류 발생
            }
        };
        if (sdkToken) {
            checkTokenValidity();
            loadSpotifySDK();
        } else {
            const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
            if (script) {
                document.body.removeChild(script);
                setDevice(null);
            }
        }
        return () => {
            const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
            if (script) {
                document.body.removeChild(script);
                setDevice(null);
            }
        };
    }, [sdkToken]);
    return <></>;
};
