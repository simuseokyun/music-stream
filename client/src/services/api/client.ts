import axios, { AxiosRequestConfig } from 'axios';
import { getWebToken } from '../auth/\bauth';
import { getLocalStorage } from '../../utils/common/setLocalStorage';
const axiosInstance = axios.create({
    baseURL: '',
    withCredentials: true,
});

const axiosWithAuth = async (url: string, options: AxiosRequestConfig = {}) => {
    try {
        const response = await axiosInstance({
            url,
            ...options,
        });
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};
const axiosWithoutAuth = async (url: string) => {
    const baseUrl = 'https://api.spotify.com';
    const token = getLocalStorage('webAccessToken');
    const makeRequest = async (newToken?: string, retryCount = 0) => {
        if (retryCount > 1) {
            throw new Error('토큰 발급에 실패했습니다. 페이지를 다시 접속해주세요');
        }
        try {
            const response = await axios(`${baseUrl + url}`, {
                headers: {
                    Authorization: `Bearer ${newToken ?? token}`,
                },
            });
            const data = response.data;
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 401:
                        const { access_token } = await getWebToken();
                        return await makeRequest(access_token, retryCount + 1);
                    case 403:
                        throw new Error('접근 권한이 없습니다');
                    case 429:
                        throw new Error('제한 속도를 초과하였습니다');
                    default:
                        throw new Error('네트워크 에러');
                }
            } else {
                throw new Error('알 수 없는 에러가 발생했습니다');
            }
        }
    };
    try {
        if (!token) {
            const { access_token } = await getWebToken();
            return await makeRequest(access_token);
        }
        return await makeRequest();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('예상치 못한 에러');
    }
};

export { axiosInstance, axiosWithAuth, axiosWithoutAuth };
