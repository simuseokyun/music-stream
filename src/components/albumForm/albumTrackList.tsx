import { Tr, Thead, Tbody, Table, SubTh } from '../../styles/common.style';
import { TrackItem } from './albumTrackItem';
import { IAlbumData } from '../../types/albumInfo';

export const TrackList = ({ data }: IAlbumData) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <SubTh>#</SubTh>
                    <SubTh>제목</SubTh>
                    <SubTh></SubTh>
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
