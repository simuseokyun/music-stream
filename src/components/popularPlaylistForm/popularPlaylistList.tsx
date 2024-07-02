import { Table, Thead, Tbody, Tr, Th } from '../../styles/common.style';
import { IPopularPlaylistTracks } from '../../types/popularPlaylists';
import { PopularPlaylistTrack } from './popularPlaylistItem';

export const PopularPlaylistList = ({ data }: IPopularPlaylistTracks) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map(({ track }) => (
                    <PopularPlaylistTrack
                        key={track.id}
                        id={track.id}
                        cover={track.album.images[0].url}
                        title={track.name}
                        artists={track.artists}
                        album_id={track.album.id}
                        album_title={track.album.name}
                        duration={track.duration_ms}
                        uri={track.uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
