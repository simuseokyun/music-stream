import styled from 'styled-components';
import { loginSpotify } from '../../utils/util';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { Button } from './buttonForm/Button';
import { useLogout } from '../../hooks/useLogout';
const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: black;
    padding: 20px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 21;
`;

const Logo = styled.img`
    width: 30px;
    height: 30px;
`;

export const MobileHeader = () => {
    const sdkAccessToken = getLocalStorage('sdkAccessToken');
    const { logoutSpotify } = useLogout();

    return (
        <Header>
            <Logo src="/assets/logo.png" alt="로고" />
            {!sdkAccessToken ? (
                <Button bgColor="#65d46e" onClick={loginSpotify} text="로그인" />
            ) : (
                <Button bgColor="#e2e2e2" onClick={logoutSpotify} text="로그아웃" />
            )}
        </Header>
    );
};
