import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { deviceInfo, nowSongInfo } from '../../atoms';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

interface IPlaying {
    is_playing: boolean;
    item: { name: string; artists: { name: string }[]; album: { images: { url: string }[] } };
}

const Container = styled.div`
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.9);
    @media (max-width: 768px) {
        bottom: 52px;
        height: 50px;
    }
`;

const Wrap = styled.div`
    max-width: 1180px;
    height: 100%;
    padding: 20px;
    margin: auto;
    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const PlayerForm = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;
const PlayerLeft = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
`;
const PlayerRight = styled.div`
    flex: 1;
    @media (max-width: 768px) {
        display: none;
    }
`;

const PlayerCenter = styled.div`
    flex: 1;
    text-align: center;
    @media (max-width: 768px) {
        text-align: right;
    }
`;
const Cover = styled.img`
    width: 50px;
    height: 50px;
    @media (max-width: 768px) {
        width: 35px;
        height: 35px;
    }
`;
const InfoWrap = styled.div`
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const Title = styled.p`
    margin-bottom: 8px;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
const Artists = styled.p`
    font-size: 12px;
    color: rgb(160, 160, 160);
`;
const SongBtn = styled.span`
    background-color: white;
    color: black;
    font-size: 30px;
    border-radius: 30px;
`;
export const Player = () => {
    const [device, setDevice] = useRecoilState(deviceInfo);
    const [song, setSong] = useRecoilState(nowSongInfo);

    const token = Cookies.get('accessToken');
    const resumeSong = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log('노래를 다시 재생했습니다.');
                setSong((prev) => {
                    return { ...prev, is_playing: true };
                });
            } else {
                console.error('노래를 다시 재생하는 중 오류가 발생했습니다:', response.status);
            }
        } catch (error) {
            console.error('노래를 다시 재생하는 중 오류가 발생했습니다:', error);
        }
    };
    const pauseSong = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log('노래를 정지했습니다.');
                setSong((prev) => {
                    return { ...prev, is_playing: false };
                });
            } else {
                console.error('노래를 정지하는 중 오류가 발생했습니다:', response.status);
            }
        } catch (error) {
            console.error('노래를 정지하는 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        if (token) {
            let script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
            if (!script) {
                const script = document.createElement('script');
                script.src = 'https://sdk.scdn.co/spotify-player.js';
                script.async = true;
                document.body.appendChild(script);
            }
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: '뮤직 플레이어',
                    getOAuthToken: (cb) => {
                        cb(token!);
                    },
                    volume: 0.5,
                });
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                    setDevice(device_id);
                });

                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
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
                player.addListener('player_state_changed', (state) => {
                    if (!state) return;
                    if (state.paused && state.position === 0 && state.track_window.next_tracks.length > 0) {
                    }
                });

                player.connect();
            };
        } else {
            const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
            if (script) {
                document.body.removeChild(script);
                setDevice(null);
            }
        }
        return () => {
            pauseSong();
        };
    }, [token]);

    return (
        <>
            {token && song.title && (
                <Container>
                    <Wrap>
                        <PlayerForm>
                            <PlayerLeft>
                                <Cover src={song.cover} />
                                <InfoWrap>
                                    <Title>{song.title}</Title>
                                    <Artists>{song.artist}</Artists>
                                </InfoWrap>
                            </PlayerLeft>
                            <PlayerCenter>
                                {song.is_playing ? (
                                    <SongBtn className="material-symbols-outlined" onClick={pauseSong}>
                                        stop
                                    </SongBtn>
                                ) : (
                                    <SongBtn className="material-symbols-outlined" onClick={resumeSong}>
                                        play_circle
                                    </SongBtn>
                                )}
                            </PlayerCenter>
                            <PlayerRight></PlayerRight>
                        </PlayerForm>
                    </Wrap>
                </Container>
            )}
        </>
    );
};
