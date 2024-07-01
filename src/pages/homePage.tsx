import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getWebToken, getSdkToken } from '../api/api';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { setLocalStorage, getLocalStorage, useHandleResize, extractAuthCodeFromUrl } from '../utils/util';
import { playlistFixFormState, addPlaylistState, checkFormState } from '../state/atoms';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../components/navForm/sideBar';
import { SearchInput } from '../components/searchForm/searchInput';
import { AddPlaylistForm } from '../components/myPlaylistForm/addMyPlaylist';
import { MobileHeader } from '../components/mobileHeaderForm/mobileHeader';
import { FixPlaylistForm } from '../components/myPlaylistForm/fixMyplaylist';
import { BottomBar } from '../components/navForm/bottomBar';
import { Player } from '../components/playerForm/player';
import { ISpotifySdkToken, ISpotifyWebToken } from '../types/auth';

const Container = styled.div`
    max-width: 1180px;
    margin: auto;
    width: 100%;
`;

const Content = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    padding: 100px 20px 20px 20px;
    @media (max-width: 768px) {
        display: block;
        padding: 0;
    }
`;

export const HomePage = () => {
    const addFormState = useRecoilValue(addPlaylistState);
    const fixFormState = useRecoilValue(playlistFixFormState);
    const accessToken = getLocalStorage('sdkAccessToken');
    const { isMobile, handleResize } = useHandleResize();

    const { isLoading: tokenLoading, data: tokenData } = useQuery<ISpotifyWebToken>('getWebToken', getWebToken, {
        onSuccess: (data) => {
            const { access_token, expires_in } = data;
            setLocalStorage('webAccessToken', access_token);
            setLocalStorage('webExpiration', expires_in);
        },
        staleTime: 59 * 60 * 1000, // 59분으로 설정 (유효기간이 1시간)
    });
    const home = window.location.href;
    const authCode = extractAuthCodeFromUrl(home) || '';
    const { isLoading, data, error } = useQuery<ISpotifySdkToken>(
        ['getSdkToken', accessToken],
        async () => {
            const token = getLocalStorage('sdkAccessToken');
            if (!token) {
                const newTokenData = await getSdkToken(authCode);
                return newTokenData;
            }
            return { accessToken: token };
        },
        {
            enabled: !!authCode,
            onSuccess: (data) => {
                const { access_token, refresh_token } = data;
                setLocalStorage('sdkAccessToken', access_token);
                Cookies.set('refreshToken', refresh_token);
                window.history.replaceState({}, document.title, window.location.pathname);
            },
        }
    );

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container>
            {addFormState && <AddPlaylistForm />}
            {fixFormState && <FixPlaylistForm />}
            <SearchInput />
            <Content>
                {isMobile ? <MobileHeader /> : <SideBar />}
                {tokenData && <Outlet />}
            </Content>
            {accessToken && <Player />}
            {isMobile && <BottomBar />}
        </Container>
    );
};
