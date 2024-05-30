import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPopularPlaylist } from '../../api';
import { commaSeparate, getTokenLocalStorage } from '../../util';
import { useParams } from 'react-router-dom';
import { PopularPlaylistTrack } from './popularPlaylistTrack';

interface IList {
    description: string;
    followers: { total: number };
    id: string;
    images: { url: string }[];
    name: string;
    tracks: {
        total: string;
        items: {
            track: {
                id: string;
                name: string;
                duration_ms: number;
                artists: { name: string; id: string }[];
                uri: string;
                album: { id: string; name: string; images: { url: string }[] };
            };
        }[];
    };
}
const Container = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
    overflow: hidden;
    @media (max-width: 768px) {
        padding: 10px 10px 140px 10px;
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
const PlaylistTop = styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 20px;
    @media (max-width: 425px) {
        display: block;
    }
`;
const PlaylistImg = styled.img`
    background-color: #232323;
    width: 200px;
    border-radius: 8px;
    @media (max-width: 768px) {
        width: 150px;
    }
    @media (max-width: 425px) {
        margin: auto;
    }
`;

const PlaylistInfo = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 10px 0 0 0;
    }
`;
const Description = styled.p`
    color: #e2e2e2;
    font-size: 14px;
    line-height: 1.4;
`;
const PlaylistType = styled.p`
    margin-bottom: 2px;
    font-size: 14px;
`;
const PlaylistTitle = styled.p`
    font-size: 30px;
    font-weight: 700;
    margin: 10px 0;
    @media (max-width: 768px) {
        font-size: 20px;
        margin: 5px 0;
    }
`;

const Follower = styled.p`
    margin-top: 5px;
    font-size: 12px;
    color: rgba(160, 160, 160);
`;

const Table = styled.table`
    width: 100%;
    overflow: hidden;
`;
const Thead = styled.thead`
    width: 100%;
`;
const Tbody = styled.tbody`
    width: 100%;
`;
const Tr = styled.tr`
    width: 100%;
`;
const Th = styled.th`
    padding: 5px 0;
    &:first-child {
        width: 6%;
        text-align: left;
        @media (max-width: 768px) {
            width: 100px;
        }
    }

    &:nth-child(2) {
        width: 50%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            width: 80%;
        }
    }
    &:nth-child(3) {
        width: 30%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 10%;
    }
`;
const SubMessage = styled.p`
    text-align: center;
    margin-top: 50px;
`;
export const PopularPlaylistForm = () => {
    // window.scrollTo(0, 0); 페이지 이동 시 스크롤 초기화 코드
    const { id } = useParams();
    const token = getTokenLocalStorage('webAccessToken');
    const { isLoading: popularLoading, data: popularData } = useQuery<IList>('popularId', async () => {
        if (token && id) {
            return await getPopularPlaylist(token, id);
        }
    });

    return (
        <Container>
            {popularData && (
                <PlaylistWrap>
                    <PlaylistTop>
                        <PlaylistImg src={popularData.images[0].url || '/basicPlaylist.webp'}></PlaylistImg>
                        <PlaylistInfo>
                            <PlaylistType>공개 플레이리스트</PlaylistType>
                            <PlaylistTitle>{popularData.name}</PlaylistTitle>
                            <Description>{popularData.description}</Description>
                            <Follower>저장 횟수 : {commaSeparate(popularData.followers.total)}</Follower>
                        </PlaylistInfo>
                    </PlaylistTop>
                    {popularData.tracks.items.length ? (
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
                                {popularData?.tracks.items.map((item, i) => (
                                    <PopularPlaylistTrack
                                        key={item.track.id}
                                        cover={item.track.album.images[0].url}
                                        title={item.track.name}
                                        artists={item.track.artists}
                                        album_id={item.track.album.id}
                                        album_title={item.track.album.name}
                                        duration={item.track.duration_ms}
                                        uri={item.track.uri}
                                    />
                                ))}
                            </Tbody>
                        </Table>
                    ) : (
                        <SubMessage>플레이리스트에 곡을 추가해주세요</SubMessage>
                    )}
                </PlaylistWrap>
            )}
        </Container>
    );
};
