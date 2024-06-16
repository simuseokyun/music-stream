import styled from 'styled-components';
import { Table, Thead, Tbody, Tr, Th } from '../../styles/common.style';
import { PopularPlaylistTrack } from './popularPlaylistItem';

interface Data {
    data: {
        track: {
            id: string;
            name: string;
            artists: { id: string; name: string }[];
            album: { name: string; id: string; images: { url: string }[] };
            duration_ms: number;
            uri: string;
        };
    }[];
}
export const PopularPlaylistList = ({ data }: Data) => {
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
                        key={item.track.id}
                        cover={item.track.album.images[0].url}
                        title={item.track.name}
                        artists={item.track.artists}
                        album_id={item?.track.album.id}
                        album_title={item?.track.album.name}
                        duration={item.track.duration_ms}
                        uri={item.track.uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
