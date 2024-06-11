import styled from 'styled-components';
import Cookies from 'js-cookie';
import { loginSpotify, logout } from '../../utils/util';
import { useSetRecoilState } from 'recoil';
import { deviceInfo } from '../../state/atoms';
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

export const MobileHeader = () => {
    const accessToken = Cookies.get('accessToken');
    const setDevice = useSetRecoilState(deviceInfo);

    const logoutBtn = () => {
        logout();
        setDevice(null);
    };
    return (
        <Container>
            <Logo src="/images/spotifyLogo.png" alt="Logo" />
            {!accessToken ? (
                <Button bgColor="#65d46e" onClick={loginSpotify} text="로그인" />
            ) : (
                <Button bgColor="#65d46e" onClick={logoutBtn} text="로그아웃" />
            )}
        </Container>
    );
};
