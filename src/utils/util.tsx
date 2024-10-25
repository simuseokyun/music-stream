import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { refreshAccessToken } from '../api/api';
import {
    deviceInfo,
    setMobile,
    addPlaylistState,
    nowSongInfo,
    playlistList,
    playerPrevAndNext,
    playerTracks,
    alertState,
    playerTracksStorage,
} from '../state/atoms';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { create } from 'domain';

export const setLocalStorage = (name: string, value: string) => {
    localStorage.setItem(name, value);
};

export const getLocalStorage = (name: string) => {
    return localStorage.getItem(name);
};

export const loginSpotify = () => {
    const client_id = process.env.REACT_APP_CLIENT_ID || '';
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI || '';
    if (!client_id || !redirect_uri) {
        throw new Error('Spotify 인증 정보가 설정되지 않았습니다. 관리자에게 문의하세요.');
    }
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
export const useLogoutSpotify = () => {
    const setDevice = useSetRecoilState(deviceInfo);
    const { pause } = useToggleSong();
    const logoutSpotify = () => {
        pause();
        localStorage.removeItem('sdkAccessToken');
        localStorage.removeItem('sdkExpiration');
        Cookies.remove('refreshToken');
        window.location.href = '/';
        setDevice(null);
    };
    return { logoutSpotify };
};

export const durationTransform = (duration: number) => {
    const totalSeconds = duration / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { minutes, seconds };
};
export const commaSeparate = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const usePlayMusic = () => {
    const token = getLocalStorage('sdkAccessToken');
    const [deviceId, setDevice] = useRecoilState(deviceInfo);
    const [, setAlertState] = useRecoilState(alertState);
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
                    const newToken = await refreshAccessToken();
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
                    cover: '/images/basicPlaylist.png',
                    artist: '',
                    is_playing: false,
                };
            });
        }
    };
    return playMusic;
};

export const useAddPlaylist = () => {
    const playlists = useRecoilValue(playlistList);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
    const alertFormState = useSetRecoilState(alertState);
    const [openCategory, setOpenCategory] = useState(false);
    const addSong = () => {
        console.log(openCategory, playlists.length);
        if (!playlists.length) {
            alertFormState((prev) => {
                return { ...prev, requiredPlaylist: true };
            });
            return;
        }

        setOpenCategory(() => true);
    };

    const mouseLeave = () => {
        setOpenCategory(() => false);
    };
    return { openCategory, addSong, mouseLeave };
};

export const useAddTrack = (
    id: string,
    name: string,
    cover: string,
    album_title: string,
    artists: { name: string; id: string }[],
    album_id: string,
    uri: string
) => {
    const setPlaylist = useSetRecoilState(playlistList);
    const [dupState, setDupState] = useState<boolean | null>(null);
    const setAlertFormState = useSetRecoilState(alertState);
    useEffect(() => {
        if (dupState) {
            setAlertFormState((prev) => ({ ...prev, duplicateSong: true }));
        } else if (dupState !== null && !dupState) {
            setAlertFormState((prev) => ({ ...prev, addSong: true }));
        }
        setDupState(null);
    }, [dupState]);
    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id, title: name, cover, album_title, artists, album_id, uri };
            const prevArray = prev.map((prev) => {
                if (prev.title === textContent) {
                    const confirm = prev.tracks.find((track) => {
                        return track.uri === uri;
                    });
                    if (confirm) {
                        setDupState(true);
                        return prev;
                    }
                    setDupState(false);

                    return {
                        ...prev,
                        tracks: [...prev.tracks, newTrack],
                    };
                }
                return prev;
            });

            return prevArray;
        });
    };

    return { addTrack };
};

