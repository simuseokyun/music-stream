import react from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const LoginBtn = styled.button`
    width: 100px;
    height: 35px;
    background-color: #00ff00;
    border-radius: 20px;
    border: none;
    font-weight: 700;
`;
const Logo = styled.img`
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
`;

export const LoginForm = () => {
    const clientId = '9b1aa9c5e93a407f8a2253ef5cd7b2c4';
    const redirectUri = 'http://localhost:3000/home';
    const loginSpotify = () => {
        const scopes =
            'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming';
        const state = Math.random().toString(36).substring(7);
        // const state = '99';
        const queryParams = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scopes,
            redirect_uri: redirectUri,
            state: state,
        });
        const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
        window.location.href = authUrl;
    };
    return (
        <Container>
            <Logo src="/spotifyLogo.png" alt="Logo" />
            <LoginBtn onClick={loginSpotify}>로그인</LoginBtn>
        </Container>
    );
};
