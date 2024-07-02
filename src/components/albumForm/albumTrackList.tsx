import styled from 'styled-components';
import { Tr, Thead, Tbody, Table } from '../../styles/common.style';
import { AlbumTracks } from './albumTrackItem';
import { IAlbumData } from '../../types/albumInfo';

const Th = styled.th`
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

    &:last-child {
        text-align: right;
    }
`;
export const AlbumTrackList = ({ data }: IAlbumData) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>제목</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.tracks?.items.map(({ id, name, artists, duration_ms, uri }) => (
                    <AlbumTracks
                        key={id}
                        id={id}
                        album_title={data.name}
                        cover={data.images[0].url}
                        name={name}
                        artists={artists}
                        duration_ms={duration_ms}
                        album_id={data.id}
                        uri={uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
