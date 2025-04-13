import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { useToggleMusic } from './useToggleMusic';
import { deviceInfo } from '../store/atoms';

export const useLogout = () => {
    const setDevice = useSetRecoilState(deviceInfo);
    const { pause } = useToggleMusic();
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
