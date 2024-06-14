import styled from 'styled-components';
import { Table, Thead, Tbody, Tr } from '../../styles/common.style';
import { PlaylistTracks } from './myPlaylistTracks';

const Th = styled.th`
    padding: 5px;
    &:first-child {
        width: 2%;
    }
    &:nth-child(2) {
        width: 70%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 0;
    }
    &:nth-child(3) {
        width: 25%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 0;
        @media (max-width: 768px) {
            display: none;
        }
    }

    &:last-child {
        width: 10%;
    }
`;

interface asd {
    tracks: {
        id: string;
        cover: string;
        title: string;
        album_title: string;
        artists: { id: string; name: string }[];
        uri: string;
        duration_ms: number;
        album_id: string;
    }[];
    playlist_id: string;
}

export const MyPlaylistTrackTable = ({ tracks, playlist_id }: asd) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>제목</Th>
                    <Th>앨범</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {tracks.map((track) => (
                    <PlaylistTracks
                        playlist_id={playlist_id}
                        key={track.id}
                        cover={track.cover}
                        title={track.title}
                        artists={track.artists}
                        album_id={track.album_id}
                        album_title={track.album_title}
                        duration={track.duration_ms}
                        uri={track.uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
