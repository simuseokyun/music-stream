import styled from 'styled-components';
import { Table, Thead, Tbody, Tr } from '../../styles/common.style';
import { useQuery } from 'react-query';
import { IArtistTopTracks } from '../../types/artistInfo';
import { useParams } from 'react-router-dom';
import { getArtistTopTrack } from '../../api/api';
import { getLocalStorage } from '../../utils/util';
import { TopFiveTracks } from './topFiveTrackItem';

const Th = styled.th`
    padding: 5px;
    &:first-child {
        width: 50px;
    }
    &:nth-child(2) {
        width: 80%;
        text-align: left;
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
export const TopFiveTracksTable = () => {
    const token = getLocalStorage('webAccessToken') || '';
    const { artistId } = useParams();
    const { isLoading: topTrackLoading, data: topTrackInfo } = useQuery<IArtistTopTracks>(['topTrack', artistId], () =>
        getArtistTopTrack(token, artistId!)
    );
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
                {topTrackInfo &&
                    topTrackInfo?.tracks
                        .slice(0, 5)
                        .map((track) => (
                            <TopFiveTracks
                                key={track.id}
                                id={track.id}
                                cover={track.album.images[0].url}
                                title={track.name}
                                artists={track.artists}
                                album_id={track.album.id}
                                album_title={track.album.name}
                                duration_ms={track.duration_ms}
                                uri={track.uri}
                            />
                        ))}
            </Tbody>
        </Table>
    );
};
