import { useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/getLocalStorage';
import { setLocalStorage } from '../utils/setLocalStorage';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import {
    deviceInfo,
    playerTracks,
    alertFormState,
    playerTracksStorage,
    playerPrevAndNext,
    nowSongInfo,
} from '../store/atoms';
import { getSdkTokenWithRefreshToken } from '../api/getSdkTokenWithRefreshToken';

export const usePlayMusic = () => {
    const token = getLocalStorage('sdkAccessToken');
    const [deviceId, setDevice] = useRecoilState(deviceInfo);
    const [, setAlertState] = useRecoilState(alertFormState);
    const setNowSongState = useSetRecoilState(nowSongInfo);
    const [allTrackValue, setAllTrackValue] = useRecoilState(playerTracks);
    const storageTracks = useRecoilValue(playerTracksStorage);
    const [, setPlayerTracks] = useRecoilState(playerPrevAndNext);
    // const createPlayer = useCreatePlayer();
    const [nowTrackInfo, setNowTrackInfo] = useState('');
    useEffect(() => {
        if (nowTrackInfo.length) {
            const targetIndex = allTrackValue.findIndex((track) => track.trackUri === nowTrackInfo);

            const [previousTrack, nextTrack] = [
                allTrackValue[targetIndex - 1]
                    ? allTrackValue[targetIndex - 1]
                    : allTrackValue[allTrackValue.length - 1],
                allTrackValue[targetIndex + 1] ? allTrackValue[targetIndex + 1] : allTrackValue[0],
                ,
            ];
            setPlayerTracks([{ ...previousTrack }, { ...nextTrack }]);
        }
    }, [nowTrackInfo]);

    interface S {
        trackUri: string;
        title: string;
        cover: string;
        artist: string;
        pn?: boolean;
    }
    const playMusic = async ({ trackUri, title, cover, artist, pn }: S) => {
        try {
            if (!token && !deviceId) {
                setAlertState((prev) => {
                    return { ...prev, requiredLogin: true };
                });
            } else if (token && deviceId) {
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
                if (response.ok) {
                    if (!pn) {
                        setAllTrackValue(storageTracks);
                    }
                    setNowTrackInfo(trackUri);
                    setNowSongState(() => ({
                        title,
                        cover,
                        artist,
                        is_playing: true,
                    }));
                    return;
                }
                if (response.status === 401) {
                    const newToken = await getSdkTokenWithRefreshToken();
                    if (newToken.access_token) {
                        setLocalStorage('sdkAccessToken', newToken.access_token);
                        const createPlayer = () => {
                            return new Promise((resolve, reject) => {
                                const player = new window.Spotify.Player({
                                    name: '토큰 다시 받고 만든 플레이어',
                                    getOAuthToken: (cb) => {
                                        cb(newToken.access_token!);
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
                        const newDeviceId = await createPlayer();

                        if (newDeviceId) {
                            const response = await fetch(
                                `https://api.spotify.com/v1/me/player/play?device_id=${newDeviceId}`,
                                {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${newToken.access_token}`,
                                    },
                                    body: JSON.stringify({
                                        uris: [trackUri],
                                    }),
                                }
                            );
                            if (!pn) {
                                setAllTrackValue(storageTracks);
                            }
                            setNowTrackInfo(trackUri);
                            setNowSongState(() => ({
                                title,
                                cover,
                                artist,
                                is_playing: true,
                            }));
                            return;
                        } else {
                            throw new Error('새로운 디바이스 생성에러');
                        }
                    } else {
                        throw new Error('에러');
                    }
                }
            }
        } catch (error) {
            console.error('catch문 입장');
            setNowSongState(() => {
                return {
                    title: '',
                    cover: '/assets/basicPlaylist.png',
                    artist: '',
                    is_playing: false,
                };
            });
        }
    };
    return playMusic;
};
