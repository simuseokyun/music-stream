import axios from 'axios';
import { getLocalStorage } from '../../utils/common/setLocalStorage';

const getWebToken = async () => {
    const access_token = getLocalStorage('webAccessToken');
    const expires_in = getLocalStorage('webExpiration');
    const issuedAt = getLocalStorage('issuedAt');
    const nowTime = Date.now();
    const isValid =
        access_token && expires_in && issuedAt && nowTime - 300000 < Number(issuedAt) + Number(expires_in) * 1000;
    if (isValid) {
        return { access_token, expires_in };
    }
    try {
        const response = await axios.get(`/api/webToken`);
        const { access_token, expires_in } = response.data;
        const issuedAt = Date.now();
        if (access_token) {
            localStorage.setItem('webAccessToken', access_token);
            localStorage.setItem('webExpiration', expires_in.toString());
            localStorage.setItem('issuedAt', issuedAt.toString());
            return { access_token, expires_in };
        } else {
            throw new Error('엑세스 토큰 없음');
        }
    } catch (error) {
        throw new Error('토큰을 발급하는 데 실패했습니다');
    }
};

const getSdkToken = async (authCode: string) => {
    try {
        console.log(`오쓰${authCode}`);
        const response = await axios.post('/api/auth/sdkToken', { code: authCode });
        return response.data;
    } catch (error) {
        throw new Error('토큰을 발급하는 데 실패했습니다');
    }
};

export { getWebToken, getSdkToken };
