import { useQuery } from 'react-query';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { searchState, tokenValue } from '../atoms';
import { searchTrack } from '../api';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { playlistList } from '../atoms';
import { addPlaylistState } from '../atoms';

import { SearchTrackList } from './searchTrackList';

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
        artists: { name: string; id: string }[];
    };
    duration_ms: number;

    name: string;
}
const ResultMessage = styled.h1`
    font-size: 20px;
    margin-bottom: 10px;
`;
const TrackList = styled.tr`
    width: 100%;

    &:first-child {
        margin: 0;
    }
    &:hover {
        background-color: #2a2929;
        span {
            opacity: 1;
        }
    }
`;
const Table = styled.table``;
const Tr = styled.tr``;
const Th = styled.th``;

const TrackImg = styled.div<{ url: string }>`
    background-image: url(${(props) => props.url});
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background-position: center;
    background-size: cover;
`;
const TrackTitle = styled.td`
    margin-left: 20px;
    text-overflow: ellipsis;
    text-align: left;
`;
const AlbumTitle = styled.td`
    margin-left: 20px;
`;
const rotateIn = keyframes`
    from {
        transform: rotate(0deg) 
    }
    to {
        transform: rotate(180deg) 
    }
`;
const AddBtn = styled.span`
    opacity: 0;
    &:hover {
        animation: ${rotateIn} 1s forwards;
    }
`;

export const SearchResult = () => {
    const [open, setOpen] = useState(false);
    const search = useRecoilValue(searchState);
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
    const token = useRecoilValue(tokenValue);

    const { isLoading: TrackLoading, data: trackData } = useQuery<ITracks>(['searchTrack', search], async () => {
        const trackData = await searchTrack(token, search);
        return trackData;
    });
    console.log(trackData);
    return (
        <div>
            <ResultMessage>"{search}"에 대한 결과</ResultMessage>
            <Table style={{ width: '100%', verticalAlign: 'middle' }}>
                <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>

                {TrackLoading
                    ? 'Loading...'
                    : trackData?.tracks?.items?.map((item, i) => {
                          return (
                              <SearchTrackList
                                  key={i}
                                  i={i}
                                  cover={item.album.images[0].url}
                                  title={item.name}
                                  artists={item.album.artists}
                                  album_id={item.album.id}
                                  album_title={item.album.name}
                                  duration_ms={item.duration_ms}
                              />
                          );
                      })}
            </Table>
        </div>
    );
};
