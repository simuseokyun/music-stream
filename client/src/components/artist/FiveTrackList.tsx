import styled from 'styled-components';
import { Thead, Tbody, Tr } from '../../styles/common.style';
import { useQuery } from '@tanstack/react-query';

import { IArtistTopTracks } from '../../types/artistInfo';
import { useParams } from 'react-router-dom';
import { getArtistTopTrack } from '../../api/getInfo';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { FiveTrackItem } from './FiveTrackItem';
import { useSetRecoilState } from 'recoil';
import { playerTracksStorage } from '../../store/atoms';

export const FiveTrackList = () => {
    const token = getLocalStorage('webAccessToken');
    const { artistId } = useParams();
    const setTracksStorage = useSetRecoilState(playerTracksStorage);
    const { isLoading, data, isError } = useQuery<IArtistTopTracks>({
        queryKey: ['getArtistTopTrack', artistId],
        queryFn: () => {
            return getArtistTopTrack(token!, artistId!);
        },
    });
    if (!data) {
        return <h1 className="text-center">데이터가 없습니다</h1>;
    }
    const { tracks } = data;
    return (
        <table className="w-table-auto w-full table-fixed">
            <tbody>
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
            </tbody>
        </table>
    );
};
