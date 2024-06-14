import { useSetRecoilState, useRecoilValue } from 'recoil';
import { deviceInfo, nowSongInfo } from '../../state/atoms';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useToggleSong } from '../../utils/util';
import * as S from './player.style';

export const Player = () => {
    const setDevice = useSetRecoilState(deviceInfo);
    const song = useRecoilValue(nowSongInfo);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const useToggle = useToggleSong();
    const { toggleSong } = useToggle;
    const token = Cookies.get('accessToken');
    console.log('플레이어 랜더링');

    // 웹 플레이어 생성 로직
    function makePlayer() {}
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
                    console.log('노래 끝');
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
            toggleSong();
        };
    }, [token]);
    // * 노래 제목 길면 애니메이션 작동
    useEffect(() => {
        if (textRef.current && divRef.current) {
            setShouldAnimate(textRef.current.clientWidth > divRef.current.clientWidth);
        }
    }, [song.title]);

    return (
        <>
            {token && (
                <S.Container>
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
                                {song.is_playing ? (
                                    <S.SongBtn className="material-symbols-outlined" onClick={toggleSong}>
                                        stop
                                    </S.SongBtn>
                                ) : (
                                    <S.SongBtn className="material-symbols-outlined" onClick={toggleSong}>
                                        play_circle
                                    </S.SongBtn>
                                )}
                            </S.PlayerCenter>
                            <S.PlayerRight></S.PlayerRight>
                        </S.PlayerForm>
                    </S.Wrap>
                </S.Container>
            )}
        </>
    );
};
