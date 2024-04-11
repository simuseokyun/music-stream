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

export const Home = () => {
    const search = useRecoilValue(searchState);
    const setToken = useSetRecoilState(tokenValue);
    const token = useRecoilValue(tokenValue);
    const { isLoading: tokenLoading, data: tokenData } = useQuery<TokenResponse>('getToken', getToken, {
        onSuccess: (data) => {
            setToken(data?.access_token!);
        },
    });
    const { isLoading: newAlbumLoading, data: newAlbumData } = useQuery<INewAlbum>(
        'newAlbum',
        async () => {
            if (!tokenLoading && tokenData?.access_token) {
                return getNewAlbum(tokenData.access_token);
            }
        },
        {
            enabled: !tokenLoading && !!tokenData?.access_token, //
        }
    );

    return <>{newAlbumData?.albums && <NewAlbum newAlbums={newAlbumData?.albums!} />}</>;
};
