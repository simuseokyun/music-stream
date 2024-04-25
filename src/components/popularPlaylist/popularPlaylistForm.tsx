import styled from 'styled-components';
import { useQuery } from 'react-query';
import { commaSeparate, getPopularPlaylist } from '../../api';
import { tokenValue } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { PopularPlaylistTrack } from './popularPlaylistTrack';
import { useEffect } from 'react';

interface IList {
    description: string;
    followers: { total: number };
    id: string;
    images: { url: string }[];
    name: string;
    owner: { display_name: string };
    primary_color: string;
    tracks: {
        total: string;
        items: {
            track: {
                id: string;
                name: string;
                duration_ms: number;
                artists: { name: string; id: string }[];
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
`;
const PlaylistImg = styled.img`
    background-color: #232323;
    width: 150px;
    height: 150px;
    border-radius: 8px;
    &:hover {
    }
`;

const PlaylistInfo = styled.div`
    margin-left: 20px;
`;
const Description = styled.p`
    color: #e2e2e2;
    font-size: 14px;
`;
const PlaylistType = styled.p`
    margin-bottom: 2px;
    font-size: 14px;
`;
const PlaylistTitle = styled.p`
    margin: 10px 0 5px 0;
    font-size: 30px;
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
export const PopularPlaylistForm = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치 초기화
    }, []);

    const { id } = useParams();
    const token = useRecoilValue(tokenValue);
    const { isLoading, data: popularData } = useQuery<IList>('popularId', async () => getPopularPlaylist(token!, id!));
    console.log(popularData);
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
                            <thead>
                                <tr>
                                    <th style={{ width: '30px' }}>#</th>
                                    <th style={{ textAlign: 'left', width: '65%', padding: '5px' }}>제목</th>
                                    <th style={{ textAlign: 'left' }}>앨범</th>
                                    <th>
                                        <span className="material-symbols-outlined">schedule</span>
                                    </th>
                                    <th style={{ width: '50px' }}></th>
                                </tr>
                            </thead>
                            <tbody style={{ width: '100%' }}>
                                {popularData?.tracks.items.map((item, i) => (
                                    <PopularPlaylistTrack
                                        // playlist_id={playlist.id}
                                        key={item.track.id}
                                        cover={item.track.album.images[0].url}
                                        title={item.track.name}
                                        artists={item.track.artists}
                                        album_id={item.track.album.id}
                                        album_title={item.track.album.name}
                                        duration={item.track.duration_ms}
                                        i={i}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '50px' }}>플레이리스트에 곡을 추가해주세요</p>
                    )}
                </PlaylistWrap>
            )}
        </Container>
    );
};
