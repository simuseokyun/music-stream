import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPopularPlaylist } from '../api/api';
import { commaSeparate, getLocalStorage } from '../utils/util';
import { useParams } from 'react-router-dom';
import { PopularPlaylistTrack } from '../components/popularPlaylistForm/popularPlaylistItem';
import { IPopularPlaylistInfo } from '../types/popularPlaylists';
import { PopularPlaylistInfo } from '../components/popularPlaylistForm/popularPlaylistInfo';
import { PopularPlaylistList } from '../components/popularPlaylistForm/popularPlaylistList';
import { Message } from '../styles/common.style';

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

export const PopularPlaylistForm = () => {
    // window.scrollTo(0, 0); 페이지 이동 시 스크롤 초기화 코드
    const { id } = useParams();
    const token = getLocalStorage('webAccessToken');
    const { isLoading: popularLoading, data: popularData } = useQuery<IPopularPlaylistInfo>('popularId', async () => {
        if (token && id) {
            return await getPopularPlaylist(token, id);
        }
    });
    if (popularLoading) {
        return <Message>로딩 중</Message>;
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
