import { Tr, Thead, Tbody, Table } from '../../styles/common.style';
import styled from 'styled-components';
import { TrackItem } from './AlbumTrackItem';
import { IAlbumData } from '../../types/albumInfo';

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

    &:last-child {
        text-align: right;
    }
`;

export const TrackList = ({ data }: IAlbumData) => {
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
                {data?.tracks?.items.map(({ id, name, artists, uri }) => (
                    <TrackItem
                        key={id}
                        track_id={id}
                        track_title={name}
                        album_title={data.name}
                        cover={data.images[0].url}
                        artists={artists}
                        album_id={data.id}
                        trackUri={uri}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
