// 공통 함수들

import Cookies from 'js-cookie';
import { refreshToken } from '../api/api잠시주석';
import {
    deviceInfo,
    setMobile,
    addPlaylistState,
    nowSongInfo,
    playlistList,
    playerPrevAndNext,
    playerTracks,
} from '../state/atoms';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { useState } from 'react';

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
        console.error('유효하지 않은 정보');
        return;
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
    const { toggleSong } = useToggleSong();
    const logoutSpotify = () => {
        toggleSong();
        localStorage.removeItem('sdkAccessToken');
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

export async function playSong(trackUri: string, deviceId: string) {
    const token = getLocalStorage('sdkAccessToken');
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
            setLocalStorage('sdkAccessToken', access_token);
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
                console.error('노래를 재생하는 중 문제가 발생했습니다.');
            }
        } catch (error) {
            alert('로그인이 필요한 서비스입니다.');
        }
    }
}
// * 노래 재생 로직 ( 수정 필요 )
// export const usePlayMusic = () => {
//     const accessToken = getLocalStorage('sdkAccessToken');
//     const [deviceId, setDevice] = useRecoilState(deviceInfo);
//     const setNowSong = useSetRecoilState(nowSongInfo);
//     const allTrackValue = useRecoilValue(playerTracks);
//     const setPlayerTracks = useSetRecoilState(playerPrevAndNext);
//     const playMusic = async (trackUri: string, title: string, cover: string, artist: string) => {
//         const targetIndex = allTrackValue.findIndex((track) => track.uri === trackUri);
//         const [previousTrack, nextTrack] = [allTrackValue[targetIndex - 1], allTrackValue[targetIndex + 1]];
//         setPlayerTracks([{ ...previousTrack }, { ...nextTrack }]);
//         try {
//             if (!accessToken) {
//                 alert('로그인이 필요한 서비스입니다');
//                 return;
//             }
//             if (deviceId) {
//                 await playSong(trackUri, deviceId);
//                 setNowSong((prev) => {
//                     return { title, cover, artist, is_playing: true };
//                 });
//             } else {
//                 const newToken = await refreshToken();
//                 if (newToken) {
//                     setLocalStorage('sdkAccessToken', newToken);
//                     const createPlayer = () => {
//                         const player = new window.Spotify.Player({
//                             name: '테스트 플레이어',
//                             getOAuthToken: (cb) => {
//                                 cb(newToken);
//                             },
//                             volume: 0.5,
//                         });
//                         player.addListener('ready', ({ device_id }) => {
//                             console.log('플레이어 준비됨, device_id:', device_id);
//                             setDevice(device_id);
//                         });
//                         player.addListener('not_ready', ({ device_id }) => {
//                             console.log('플레이어 준비 안됨, device_id:', device_id);
//                         });

//                         player.addListener('initialization_error', ({ message }) => {
//                             console.error('Initialization Error:', message);
//                         });

//                         player.addListener('authentication_error', ({ message }) => {
//                             console.error('Authentication Error:', message);
//                         });

//                         player.addListener('account_error', ({ message }) => {
//                             console.error('Account Error:', message);
//                         });

