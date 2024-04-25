import { useQuery } from 'react-query';
import { getAlbum, getArtist, getNewAlbum, getToken, searchAlbum, searchTrack } from '../api';
import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { searchState, tokenValue } from '../atoms';
import { Outlet } from 'react-router-dom';
import { Button } from './button';
import { NewAlbum } from './newAlbum';
import { typeTransform } from '../atoms';
import { addPlaylistState } from '../atoms';
import { SideBar } from './sideBar';
import { playlistFixState } from '../atoms';
import { Header } from './header';
import { AddPlaylistForm } from './addplaylistForm';
import { useRecoilState } from 'recoil';
import { tokenValue2 } from '../atoms';
import { getToken2 } from '../api';
import { player } from '../api';
import { PlaylistFixForm } from './playlistFixForm';
interface TrackImgProps {
    url: string;
}

// const LeftMenuWrap = styled.div`
//     width: 100%;
//     height: 500px;
//     position: sticky;
//     top: 70px;
// `;
// const LeftMenuTop = styled.ul`
//     height: 100px;
//     background-color: #131212;
//     border-radius: 8px;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     padding: 20px;
// `;
// const MenuTopList = styled.li`
//     font-size: 18px;
//     &:first-child {
//         margin-bottom: 20px;
//     }
// `;
// const LeftMenuBot = styled.div`
//     height: 400px;
//     margin-top: 20px;
//     background-color: #131212;
//     border-radius: 8px;
//     padding: 20px;
// `;

const TrackImg = styled.div<{ url: string }>`
    background-image: url(${(props) => props.url});
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background-position: center;
    background-size: cover;
`;

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
//////////////////////////

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
interface SpotifyToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}
const TrackList = styled.tr`
    width: 100%;

    margin-top: 20px;
    &:first-child {
        margin: 0;
    }
`;
const TrackTitle = styled.td`
    margin-left: 20px;
    text-overflow: ellipsis;
`;
const AlbumTitle = styled.td`
    margin-left: 20px;
`;
const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    padding: 0 20px 20px 20px;
`;
interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
export const Home = () => {
    const openPlaylist = useRecoilValue(addPlaylistState);
    // const setToken = useSetRecoilState(tokenValue);
    const fixState = useRecoilValue(playlistFixState);

    // const { isLoading: tokenLoading, data: tokenData } = useQuery<TokenResponse>('getToken', getToken, {
    //     onSuccess: (data) => {
    //         setToken(data?.access_token!);
    //     },
    // });

    const search = useRecoilValue(searchState);
    const setToken = useSetRecoilState(tokenValue);
    const token = useRecoilValue(tokenValue);
    const { isLoading: tokenLoading, data: tokenData } = useQuery<TokenResponse>('getToken', getToken, {
        onSuccess: (data) => {
            setToken(data?.access_token!);
        },
    });
    // const { isLoading: newAlbumLoading, data: newAlbumData } = useQuery<INewAlbum>(
    //     'newAlbum',
    //     async () => {
    //         if (!tokenLoading && tokenData?.access_token) {
    //             return getNewAlbum(tokenData.access_token);
    //         }
    //     },
    //     {
    //         enabled: !tokenLoading && !!tokenData?.access_token,
    //     }
    // );
    const [token2, setToken2] = useRecoilState(tokenValue2);
    const home = window.location.href;

    const extractAuthCodeFromUrl = (url: string) => {
        const params = new URLSearchParams(url.split('?')[1]);
        return params.get('code');
    };

    const authCode = extractAuthCodeFromUrl(home);
    console.log(authCode);
    // const { isLoading: tokenLoading, data: tokenData } = useQuery<TokenResponse>('getToken', getToken, {
    //     onSuccess: (data) => {
    //         setToken(data?.access_token!);
    //     },
    // });
    const { isLoading: sLoading, data: sData } = useQuery<SpotifyToken>('hi', async () => getToken2(authCode!), {
        enabled: !!authCode, // authCode가 존재할 때만 쿼리를 실행
        onSuccess: (data) => {
            setToken2(data?.access_token);
        },
    });
    console.log(sData);
    const { isLoading: tLoading, data: tData } = useQuery(
        'bye',
        async () => {
            if (!sLoading && sData?.access_token) {
                const playerData = await player(token2!);
                return playerData;
            }
        },
        {
            enabled: !sLoading && !!sData?.access_token,
        }
    );

    return (
        <div style={{ maxWidth: 1180, margin: 'auto', width: '100%' }}>
            {openPlaylist && <AddPlaylistForm />}
            {fixState && <PlaylistFixForm />}
            <Header />
            <Container>
                <SideBar></SideBar>
                {tokenData && <Outlet />}
            </Container>
        </div>
    );
};
{
    /* {newAlbumData?.albums && <NewAlbum newAlbums={newAlbumData?.albums!} />} */
}
