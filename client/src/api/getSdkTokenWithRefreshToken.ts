import Cookies from 'js-cookie';

export const getSdkTokenWithRefreshToken = async () => {
    const token = Cookies.get('refreshToken') as string;
    const client_id = import.meta.env.VITE_CLIENT_ID || '';
    const client_secret = import.meta.env.VITE_SECRET_ID || '';
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: token,
            client_id: client_id,
            client_secret: client_secret,
        }),
    });
    if (!response.ok) {
        throw new Error('failed');
    }
    const json = await response.json();
    return json;
};
