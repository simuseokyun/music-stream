import styled, { keyframes, css } from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { deviceInfo, nowSongInfo, playerPrevAndNext } from '../../state/atoms';
import { useEffect, useRef, useState } from 'react';
import { useToggleSong, getLocalStorage, setLocalStorage, usePlayMusic, useCreatePlayer } from '../../utils/util';
import { refreshAccessToken } from '../../api/api';

const Container = styled.div<{ $song: string | null }>`
    width: 100%;
    position: fixed;
    left: 0;
    bottom: ${({ $song }) => ($song ? '0' : '-100px')};
    transition: all 0.5s;
    z-index: 10;
    background: rgba(0, 0, 0, 0.9);
    @media (max-width: 768px) {
        bottom: ${({ $song }) => ($song ? '50px' : '-100px')};
    }
`;

export const PlayerWrap = styled.div`
    max-width: 1180px;
    height: 100%;
    padding: 15px;
    margin: auto;
    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const PlayerForm = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;
export const PlayerLeft = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
`;
export const PlayerCenter = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        justify-content: right;
    }
`;
export const PlayerRight = styled.div`
    flex: 1;
    @media (max-width: 768px) {
        display: none;
    }
`;
export const SetPlayer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        justify-content: right;
    }
`;

const Artists = styled.p`
    font-size: 12px;
    color: rgb(160, 160, 160);
    margin-top: 5px;
`;
const StopBtn = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
    @media (max-width: 768px) {
        &:hover {
            transform: none;
        }
    }
`;
const PlayBtn = styled(StopBtn)``;
const PrevBtn = styled.img`
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    &:hover {
        transform: scale(1.1);
    }
    @media (max-width: 768px) {
        &:hover {
            transform: none;
        }
    }
`;
const NextBtn = styled(PrevBtn)`
    margin-left: 10px;
`;
const Cover = styled.img`
    width: 50px;
    height: 50px;
    @media (max-width: 768px) {
        width: 35px;
        height: 35px;
    }
`;
const Info = styled.div`
    width: 100%;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
`;
const Title = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'shouldAnimate',
})<{ shouldAnimate: boolean }>`
    font-size: 14px;
    display: inline-block;
    ${({ shouldAnimate }) =>
        shouldAnimate &&
        css`
            animation: ${marquee} 10s linear infinite;
        `}
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

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
    console.log(prevAndNext);
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
        if (Object.keys(prevAndNext[0])) {
            playMusic({
                trackUri: prevAndNext[0].trackUri,
                title: prevAndNext[0].title,
                cover: prevAndNext[0].cover,
                artist: prevAndNext[0].name,
                pn: true,
            });
        } else {
            return null;
        }
    };

    const next = () => {
        if (Object.keys(prevAndNext[1])) {
            playMusic({
                trackUri: prevAndNext[1].trackUri,
                title: prevAndNext[1].title,
                cover: prevAndNext[1].cover,
                artist: prevAndNext[1].name,
                pn: true,
            });
        } else {
            return null;
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
            <Container $song={song.title ?? null}>
                <PlayerWrap>
                    <PlayerForm>
                        <PlayerLeft ref={divRef}>
                            <Cover src={song.cover} />
                            <Info>
                                <Title ref={textRef} shouldAnimate={shouldAnimate}>
                                    {song.title}
                                </Title>
                                <Artists>{song.artist}</Artists>
                            </Info>
                        </PlayerLeft>
                        <PlayerCenter>
                            <PrevBtn src="/images/previousBtn.png" alt="Prev" onClick={prev} />
                            {song.is_playing ? (
                                <StopBtn src="/images/stopBtn.png" alt="정지" onClick={pause} />
                            ) : (
                                <PlayBtn src="/images/playBtn.png" alt="재생" onClick={play} />
                            )}
                            <NextBtn src="/images/nextBtn.png" alt="Next" onClick={next} />
                        </PlayerCenter>
                        <PlayerRight></PlayerRight>
                    </PlayerForm>
                </PlayerWrap>
            </Container>
        </>
    );
};
