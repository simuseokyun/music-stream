import styled from 'styled-components';
import { AlbumTracks } from './albumTrackItem';
import { Tr, Thead, Tbody, Table } from '../../styles/common.style';
import { AlbumInfo } from './albumInfo';
import { IAlbumInfo } from '../../types/albumInfo';

export const Th = styled.th`
    border-bottom: 1px solid #808080;
    padding: 10px 5px;
    &:first-child {
        width: 30px;
    }
    &:nth-child(2) {
        width: 80%;
        text-align: left;
        max-width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &:nth-child(3) {
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        text-align: right;
    }
`;
interface IData {
    data: IData2;
}
interface IData2 {
    id: string;
    name: string;
    images: { url: string }[];
    tracks: {
        items: {
            id: string;
            track_number: number;
            duration_ms: number;
            uri: string;
            name: string;
            artists: { id: string; name: string }[];
        }[];
    };
}
export const AlbumTrackList = ({ data }: IData) => {
    console.log(data, '하이');
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>제목</Th>
                    <Th>
                        <span className="material-symbols-outlined">schedule</span>
                    </Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.tracks?.items.map((track) => (
                    <AlbumTracks
                        key={track.id}
                        album_title={data.name}
                        cover={data.images[0].url}
                        name={track.name}
                        artists={track.artists}
                        track_number={track.track_number}
                        duration_ms={track.duration_ms}
                        album_id={data.id}
                        uri={track.uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
