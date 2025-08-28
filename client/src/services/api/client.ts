import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { ApiResponse } from '../../types/api/auth';
import { getWebToken } from '../auth/auth';
import { getLocalStorage } from '../../utils/common/setLocalStorage';

const axiosInstance = axios.create({
    baseURL: '',
    withCredentials: true,
});

const getDataWithAuth = async (url: string, options: AxiosRequestConfig = {}) => {
    try {
        const response = await axiosInstance({
            url,
            ...options,
        });
        const data = response.data;
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            const code = error.response?.status;
            switch (code) {
                case 400:
                    throw new Error('필요한 정보가 누락되었습니다');
                case 401:
                    throw new Error('로그인이 필요합니다');
                case 403:
                    throw new Error('접근 권한이 없습니다');
                case 404:
                    throw new Error('요청한 리소스를 찾을 수 없습니다');
                case 429:
                    throw new Error('제한 속도를 초과하였습니다');
                default:
                    throw new Error(error.message || '알 수 없는 에러가 발생했습니다');
            }
        } else {
            throw new Error('알 수 없는 에러가 발생했습니다.');
        }
    }
};
const getDataWithoutAuth = async <T extends ApiResponse>(url: string): Promise<T> => {
    const baseUrl = 'https://api.spotify.com';
    const token = getLocalStorage('webAccessToken');
    const makeRequest = async <T extends any>(newToken?: string, retryCount = 0): Promise<T> => {
        if (retryCount > 1) {
            throw new Error('토큰 발급에 실패했습니다');
        }
        try {
            const response = await axios(`${baseUrl + url}`, {
                headers: {
                    Authorization: `Bearer ${newToken ?? token}`,
                },
            });
            const data = response.data as T;
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 400:
                        throw new Error('필요한 정보가 누락되었습니다');
                    case 401:
                        const { access_token } = await getWebToken();
                        return await makeRequest(access_token, retryCount + 1);
                    case 403:
                        throw new Error('접근 권한이 없습니다');
                    case 429:
                        throw new Error('제한 속도를 초과하였습니다');
                    default:
                        throw new Error(error.message || '알 수 없는 에러가 발생했습니다');
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

export { axiosInstance, getDataWithAuth, getDataWithoutAuth };
