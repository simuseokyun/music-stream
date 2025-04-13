import { Table, Thead, Tbody, Tr, Th } from '../../styles/common.style';
import { PlaylistTracks } from './myPlaylistTracks';
import { IMyPlaylistTracksProp } from '../../types/myPlaylist';

export const MyPlaylistTrackTable = ({ tracks, playlistId }: IMyPlaylistTracksProp) => {
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
                        playlistId={playlistId}
                        key={track.id}
                        cover={track.cover}
                        title={track.title}
                        artists={track.artists}
                        albumId={track.albumId}
                        albumTitle={track.albumTitle}
                        // duration={track.duration_ms}
                        uri={track.uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
