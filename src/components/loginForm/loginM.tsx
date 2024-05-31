import styled from 'styled-components';
import Cookies from 'js-cookie';
import { loginSpotify } from '../../util';
import { useNavigate } from 'react-router-dom';
import { Button } from '../buttonForm/button';

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
            {!accessToken ? (
                <Button bgColor="#65d46e" onClick={loginSpotify} text="로그인" />
            ) : (
                <Button bgColor="#65d46e" onClick={logout} text="로그아웃" />
            )}
        </Container>
    );
};
