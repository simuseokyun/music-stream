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
                {data.map((item) => (
                    <PopularPlaylistTrack
                        key={item?.track.id}
                        id={item?.track.id}
                        cover={item?.track.album.images[0].url}
                        title={item?.track.name}
                        artists={item?.track.artists}
                        album_id={item?.track.album.id}
                        album_title={item?.track.album.name}
                        duration={item?.track.duration_ms}
                        uri={item?.track.uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
