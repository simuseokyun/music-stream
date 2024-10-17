import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { deviceInfo, nowSongInfo, playerPrevAndNext } from '../../state/atoms';
import { useEffect, useRef, useState } from 'react';
import {
    useToggleSong,
    getLocalStorage,
    setLocalStorage,
    usePlayMusic,
    durationTransform,
    useCreatePlayer,
} from '../../utils/util';
import * as S from './player.style';
import { refreshAccessToken } from '../../api/api';

export const Player = () => {
    const setDevice = useSetRecoilState(deviceInfo);
    const createPlayer = useCreatePlayer();
    const sdkToken = getLocalStorage('sdkAccessToken');
    const song = useRecoilValue(nowSongInfo);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const playMusic = usePlayMusic();
    const { play, pause } = useToggleSong();
    const prevAndNext = useRecoilValue(playerPrevAndNext);
    useEffect(() => {
        const loadSpotifySDK = async () => {
            return new Promise<void>((resolve, reject) => {
                let script = document.querySelector(
                    'script[src="https://sdk.scdn.co/spotify-player.js"]'
                ) as HTMLScriptElement;
                if (!script) {
                    script = document.createElement('script');
                    script.src = 'https://sdk.scdn.co/spotify-player.js';
                    script.async = true;
                    document.body.appendChild(script);
                }
                window.onSpotifyWebPlaybackSDKReady = () => {
                    resolve();
                };
                // script.onerror = () => {
                //     reject(new Error('Spotify SDK 로드 실패'));
                // };

                // 이미 로드된 경우를 대비하여 추가
                if (window.Spotify && window.Spotify.Player) {
                    resolve();
                }
            });
        };

        const checkTokenValidity = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${sdkToken}`,
                    },
                });
                if (response.ok) {
                    return true;
                } else if (response.status === 401) {
                    const newTokenData = await refreshAccessToken();
                    const newAccessToken = newTokenData.access_token;
                    console.log(newTokenData, newAccessToken);
                    setLocalStorage('sdkAccessToken', newAccessToken);
                    return true;
                } else {
                    throw new Error('네트워크 오류');
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        };

        const initializeSpotify = async () => {
            await loadSpotifySDK();
            if (sdkToken) {
                try {
                    const isValid = await checkTokenValidity();
                    if (isValid) {
                        console.log('토큰이 유효합니다.');
                        createPlayer();
                    } else {
                        console.log('토큰이 유효하지 않습니다.');
                    }
                } catch (error) {
                    console.error('초기화 중 오류 발생:', error);
                }
            } else {
                const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
                if (script) {
                    document.body.removeChild(script);
                    setDevice(null);
                }
            }
        };
        initializeSpotify();
        return () => {
            const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
            if (script) {
                document.body.removeChild(script);
                setDevice(null);
            }
        };
    }, [sdkToken]);

    const prev = () => {
        if (Object.keys(prevAndNext[0] || {}).length) {
            playMusic(prevAndNext[0].uri, prevAndNext[0].title, prevAndNext[0].cover, prevAndNext[0].name, true);
        }
    };

    const next = () => {
        if (Object.keys(prevAndNext[1]).length || {}) {
            playMusic(prevAndNext[1].uri, prevAndNext[1].title, prevAndNext[1].cover, prevAndNext[1].name, true);
        }
    };

    // * 노래 제목 길면 애니메이션 작동
    useEffect(() => {
        if (textRef.current && divRef.current) {
            setShouldAnimate(textRef.current.clientWidth > divRef.current.clientWidth - 50);
        }
    }, [song.title]);
    return (
        <>
            <S.Container $song={song.title ?? null}>
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
                            <S.SetPlayer>
                                <S.PrevBtn src="/images/previousBtn.png" onClick={prev} />
                                {song.is_playing ? (
                                    <S.StopBtn src="/images/stopBtn.png" onClick={pause} />
                                ) : (
                                    <S.PlayBtn src="/images/playBtn.png" onClick={play} />
                                )}
                                <S.NextBtn src="/images/nextBtn.png" onClick={next} />
                            </S.SetPlayer>
                        </S.PlayerCenter>
                        <S.PlayerRight></S.PlayerRight>
                    </S.PlayerForm>
                </S.Wrap>
            </S.Container>
        </>
    );
};
