import axios, { AxiosRequestConfig } from 'axios';
import { errorMessages } from '..';
const callSpotifyApi = async (
    url: string,
    accessToken: string,

    options: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        data?: any;
        headers?: Record<string, string>;
    } = {}
) => {
    try {
        const config: AxiosRequestConfig = {
            url,
            method: options.method || 'GET',
            data: options.data,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        const response = await axios(config);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const status = error.response.status;
            const message = errorMessages[status] || error.response.data?.error?.message || error.response.statusText;
            throw new Error(message);
        } else if (error.request) {
            throw new Error('Spotify API로부터 응답이 없습니다.');
        } else {
            throw new Error(error.message);
        }
    }
};

export default callSpotifyApi;
