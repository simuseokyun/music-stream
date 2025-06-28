import axios from 'axios';
import { getLocalStorage } from '../../utils/common/setLocalStorage';

const getWebToken = async () => {
    const access_token = getLocalStorage('webAccessToken');
    const expires_in = getLocalStorage('webExpiration');
    const timeNow = Date.now();
    if (access_token && expires_in && parseInt(expires_in, 10) - 10 > timeNow) {
        return { access_token, expires_in };
    }
    try {
        const response = await axios.get('/api/webToken');
        const { access_token, expires_in } = response.data;
        localStorage.setItem('webAccessToken', access_token);
        localStorage.setItem('webExpiration', expires_in);
        return { access_token, expires_in };
    } catch (error) {
        throw new Error('웹 토큰 받아오기 실패');
    }
};

const getSdkToken = async (authCode: string) => {
    try {
        const response = await axios.post('/api/auth/token', new URLSearchParams({ code: authCode }));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getWebToken, getSdkToken };