//                         player.addListener('playback_error', ({ message }) => {
//                             console.error('Playback Error:', message);
//                         });
//                         player.connect();
//                     };
//                     createPlayer(); // 새로운 디바이스 ID를 가져옵니다.
//                     if (deviceId) {
//                         await playSong(trackUri, deviceId);
//                         setNowSong((prev) => ({
//                             title,
//                             cover,
//                             artist,
//                             is_playing: true,
//                         }));
//                     } else {
//                         alert('세션이 만료');
//                     }
//                 } else {
//                     alert('세션이 만료2');
//                 }
//             }
//         } catch (error) {
//             console.error('노래를 재생하는 중 에러 발생:');
//             setNowSong((prev) => {
//                 return { title: '실행 오류', cover: '/images/basicPlaylist.png', artist: '', is_playing: false };
//             });
//         }
//     };
//     return playMusic;
// };
export const usePlayMusic = () => {
    const accessToken = getLocalStorage('sdkAccessToken');
    const [deviceId, setDevice] = useRecoilState(deviceInfo);
    const setNowSong = useSetRecoilState(nowSongInfo);
    const allTrackValue = useRecoilValue(playerTracks);
    const setPlayerTracks = useSetRecoilState(playerPrevAndNext);
    const createPlayer = useCreatePlayer();
    const playMusic = async (trackUri: string, title: string, cover: string, artist: string, playTime: number) => {
        const targetIndex = allTrackValue.findIndex((track) => track.uri === trackUri);
        const [previousTrack, nextTrack] = [allTrackValue[targetIndex - 1], allTrackValue[targetIndex + 1]];
        setPlayerTracks([{ ...previousTrack }, { ...nextTrack }]);
        try {
            if (!accessToken && !deviceId) {
                alert('로그인이 필요한 서비스입니다');
                return;
            }
            if (!deviceId) {
                alert('잠시만 기다려주세요');
                const newToken = await refreshToken();
                if (newToken) {
                    setLocalStorage('sdkAccessToken', newToken);
                    createPlayer();

                    if (deviceId) {
                        await playSong(trackUri, deviceId);
                        setNowSong(() => ({
                            title,
                            cover,
                            artist,
                            is_playing: true,
                            playTime,
                        }));
                    } else {
                        alert('디바이스가 생성이 왜 안됨');
                    }
                } else {
                    alert('리프레쉬 토큰이 실행안됨');
                }
            }
            if (deviceId && accessToken) {
                await playSong(trackUri, deviceId);
                setNowSong((prev) => {
                    return { title, cover, artist, is_playing: true, playTime };
                });
            } else {
                throw new Error('error');
            }
        } catch (error) {
            console.error('catch문 입장');
            setNowSong(() => {
                return {
                    title: '실행 오류',
                    cover: '/images/basicPlaylist.png',
                    playTime: null,
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
    const [openCategory, setOpenCategory] = useState(false);
    const addSong = () => {
        if (!playlists.length) {
            alert('먼저 플레이리스트를 생성해주세요');
            addPlaylistFormState(true);
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
    duration_ms: number,
    cover: string,
    album_title: string,
    artists: { name: string; id: string }[],
    album_id: string,
    uri: string
) => {
    const setPlaylist = useSetRecoilState(playlistList);
    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id, title: name, duration_ms, cover, album_title, artists, album_id, uri };
            const prevArray = prev.map((prev) => {
                if (prev.title === textContent) {
                    const confirm = prev.tracks.find((track) => {
                        return track.uri === uri;
                    });
                    if (confirm) {
                        alert('이미 플레이리스트에 곡이 존재합니다');
                        return prev;
                    }
                    alert('곡을 추가했습니다');
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
    const toggleSong = async () => {
        const endpoint = song.is_playing ? 'pause' : 'play';
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/me/player/${endpoint}?play?device_id=${deviceId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                setSong((prev) => {
                    return { ...prev, is_playing: !prev.is_playing };
                });
            }
            if (response.status == 401) {
                const { access_token } = await refreshToken();
                setLocalStorage('sdkAccessToken', access_token);

                const response = await fetch(
                    `https://api.spotify.com/v1/me/player/${endpoint}?play?device_id=${deviceId}`,
                    {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                );
                if (response.ok) {
                    setSong((prev) => {
                        return { ...prev, is_playing: !prev.is_playing };
                    });
                }
            }
            if (response.status == 404) {
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

                try {
                    const device_id = await createPlayer();
                    console.log(device_id);
                    const playerResponse = await fetch(
                        `https://api.spotify.com/v1/me/player/${endpoint}?device_id=${device_id}`,
                        {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log(playerResponse);
                    if (playerResponse.ok) {
                        setSong((prev) => {
                            return { ...prev, is_playing: !prev.is_playing };
                        });
                    }
                } catch (error) {
                    console.error('Error creating player or setting song:', error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    return { toggleSong };
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
    const createPlayer = () => {
        const player = new window.Spotify.Player({
            name: 'util에서 생성된 플레이어',
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
            console.log('플레이어 준비 안됨, device_id:', device_id);
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
    return createPlayer;
};
