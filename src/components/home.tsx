import { useQuery } from 'react-query';
import { getArtist, getToken, searchAlbum, searchTrack } from '../api';
import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { searchState, tokenValue } from '../atoms';
import { Outlet } from 'react-router-dom';

interface TrackImgProps {
    url: string;
}
const Container = styled.div`
    width: 100%;
`;
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
    const { isLoading: tokenLoading, data: tokenData } = useQuery<TokenResponse>('getToken', getToken);
    const { isLoading: artistLoading, data: artistData } = useQuery<IArtist>('getArtist', async () => {
        const artistData = await getArtist(tokenData?.access_token!);
        setToken(tokenData?.access_token!);
        return artistData;
    });
    const { isLoading: TrackLoading, data: trackData } = useQuery<ITracks>(['searchTrack', search], async () => {
        const trackData = await searchTrack(tokenData?.access_token!, search);
        return trackData;
    });
    // const { isLoading: AlbumLoading, data: albumData } = useQuery('searchAlbum', async () => {
    //     const albumData = await searchAlbum(tokenData?.access_token!);
    //     return albumData;
    // });
    const setToken = useSetRecoilState(tokenValue);

    return (
        <Container>
            <Outlet />
            <div style={{ padding: '20px' }}>
                <table style={{ width: '100%', verticalAlign: 'middle' }}>
                    <tr>
                        <th>앨범 커버</th>
                        <th>노래 제목</th>
                        <th>앨범 제목</th>
                    </tr>

                    {TrackLoading
                        ? 'Loading...'
                        : trackData?.tracks?.items?.map((item, i) => {
                              return (
                                  <TrackList key={i}>
                                      <td>
                                          <TrackImg url={item.album.images[0].url} />
                                      </td>
                                      <TrackTitle>{item.name}</TrackTitle>
                                      <AlbumTitle>
                                          <Link to={`album/${item.album.id}`}>{item.album.name}</Link>
                                      </AlbumTitle>
                                  </TrackList>
                              );
                          })}
                </table>
            </div>
        </Container>
    );
};
