import { getWebToken } from './getWebToken';

export const fetchHelper = async (url: string, token: string) => {
    const makeRequest = async (token: string) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    };
    let response = await makeRequest(token);
    if (response.status === 401) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.message === 'The access token expired') {
            const newTokenData = await getWebToken();
            response = await makeRequest(newTokenData.access_token);
        }
    }
    if (!response.ok && response.status !== 401) {
        throw new Error('failed');
    }
    const json = await response.json();
    return json;
};
