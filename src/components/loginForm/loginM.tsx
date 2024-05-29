import styled from 'styled-components';
import Cookies from 'js-cookie';
import { loginSpotify } from '../../util';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.img`
    width: 30px;
    height: 30px;
`;

const Btn = styled.button`
    text-align: center;
    background-color: #65d46e;
    border: none;
    border-radius: 20px;
    padding: 4px 8px;
    margin-top: 5px;
    vertical-align: middle;
`;

export const LoginM = () => {
    const navigate = useNavigate();
    const accessToken = Cookies.get('accessToken');
    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/');
    };
    return (
        <Container>
            <Logo src="/images/spotifyLogo.png" alt="Logo" />
            {!accessToken ? <Btn onClick={loginSpotify}>로그인</Btn> : <Btn onClick={logout}>로그아웃</Btn>}
        </Container>
    );
};
