import styled from 'styled-components';
import Cookies from 'js-cookie';
import { getLocalStorage, loginSpotify, useLogoutSpotify } from '../../utils/util';
import { useSetRecoilState } from 'recoil';
import { deviceInfo } from '../../state/atoms';
import { Button } from '../common/buttonForm/button';
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
    const accessToken = getLocalStorage('sdkAccessToken');
    const { logoutSpotify } = useLogoutSpotify();

    return (
        <Container>
            <Logo src="/images/spotifyLogo.png" alt="Logo" />
            {!accessToken ? (
                <Button bgColor="#65d46e" onClick={loginSpotify} text="로그인" />
            ) : (
                <Button bgColor="#e2e2e2" onClick={logoutSpotify} text="로그아웃" />
            )}
        </Container>
    );
};
