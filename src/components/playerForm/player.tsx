import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { deviceInfo, nowSongInfo, playerPrevAndNext } from '../../state/atoms';
import { useEffect, useRef, useState } from 'react';
import { useToggleSong, getLocalStorage, setLocalStorage, usePlayMusic } from '../../utils/util';
import * as S from './player.style';
import { refreshToken } from '../../api/api';
import { timeStamp } from 'console';

export const Player = () => {
    const [device, setDevice] = useRecoilState(deviceInfo);
    const [song, setSong] = useRecoilState(nowSongInfo);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const playMusic = usePlayMusic();
    const useToggle = useToggleSong();
    const { toggleSong } = useToggle;
    const sdkToken = getLocalStorage('sdkAccessToken');
    const prevAndNext = useRecoilValue(playerPrevAndNext);

    const prev = () => {
        if (Object.keys(prevAndNext[0]).length) {
            playMusic(prevAndNext[0].uri, prevAndNext[0].title, prevAndNext[0].cover, prevAndNext[0].name);
        } else {
            alert('이전 항목이 없습니다');
        }
    };
    const next = () => {
        if (Object.keys(prevAndNext[1]).length) {
            playMusic(prevAndNext[1].uri, prevAndNext[1].title, prevAndNext[1].cover, prevAndNext[1].name);
        } else {
            alert('다음 항목이 없습니다');
        }
    };

    const createPlayer = () => {
        const player = new window.Spotify.Player({
            name: '집에서 하는 플레이어',
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
        let script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]') as HTMLScriptElement;
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
    // 웹 플레이어 생성 로직
    useEffect(() => {
        console.log('플레이어 랜더링 했습니다');
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

    // * 노래 제목 길면 애니메이션 작동
    useEffect(() => {
        if (textRef.current && divRef.current) {
            setShouldAnimate(textRef.current.clientWidth > divRef.current.clientWidth - 50);
        }
    }, [song.title]);
    return (
        <>
            <S.Container song={song.title}>
                <S.Wrap>
                    <S.PlayerForm>
                        <S.PlayerLeft ref={divRef}>
                            <S.Cover src={song.cover} />
                            <S.Info>
                                <S.Title ref={textRef} shouldAnimate={shouldAnimate}>
                                    {song.title}
                                </S.Title>
                                <S.Artists>{song.artist}</S.Artists>
                            </S.Info>
                        </S.PlayerLeft>
                        <S.PlayerCenter>
                            <S.PrevBtn src="/images/previousBtn.png" onClick={prev} />
                            {song.is_playing ? (
                                <S.StopBtn src="/images/stopBtn.png" onClick={toggleSong} />
                            ) : (
                                <S.PlayBtn src="/images/playBtn.png" onClick={toggleSong} />
                            )}
                            <S.NextBtn src="/images/nextBtn.png" onClick={next} />
                        </S.PlayerCenter>
                        <S.PlayerRight></S.PlayerRight>
                    </S.PlayerForm>
                </S.Wrap>
            </S.Container>
        </>
    );
};
