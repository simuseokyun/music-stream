import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getWebToken, getSdkToken, refreshToken } from '../api/api';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setLocalStorage } from '../utils/util';
import { playlistFixState, addPlaylistState, setMobile } from '../state/atoms';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../components/navForm/sideBar';
import { SearchInput } from '../components/searchForm/searchInput';
import { AddPlaylistForm } from '../components/addPlaylistForm/addplaylistForm';
import { MobileHeader } from '../components/mobileHeaderForm/mobileHeader';
import { PlaylistFixForm } from '../components/myPlaylistForm/playlistFixForm';
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
    const openPlaylist = useRecoilValue(addPlaylistState);
    const fixState = useRecoilValue(playlistFixState);
    const setM = useSetRecoilState(setMobile);
    const [isMobile, setIsMobile] = useState(false);
    const accessToken = Cookies.get('accessToken');

    const { isLoading: tokenLoading, data: tokenData } = useQuery<ISpotifyWebToken>('getWebToken', getWebToken, {
        onSuccess: (data) => {
            setLocalStorage('webAccessToken', data.access_token);
            setLocalStorage('webExpiration', data.expires_in);
        },
        staleTime: 59 * 60 * 1000, // 59분으로 설정 (유효기간이 1시간)
    });

    const home = window.location.href;
    const extractAuthCodeFromUrl = (url: string) => {
        const params = new URLSearchParams(url.split('?')[1]);
        return params.get('code');
    };
    const authCode = extractAuthCodeFromUrl(home) || '';

    const {
        isLoading: sdkLoading,
        data: sdkData,
        error,
    } = useQuery<ISpotifySdkToken>(
        'getSdkToken',
        async () => {
            const token = Cookies.get('accessToken');
            if (!token) {
                const newTokenData = await getSdkToken(authCode);
                return newTokenData;
            }
            return { accessToken: token };
        },
        {
            enabled: !!authCode,
            onSuccess: (data) => {
                Cookies.set('accessToken', data.access_token);
                Cookies.set('refreshToken', data.refresh_token);
                window.history.replaceState({}, document.title, window.location.pathname);
            },
            onError: async (error) => {
                console.log(error);
                if (error === 401) {
                    try {
                        const newAccessToken = await refreshToken();
                        return await getSdkToken(authCode);
                    } catch (refreshError) {
                        console.error('Token refresh failed', refreshError);
                    }
                }
                console.log(error);
            },
        }
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth <= 768) {
                setM((prev) => true);
            } else {
                setM((prev) => false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container>
            {openPlaylist && <AddPlaylistForm />}
            {fixState && <PlaylistFixForm />}
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
