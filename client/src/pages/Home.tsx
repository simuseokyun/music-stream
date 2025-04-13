import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { getWebToken } from '../api/getWebToken';
import { getSdkToken } from '../api/getSdkToken';
import { useRecoilValue } from 'recoil';
import { getLocalStorage } from '../utils/getLocalStorage';
import { setLocalStorage } from '../utils/setLocalStorage';
import { extractAuthCodeFromUrl } from '../utils/extractAuthCodeFromUrl';
import { RequiredLoginAlert } from '../components/common/RequiredLoginAlert';
import { RequiredPlaylist } from '../components/common/RequiredPlaylistAlert';
import { playlistFixFormState, addPlaylistState, alertFormState } from '../store/atoms';
import { useLocation } from 'react-router-dom';

import { Main } from './Main';

import { SideBar } from '../components/common/SideBar';
import { AddPlaylistForm } from '../components/myPlaylistForm/AddPlaylistForm';
import { FixPlaylistForm } from '../components/myPlaylistForm/FixPlaylistForm';
import { BottomBar } from '../components/common/BottomBar';
import { MobileHeader } from '../components/common/MobileHeader';

import { Player } from '../components/playerForm/player';
import { ISpotifySdkToken, ISpotifyWebToken } from '../types/auth';
import { AddSongAlert } from '../components/common/AddSongAlert';

import { useHandleResize } from '../hooks/useHandleResize';

const Container = styled.div`
    max-width: 1400px;
    margin: auto;
    width: 100%;
`;

const Content = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    padding: 20px;
    @media (max-width: 768px) {
        display: block;
        padding: 0;
    }
`;

export const Home = () => {
    const addFormState = useRecoilValue(addPlaylistState);
    const location = useLocation();
    const alertState = useRecoilValue(alertFormState);
    const fixFormState = useRecoilValue(playlistFixFormState);
    const { isMobile, handleResize } = useHandleResize();
    const sdkToken = getLocalStorage('sdkAccessToken');
    const { isLoading: tokenLoading, data: webTokenData } = useQuery<ISpotifyWebToken>({
        queryKey: ['getWebToken'],
        queryFn: getWebToken,
        // onSuccess: (data: any) => {
        //     const { access_token, expires_in } = data;
        //     setLocalStorage('webAccessToken', access_token);
        //     setLocalStorage('webExpiration', expires_in);
        // },
        retry: 2,
    });
    const home = window.location.href;
    const authCode = extractAuthCodeFromUrl(home) || '';
    const {
        isLoading,
        data: sdkTokenData,
        error,
    } = useQuery<ISpotifySdkToken>(
        { queryKey: ['getSdkToken', authCode], queryFn: () => getSdkToken(authCode), enabled: !!authCode, retry: 2 }

        // onSuccess: (data) => {
        //     const { access_token, refresh_token } = data;
        //     setLocalStorage('sdkAccessToken', access_token);
        //     Cookies.set('refreshToken', refresh_token);
        //     window.history.replaceState({}, document.title, window.location.pathname);
        // },
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
            {alertState.addSong && <AddSongAlert />}
            {/* {alertState.duplicateSong && <DuplicateSongAlert />} */}
            {alertState.requiredLogin && <RequiredLoginAlert />}
            {alertState.requiredPlaylist && <RequiredPlaylist />}
            {addFormState && <AddPlaylistForm />}
            {fixFormState && <FixPlaylistForm />}
            <Content>
                {isMobile ? <MobileHeader /> : <SideBar />}
                {location.pathname === '/' && <Main />}
                {webTokenData && <Outlet />}
            </Content>
            {sdkToken && <Player />}
            {isMobile && <BottomBar />}
        </Container>
    );
};
