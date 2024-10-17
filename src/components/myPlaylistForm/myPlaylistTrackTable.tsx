import { Table, Thead, Tbody, Tr, Th } from '../../styles/common.style';
import { PlaylistTracks } from './myPlaylistTracks';
import { IMyPlaylistTracksProp } from '../../types/myPlaylist';

export const MyPlaylistTrackTable = ({ tracks, playlist_id }: IMyPlaylistTracksProp) => {
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
                {tracks?.map((track) => (
                    <PlaylistTracks
                        playlist_id={playlist_id}
                        key={track.id}
                        cover={track.cover}
                        title={track.title}
                        artists={track.artists}
                        album_id={track.album_id}
                        album_title={track.album_title}
                        // duration={track.duration_ms}
                        uri={track.uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
