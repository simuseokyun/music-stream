import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getToken, getSdkToken, refreshToken } from '../api';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { saveLocalStorage } from '../util';
import { nowSongInfo, searchState, playlistFixState, addPlaylistState, setMobile } from '../atoms';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../components/navForm/sideBar';
import { Header } from '../components/headerForm/header';
import { AddPlaylistForm } from '../components/libraryForm/addplaylistForm';
import { LoginM } from '../components/loginForm/loginM';
import { PlaylistFixForm } from '../components/playlistForm/playlistFixForm';
import { BottomBar } from '../components/navForm/bottomBar';
import { Player } from '../components/playerForm/player';

interface TrackImgProps {
    url: string;
}

interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}

interface ExternalUrls {
    spotify: string;
}

interface Followers {
    href: string | null;
    total: number;
}

interface Image {
    height: number;
    url: string;
    width: number;
}
interface IArtist {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface ITracks {
    tracks: {
        items: IAlbum[];
        next: string;
    };
}

interface IAlbum {
    album: {
        images: {
            url: string;
        }[];
        id: string;
        name: string;
    };
    name: string;
}
interface INewAlbum {
    albums: IAlbums;
}
interface IAlbums {
    items: IItems[];
    href: string;
}
interface IItems {
    album_type: string;
    artists: { name: string; id: string }[];
    id: string;
    images: { url: string; height: number; width: number }[];
    name: string;
}
interface ISpotifyWebToken {
    accessToken: string;
    expiration: string;
}
interface ISpotifySdkToken {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}
const Wrap = styled.div`
    max-width: 1180px;
    margin: auto;
    width: 100%;
    height: 100vh;
`;
const Container = styled.div`
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

export const Home = () => {
    const openPlaylist = useRecoilValue(addPlaylistState);
    const fixState = useRecoilValue(playlistFixState);
    const setM = useSetRecoilState(setMobile);
    const search = useRecoilValue(searchState);
    const playingSong = useRecoilValue(nowSongInfo);
    const accessToken = Cookies.get('accessToken');

    const { isLoading: tokenLoading, data: tokenData } = useQuery<ISpotifyWebToken>('getWebToken', getToken, {
        onSuccess: (data) => {
            saveLocalStorage('webAccessToken', data.accessToken);
            saveLocalStorage('webExpiration', data.expiration);
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

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth <= 768) {
                setM((prev) => true);
            } else {
                setM((prev) => false);
            }
        };

        handleResize(); // 초기 실행
        window.addEventListener('resize', handleResize); // 리사이즈 이벤트 핸들러 등록
        return () => {
            window.removeEventListener('resize', handleResize); // 컴포넌트가 언마운트될 때 리스너 제거
        };
    }, []);

    return (
        <Wrap>
            {openPlaylist && <AddPlaylistForm />}
            {fixState && <PlaylistFixForm />}
            <Header />
            <Container>
                {isMobile && <LoginM />}
                {!isMobile && <SideBar />}
                {tokenData && <Outlet />}
            </Container>
            {accessToken && <Player />}
            {isMobile && <BottomBar />}
        </Wrap>
    );
};
