import styled from 'styled-components';
import { clickPlaylistState, playlistFilter, playlistFixState, playlistList, titleChangeState } from '../../atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { PlaylistTracks } from './playlistTracks';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
    margin-bottom: 100px;
    @media (max-width: 768px) {
        background-color: black;

        padding: 10px;
    }
`;
const PlaylistWrap = styled.div`
    position: relative;
    border-radius: 8px;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const PlaylistTop = styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        display: block;
    }
`;
const PlaylistBot = styled.div`
    height: 500px;
    width: 100%;
    overflow-y: scroll;
    @media (max-width: 768px) {
        height: 300px;
    }
`;
const PlaylistImg = styled.img`
    background-color: #232323;
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    @media (max-width: 768px) {
        margin: auto;
    }
`;

const PlaylistInfo = styled.div`
    margin-left: 20px;
    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

const PlaylistType = styled.p`
    margin-bottom: 2px;
    @media (max-width: 768px) {
        margin-top: 10px;
    }
`;
const PlaylistTitle = styled.p`
    margin-bottom: 2px;
`;
const SetIcon = styled.span`
    font-size: 18px;
    vertical-align: middle;
`;
const PlaylistTracksLength = styled.p`
    margin-bottom: 5px;
`;
const TrackImg = styled.img`
    width: 50px;
    height: 50px;
`;
const Table = styled.table`
    width: 100%;
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
    padding: 5px;
    &:first-child {
        width: 2%;
    }
    &:nth-child(2) {
        width: 60%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 0;
    }
    &:nth-child(3) {
        width: 30%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 0;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 10%;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:last-child() {
        width: 10%;
    }
`;
const PlayTime = styled.span``;
const SubMessage = styled.p`
    text-align: center;
    margin-top: 50px;
`;
const Btn = styled.button`
    display: inline-block;
    text-align: center;
    background-color: #65d46e;
    border: none;
    border-radius: 20px;
    padding: 4px 8px;
`;

export const PlaylistForm = () => {
    const setFixForm = useSetRecoilState(playlistFixState);
    const [playlists, setPlaylists] = useRecoilState(playlistList);
    const playlist = useRecoilValue(playlistFilter);
    const navigate = useNavigate();
    const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const filter = prev.filter((playlist) => {
                return playlist.title !== name;
            });
            return filter;
        });
        navigate('/home');
    };
    const topFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const fil = prev.filter((playlist) => playlist.hasOwnProperty('top'));
            if (fil.length > 2) {
                alert('플레이리스트는 최대 3개까지 고정할 수 있습니다');
                return prev;
            }
            const index = prev.findIndex((playlist) => {
                return playlist.title === name;
            });
            const value = { ...prev[index], top: Date.now() };

            const newTracks = [value, ...prev.slice(0, index), ...prev.slice(index + 1)];
            return newTracks;
        });
    };
    const clearFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const index = prev.findIndex((playlist) => {
                return playlist.title == name;
            });
            const value = [{ ...prev[index] }].map((playlist) => {
                const { top, ...rest } = playlist;
                return rest;
            });
            const setValue = [...prev.slice(0, index), ...value, ...prev.slice(index + 1)];
            const topFilter = setValue.filter((playlist) => {
                return playlist.hasOwnProperty('top');
            });
            const botFilter = setValue.filter((playlist) => {
                return !playlist.hasOwnProperty('top');
            });

            const sort = [...botFilter].sort((a, b) => {
                if (a.id > b.id) {
                    return 1;
                } else {
                    return -1;
                }
            });

            return [...topFilter, ...sort];
        });
    };
    return (
        <Container>
            {playlist ? (
                <PlaylistWrap>
                    <PlaylistTop>
                        <PlaylistImg src={playlist?.img || '/basicPlaylist.webp'}></PlaylistImg>
                        <PlaylistInfo>
                            <PlaylistType>내 플레이리스트</PlaylistType>
                            <PlaylistTitle>
                                {playlist.title}
                                <SetIcon className="material-symbols-outlined" onClick={() => setFixForm(() => true)}>
                                    border_color
                                </SetIcon>
                            </PlaylistTitle>
                            <PlaylistTracksLength>{playlist?.tracks.length + '곡'}</PlaylistTracksLength>
                            {playlist.top ? (
                                <Btn name={playlist?.title} onClick={clearFixed}>
                                    고정 해제
                                </Btn>
                            ) : (
                                <Btn name={playlist?.title} onClick={topFixed}>
                                    고정
                                </Btn>
                            )}
                            <Btn name={playlist?.title} onClick={onDelete} style={{ marginLeft: '5px' }}>
                                삭제
                            </Btn>
                        </PlaylistInfo>
                    </PlaylistTop>
                    <PlaylistBot>
                        {playlist.tracks.length ? (
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>제목</Th>
                                        <Th>앨범</Th>
                                        <Th>
                                            <PlayTime className="material-symbols-outlined">schedule</PlayTime>
                                        </Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {playlist?.tracks.map((track, i) => (
                                        <PlaylistTracks
                                            playlist_id={playlist.id}
                                            key={track.id}
                                            i={i}
                                            cover={track.cover}
                                            title={track.title}
                                            artists={track.artists}
                                            album_id={track.album_id}
                                            album_title={track.album_title}
                                            duration={track.duration_ms}
                                            uri={track.uri!}
                                        />
                                    ))}
                                </Tbody>
                            </Table>
                        ) : (
                            <SubMessage>플레이리스트에 곡을 추가해주세요</SubMessage>
                        )}
                    </PlaylistBot>
                </PlaylistWrap>
            ) : (
                <SubMessage>존재하지 않는 플레이리스트 입니다</SubMessage>
            )}
        </Container>
    );
};
