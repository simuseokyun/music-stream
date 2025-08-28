import axios from 'axios';
import { getLocalStorage } from '../../utils/common/setLocalStorage';

const getWebToken = async () => {
    const access_token = getLocalStorage('webAccessToken');
    const expires_in = getLocalStorage('webExpiration');
    const issuedAt = getLocalStorage('issuedAt');
    const nowTime = Date.now();
    const isValid =
        access_token && expires_in && issuedAt && nowTime - 30000 < Number(issuedAt) + Number(expires_in) * 1000;
    if (isValid) {
        return { access_token, expires_in };
    }
    try {
        const response = await axios.get('/api/webToken');
        const { access_token, expires_in } = response.data;
        const issuedAt = Date.now();
        localStorage.setItem('webAccessToken', access_token);
        localStorage.setItem('webExpiration', expires_in.toString());
        localStorage.setItem('issuedAt', issuedAt.toString());
        return { access_token, expires_in };
    } catch (error) {
        throw new Error('토큰을 발급하는 데 실패했습니다');
    }
};

const getSdkToken = async (authCode: string) => {
    const params = new URLSearchParams({ code: authCode }).toString();
    try {
        const response = await axios.post('/api/auth/sdkToken', params);
        return response.data;
    } catch (error) {
        throw new Error('토큰을 발급하는 데 실패했습니다');
    }
};

export { getWebToken, getSdkToken };
