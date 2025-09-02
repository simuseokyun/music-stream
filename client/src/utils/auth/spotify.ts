const redirectToSpotify = () => {
    const client_id = '9b1aa9c5e93a407f8a2253ef5cd7b2c4';
    const redirect_uri = 'http://ec2-3-34-190-12.ap-northeast-2.compute.amazonaws.com:8000';
    console.log(client_id);
    if (!client_id || !redirect_uri) {
        throw new Error('인증 정보가 설정되지 않았습니다');
    }
    const scope =
        'user-read-private user-read-email user-library-read user-library-modify playlist-modify-public playlist-modify-private  user-follow-read user-follow-modify';
    const state = Math.random().toString(36).substring(7);
    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        state,
    }).toString();
    const authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
    window.location.href = authUrl;
};

export default redirectToSpotify;
