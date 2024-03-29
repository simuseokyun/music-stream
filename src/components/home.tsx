import { useQuery } from 'react-query';
import { getArtist, getToken, searchTrack } from '../api';
import { useState } from 'react';
import styled from 'styled-components';

interface TrackImgProps {
    url: string;
}
const TrackImg = styled.div<{ url: string }>`
    background-image: url(${(props) => props.url});
    width: 200px;
    height: 200px;
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
    };
}

interface IAlbum {
    album: {
        images: {
            url: string;
        }[];
    };
}
const TrackList = styled.li``;

export const Home = () => {
    const { isLoading: tokenLoading, data: tokenData } = useQuery<TokenResponse>('getToken', getToken);
    const { isLoading: artistLoading, data: artistData } = useQuery<IArtist>('getArtist', async () => {
        const artistData = await getArtist(tokenData?.access_token!);
        return artistData;
    });
    const { isLoading: TrackLoading, data: trackData } = useQuery<ITracks>('searchTrack', async () => {
        const trackData = await searchTrack(tokenData?.access_token!);
        return trackData;
    });

    console.log(trackData?.tracks.items[0].album.images[0].url);
    return (
        <>
            <h1>홈 입니다.</h1>
            <ul>
                {trackData?.tracks.items?.map((item, i) => {
                    return (
                        <TrackList>
                            <TrackImg url={item.album.images[0].url} />
                            <p>{}</p>
                        </TrackList>
                    );
                })}
            </ul>
        </>
    );
};