export const useToggleSong = () => {
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
                const { access_token } = await refreshAccessToken();
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
                const { access_token } = await refreshAccessToken();
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
    // const toggleSong = async () => {
    //     const endpoint = song.is_playing ? 'pause' : 'play';
    //     try {
    //         const response = await fetch(`https://api.spotify.com/v1/me/player/${endpoint}?device_id=${deviceId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         if (response.ok) {
    //             console.log(song);
    //             setSong((prev) => {
    //                 return { ...prev, is_playing: true };
    //             });
    //             console.log(song);
    //         }
    //         if (response.status == 401) {
    //             const { access_token } = await refreshToken();
    //             setLocalStorage('sdkAccessToken', access_token);
    //             const response = await fetch(`https://api.spotify.com/v1/me/player/${endpoint}?device_id=${deviceId}`, {
    //                 method: 'PUT',
    //                 headers: {
    //                     Authorization: `Bearer ${access_token}`,
    //                 },
    //             });
    //             if (response.ok) {
    //                 setSong((prev) => {
    //                     return { ...prev, is_playing: !prev.is_playing };
    //                 });
    //             }
    //         }
    //         if (response.status == 404) {
    //             const createPlayer = () => {
    //                 return new Promise((resolve, reject) => {
    //                     const player = new window.Spotify.Player({
    //                         name: 'util에서 생성된 플레이어',
    //                         getOAuthToken: (cb) => {
    //                             cb(token!);
    //                         },
    //                         volume: 0.5,
    //                     });

    //                     player.addListener('ready', ({ device_id }) => {
    //                         console.log('플레이어 준비됨, device_id:', device_id);
    //                         setDevice(device_id);
    //                         resolve(device_id);
    //                     });

    //                     player.addListener('not_ready', ({ device_id }) => {
    //                         console.log('플레이어 준비 안됨, device_id:', device_id);
    //                     });

    //                     player.addListener('initialization_error', ({ message }) => {
    //                         console.error('Initialization Error:', message);
    //                         reject(message);
    //                     });

    //                     player.addListener('authentication_error', ({ message }) => {
    //                         console.error('Authentication Error:', message);
    //                         reject(message);
    //                     });

    //                     player.addListener('account_error', ({ message }) => {
    //                         console.error('Account Error:', message);
    //                         reject(message);
    //                     });

    //                     player.addListener('playback_error', ({ message }) => {
    //                         console.error('Playback Error:', message);
    //                         reject(message);
    //                     });

    //                     player.connect();
    //                 });
    //             };

    //             try {
    //                 const device_id = await createPlayer();
    //                 console.log(device_id);
    //                 const playerResponse = await fetch(
    //                     `https://api.spotify.com/v1/me/player/${endpoint}?device_id=${device_id}`,
    //                     {
    //                         method: 'PUT',
    //                         headers: {
    //                             Authorization: `Bearer ${token}`,
    //                         },
    //                     }
    //                 );
    //                 console.log(playerResponse);
    //                 if (playerResponse.ok) {
    //                     setSong((prev) => {
    //                         return { ...prev, is_playing: !prev.is_playing };
    //                     });
    //                 }
    //             } catch (error) {
    //                 console.error('Error creating player or setting song:', error);
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    return { play, pause };
};

export const useHandleResize = () => {
    const setMobileState = useSetRecoilState(setMobile);
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth <= 768) {
            setMobileState(() => true);
        } else {
            setMobileState(() => false);
        }
    };
    return { isMobile, handleResize };
};

export const extractAuthCodeFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get('code');
};

export const usePagenation = () => {
    const isMobile = useRecoilValue(setMobile);
    const [index, setIndex] = useState(0);
    const onNextBtn = () => {
        if (isMobile) {
            setIndex((prev) => (prev === 6 ? 0 : prev + 1));
        } else {
            setIndex((prev) => (prev === 4 ? 0 : prev + 1));
        }
    };
    const onPrevBtn = () => {
        if (isMobile) {
            setIndex((prev) => (prev === 0 ? 6 : prev - 1));
        } else {
            setIndex((prev) => (prev === 0 ? 4 : prev - 1));
        }
    };
    return { isMobile, index, setIndex, onNextBtn, onPrevBtn };
};

export const useCreatePlayer = () => {
    const sdkToken = getLocalStorage('sdkAccessToken');
    const setDevice = useSetRecoilState(deviceInfo);
    const setSong = useSetRecoilState(nowSongInfo);
    const createPlayer = async () => {
        const player = new window.Spotify.Player({
            name: '최초 생성된 플레이어',
            getOAuthToken: (cb) => {
                if (sdkToken) {
                    cb(sdkToken);
                }
            },
            volume: 0.5,
        });
        return new Promise((resolve, reject) => {
            player.addListener('ready', ({ device_id }) => {
                console.log('플레이어 준비됨, device_id:', device_id);
                setDevice(device_id);
                resolve(device_id);
            });
            player.addListener('not_ready', ({ device_id }) => {
                console.log('플레이어 준비 안됨, device_id:', device_id);
            });
            player.addListener('player_state_changed', (state) => {
                if (state && state.paused && !state.loading) {
                    console.log(state);
                    setSong((prev) => {
                        return { ...prev, is_playing: false };
                    });
                }
            });
            player.addListener('initialization_error', ({ message }) => {
                console.error('Initialization Error:', message);
                player.disconnect();
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error('Authentication Error:', message);
                player.disconnect();
            });

            player.addListener('account_error', ({ message }) => {
                console.error('Account Error:', message);
            });

            player.addListener('playback_error', ({ message }) => {
                console.error('Playback Error:', message);
            });
            player.connect();
        });
    };
    return createPlayer;
};
