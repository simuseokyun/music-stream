import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { getWebToken, getSdkToken } from '../api/api';
import { useRecoilValue } from 'recoil';
import { setLocalStorage, getLocalStorage, useHandleResize, extractAuthCodeFromUrl } from '../utils/util';
import { RequiredLoginAlert } from '../components/alertForm/requiredLoginAlert';
import { RequiredPlaylist } from '../components/alertForm/requiredPlaylistAlert';
import { playlistFixFormState, addPlaylistState, alertState } from '../state/atoms';

import { SideBar } from '../components/navForm/sideBar';
import { SearchInput } from '../components/searchForm/searchInput';
import { AddPlaylistForm } from '../components/myPlaylistForm/addMyPlaylist';
import { MobileHeader } from '../components/mobileHeaderForm/mobileHeader';
import { FixPlaylistForm } from '../components/myPlaylistForm/fixMyplaylist';
import { BottomBar } from '../components/navForm/bottomBar';
import { Player } from '../components/playerForm/player';
import { ISpotifySdkToken, ISpotifyWebToken } from '../types/auth';
import { AddSongAlert } from '../components/alertForm/addSongAlert';
import { DuplicateSongAlert } from '../components/alertForm/duplicateSongAlert';

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
    padding: 20px;
    @media (max-width: 768px) {
        display: block;
        padding: 0;
    }
`;

export const HomePage = () => {
    const addFormState = useRecoilValue(addPlaylistState);
    const alertFormState = useRecoilValue(alertState);
    const fixFormState = useRecoilValue(playlistFixFormState);
    const { isMobile, handleResize } = useHandleResize();
    const sdkToken = getLocalStorage('sdkAccessToken');
    const { isLoading: tokenLoading, data: webTokenData } = useQuery<ISpotifyWebToken>('getWebToken', getWebToken, {
        retry: 2,
        onSuccess: (data) => {
            const { access_token, expires_in } = data;
            setLocalStorage('webAccessToken', access_token);
            setLocalStorage('webExpiration', expires_in);
        },
    });
    const home = window.location.href;
    const authCode = extractAuthCodeFromUrl(home) || '';
    const {
        isLoading,
        data: sdkTokenData,
        error,
    } = useQuery<ISpotifySdkToken>(
        'getSdkToken',
        async () => {
            const token = getLocalStorage('sdkAccessToken');
            if (!token) {
                const newTokenData = await getSdkToken(authCode);
                return newTokenData;
            }
            return { accessToken: token };
        },
        {
            retry: 2,
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
            {alertFormState.addSong && <AddSongAlert />}
            {alertFormState.duplicateSong && <DuplicateSongAlert />}
            {alertFormState.requiredLogin && <RequiredLoginAlert />}
            {alertFormState.requiredPlaylist && <RequiredPlaylist />}
            {addFormState && <AddPlaylistForm />}
            {fixFormState && <FixPlaylistForm />}

            <Content>
                {isMobile ? <MobileHeader /> : <SideBar />}
                {webTokenData && <Outlet />}
            </Content>

            {sdkToken && <Player />}
            {isMobile && <BottomBar />}
        </Container>
    );
};
