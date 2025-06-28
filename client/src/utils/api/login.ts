const onLogin = () => {
    const client_id = import.meta.env.VITE_CLIENT_ID || '';
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI || '';
    if (!client_id || !redirect_uri) {
        throw new Error('Spotify 인증 정보가 설정되지 않았습니다. 관리자에게 문의하세요.');
    }
    const scope =
        'user-read-private user-read-email user-library-read user-library-modify playlist-modify-public playlist-modify-private';
    const state = Math.random().toString(36).substring(7);
    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        state,
    });
    const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
    window.location.href = authUrl;
};

export default onLogin;
