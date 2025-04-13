import styled from 'styled-components';
import { Table, Thead, Tbody, Tr } from '../../styles/common.style';
import { useQuery } from '@tanstack/react-query';

import { IArtistTopTracks } from '../../types/artistInfo';
import { useParams } from 'react-router-dom';
import { getArtistTopTrack } from '../../api/getInfo';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { FiveTrackItem } from './FiveTrackItem';
import { useSetRecoilState } from 'recoil';
import { playerTracksStorage } from '../../store/atoms';
import { Message } from '../../styles/common.style';
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
        text-align: right;
    }
`;
export const FiveTrackList = () => {
    const token = getLocalStorage('webAccessToken');
    const { artistId } = useParams();
    const setTracksStorage = useSetRecoilState(playerTracksStorage);
    const { isLoading, data: trackData } = useQuery<IArtistTopTracks>(
        {
            queryKey: ['getArtistTopTrack', artistId],
            queryFn: () => {
                return getArtistTopTrack(token!, artistId!);
            },
        }
        // queryFn: () => {
        // {
        //     onSuccess: (data) => {
        //         if (data && data.tracks && data.tracks) {
        //             const tracks = data.tracks.map((track) => ({
        //                 trackUri: track.uri,
        //                 title: track.name,
        //                 name: track.artists[0].name,
        //                 cover: track.album.images[0]?.url,
        //             }));
        //             setTracksStorage(tracks);
        //         }
        //     },
        // }
    );
    if (!trackData) {
        return <Message>데이터가 없습니다</Message>;
    }
    const { tracks } = trackData;
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {tracks.slice(0, 5).map((track) => (
                    <FiveTrackItem
                        key={track.id}
                        id={track.id}
                        trackUri={track.uri}
                        cover={track.album.images[0].url}
                        title={track.name}
                        artists={track.artists}
                        albumId={track.album.id}
                        albumTitle={track.album.name}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
