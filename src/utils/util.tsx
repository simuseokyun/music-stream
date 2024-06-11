import Cookies from 'js-cookie';
import { refreshToken } from '../api/api';
import { deviceInfo } from '../state/atoms';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { nowSongInfo, playlistList } from '../state/atoms';
import { useState } from 'react';
import { addPlaylistState } from '../state/atoms';

export const setLocalStorage = (name: string, value: string) => {
    localStorage.setItem(name, value);
};

export const getLocalStorage = (name: string) => {
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
    const seconds = Math.floor(totalSeconds % 60);
    return { minutes, seconds };
};
export const commaSeparate = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/';
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

export const useHandleSongClick = () => {
    const accessToken = Cookies.get('accessToken');
    const deviceId = useRecoilValue(deviceInfo);
    const [song, setNowSong] = useRecoilState(nowSongInfo);
    const handleSongClick = async (trackUri: string, title: string, cover: string, artist: string) => {
        try {
            if (!accessToken) {
                alert('로그인이 필요한 서비스입니다');
                return;
            }
            if (deviceId) {
                await playSong(trackUri, deviceId);
                setNowSong((prev) => {
                    return { title, cover, artist, is_playing: true };
                });
            } else {
                logout();
                alert('웹 플레이어를 생성하기 위해 로그아웃 하겠습니다');
                return;
            }
        } catch (error) {
            console.error('노래를 재생하는 중 에러 발생:', error);
            setNowSong((prev) => {
                return { title: '실행 오류', cover: '', artist: '', is_playing: false };
            });
        }
    };

    return handleSongClick;
};

export const useAddPlaylist = () => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
    const [open, setOpen] = useState(false);
    const toggleAddBtn = () => {
        if (!playlists.length) {
            alert('먼저 플레이리스트를 생성해주세요');
            addPlaylistFormState(true);
            return;
        }
        setOpen(() => true);
    };

    const mouseLeave = () => {
        setOpen(() => false);
    };
    return { open, toggleAddBtn, mouseLeave };
};

export const useAddTrack = (
    name: string,
    duration_ms: number,
    cover: string,
    album_title: string,
    artists: { name: string; id: string }[],
    album_id: string,
    uri: string
) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent, id },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id: name, title: name, duration_ms, cover, album_title, artists, album_id, uri };
            const prevArray = prev.map((prev) => {
                if (prev.title === textContent) {
                    const confirm = prev.tracks.find((ele) => {
                        return ele.title === name;
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
    const token = Cookies.get('accessToken');
    const [song, setSong] = useRecoilState(nowSongInfo);
    const toggleSong = async () => {
        const endpoint = song.is_playing ? 'pause' : 'play';
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/${endpoint}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log(`노래를 ${endpoint === 'pause' ? '정지' : '재생'}했습니다.`);
                setSong((prev) => {
                    return { ...prev, is_playing: !prev.is_playing };
                });
            } else {
                console.error(
                    `노래를 ${endpoint === 'pause' ? '정지' : '재생'}하는 중 오류가 발생했습니다:`,
                    response.status
                );
            }
        } catch (error) {
            console.error(`노래를 ${endpoint === 'pause' ? '정지' : '재생'}하는 중 오류가 발생했습니다:`, error);
        }
    };
    return { toggleSong };
};
