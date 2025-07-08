import axios, { AxiosRequestConfig } from 'axios';
import StatusError from '../errors/statusError';
const callSpotifyApi = async (
    url: string,
    options: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        token?: string;
        data?: string | Record<string, any>;
        headers?: Record<string, string>;
        refresh?: boolean;
    } = {}
) => {
    try {
        const config: AxiosRequestConfig = {
            url,
            method: options.method || 'GET',
            data: options.data,
            headers: {
                Authorization: options.token
                    ? options.refresh
                        ? `Basic ${options.token}`
                        : `Bearer ${options.token}`
                    : undefined,
                ...options.headers,
            },
        };
        const response = await axios(config);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            throw new StatusError(status);
        } else if (error instanceof SyntaxError || error instanceof TypeError) {
            throw new StatusError(400);
        }
        throw new StatusError(500);
    }
};
export default callSpotifyApi;
