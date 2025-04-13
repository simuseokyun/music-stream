const client_id = import.meta.env.VITE_CLIENT_ID || '';
const client_secret = import.meta.env.VITE_SECRET_ID || '';
const redirect_uri = import.meta.env.VITE_REDIRECT_URI || '';

export const getSdkToken = async (authCode: string) => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: authCode,
            redirect_uri,
            grant_type: 'authorization_code',
            client_id,
            client_secret,
        }),
    });
    if (!response.ok) {
        throw new Error('failed');
    }
    const json = await response.json();
    return json;
};
