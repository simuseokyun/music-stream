import { getLocalStorage } from '../utils/getLocalStorage';
import { useSetRecoilState } from 'recoil';
import { deviceInfo, nowSongInfo } from '../store/atoms';

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
