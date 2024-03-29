import { useQuery } from 'react-query';
import { getArtist, getToken, searchTrack } from '../api';
import { useState } from 'react';

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

export const Home = () => {
    const { isLoading: tokenLoading, data: tokenData } = useQuery<TokenResponse>('getToken', getToken);
    const { isLoading: artistLoading, data: artistData } = useQuery<IArtist>('getArtist', async () => {
        const artistData = await getArtist(tokenData?.access_token!);
        return artistData;
    });
    const { isLoading: TrackLoading, data: trackData } = useQuery('searchTrack', async () => {
        const trackData = await searchTrack(tokenData?.access_token!);
        return trackData;
    });

    console.log(trackData);
    return (
        <>
            <h1>홈 입니다.</h1>
        </>
    );
};
