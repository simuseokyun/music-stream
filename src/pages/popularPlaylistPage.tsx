import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPopularPlaylist } from '../api/api';
import { commaSeparate, getLocalStorage } from '../utils/util';
import { useParams } from 'react-router-dom';
import { IPopularPlaylistInfo } from '../types/popularPlaylists';
import { PopularPlaylistInfo } from '../components/popularPlaylistForm/popularPlaylistInfo';
import { PopularPlaylistList } from '../components/popularPlaylistForm/popularPlaylistList';
import { Message, Loading, LoadingWrap } from '../styles/common.style';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { playerTracksStorage, alertState } from '../state/atoms';

const Container = styled.div`
    padding: 20px 20px 100px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #131212;
    border-radius: 8px;
    @media (max-width: 768px) {
        margin-top: 60px;
        padding: 20px 20px 120px;

        background-color: black;
    }
`;
const PlaylistWrap = styled.div`
    width: 100%;
    position: relative;
    border-radius: 8px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const PopularPlaylistPage = () => {
    const { playlistId } = useParams();
    const token = getLocalStorage('webAccessToken');
    // const setPlayerTracks = useSetRecoilState(playerTracks);
    const setStorageTracks = useSetRecoilState(playerTracksStorage);
    const alertFormState = useRecoilValue(alertState);
    const {
        isLoading: popularLoading,
        data: popularData,
        isError,
    } = useQuery<IPopularPlaylistInfo>(
        ['popularPlaylistInfo', playlistId],
        async () => {
            if (token && playlistId) {
                const popularPlaylist = await getPopularPlaylist(token, playlistId);
                return popularPlaylist;
            } else {
                return Promise.resolve(null);
            }
        },
        {
            onSuccess: (data) => {
                if (data && data?.tracks && data?.tracks?.items) {
                    const tracks = data.tracks.items.map(({ track }) => ({
                        trackUri: track.uri,
                        title: track.name,
                        name: track.artists[0].name,
                        cover: track.album.images[0].url,
                    }));
                    setStorageTracks(tracks);
                }
            },
        }
    );

    if (popularLoading) {
        return (
            <LoadingWrap>
                <Loading src="/images/loading.png" />
            </LoadingWrap>
        );
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    return (
        <Container>
            {/* {alertFormState.requiredLogin && <RequiredLoginAlert />}
            {alertFormState.requiredPlaylist && <RequiredPlaylist />} */}
            {popularData && (
                <PlaylistWrap>
                    <PopularPlaylistInfo
                        cover={popularData?.images[0]?.url}
                        name={popularData?.name}
                        followers={commaSeparate(popularData?.followers.total)}
                        description={popularData?.description}
                    />
                    {popularData.tracks.items.length ? (
                        <PopularPlaylistList data={popularData?.tracks?.items} />
                    ) : (
                        <Message>플레이리스트가 존재하지 않습니다</Message>
                    )}
                </PlaylistWrap>
            )}
        </Container>
    );
};
