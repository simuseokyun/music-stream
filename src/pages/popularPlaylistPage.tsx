import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPopularPlaylist } from '../api/api잠시주석';
import { commaSeparate, getLocalStorage } from '../utils/util';
import { useParams } from 'react-router-dom';
import { IPopularPlaylistInfo } from '../types/popularPlaylists';
import { PopularPlaylistInfo } from '../components/popularPlaylistForm/popularPlaylistInfo';
import { PopularPlaylistList } from '../components/popularPlaylistForm/popularPlaylistList';
import { Message } from '../styles/common.style';
import { useSetRecoilState } from 'recoil';
import { playerTracks } from '../state/atoms';
const Container = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 100px;
    @media (max-width: 768px) {
        padding: 10px;
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
    const setPlayerTracks = useSetRecoilState(playerTracks);
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
                if (data && data.tracks && data.tracks.items) {
                    const trackSummaries = data.tracks.items.map(({ track }) => ({
                        uri: track.uri,
                        title: track.name,
                        name: track.artists[0].name,
                        cover: track.album.images[0].url,
                        playTime: track.duration_ms,
                    }));
                    setPlayerTracks(trackSummaries);
                }
            },
        }
    );

    if (popularLoading) {
        return <Message>로딩 중</Message>;
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    return (
        <Container>
            {popularData && (
                <PlaylistWrap>
                    <PopularPlaylistInfo
                        cover={popularData.images[0].url}
                        name={popularData.name}
                        followers={commaSeparate(popularData.followers.total)}
                        description={popularData.description}
                    />
                    {popularData.tracks.items.length ? (
                        <PopularPlaylistList data={popularData.tracks.items} />
                    ) : (
                        <Message>플레이리스트에 곡을 추가해주세요</Message>
                    )}
                </PlaylistWrap>
            )}
        </Container>
    );
};
