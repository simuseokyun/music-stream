import styled from 'styled-components';
import { clickPlaylistState, playlistFilter, playlistList } from '../atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { spawn } from 'child_process';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
`;
const PlaylistWrap = styled.div`
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
`;
const PlaylistImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 8px;
`;
const PlaylistInfo = styled.div`
    margin-left: 20px;
`;

const TrackImg = styled.img`
    width: 50px;
    height: 50px;
`;

export const PlaylistForm = () => {
    const [playlists, setPlaylists] = useRecoilState(playlistList);

    const playlist = useRecoilValue(playlistFilter);
    const test = useRecoilValue(clickPlaylistState);
    const navigate = useNavigate();
    console.log(test);
    console.log(playlist);
    const msTransform = (ms: number) => {
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        return { minutes, seconds };
    };
    const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const fil = prev.filter((playlist) => {
                return playlist.title !== name;
            });
            return fil;
        });
        navigate('/');
    };
    const topFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const index = prev.findIndex((playlist) => {
                return playlist.title === name;
            });
            // return [{ ...prev.slice(index, 1) }];
            console.log(prev);
            return [{ ...prev[index], top: true }, ...prev.slice(0, index), ...prev.slice(index + 1)];
        });
    };
    return (
        <Container>
            <PlaylistWrap>
                <PlaylistTop>
                    <PlaylistImg></PlaylistImg>
                    <PlaylistInfo>
                        <p>플레이리스트</p>
                        <p>{playlist?.title}</p>
                        <p>{playlist?.tracks.length + '곡'}</p>
                        <button name={playlist?.title} onClick={onDelete}>
                            플레이리스트 삭제하기
                        </button>
                        <button name={playlist?.title} onClick={topFixed}>
                            플레이리스트 고정
                        </button>
                    </PlaylistInfo>
                </PlaylistTop>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>제목</th>
                            <th>앨범</th>
                            <th>재생 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlist?.tracks.map((track, i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>
                                    <div style={{ display: 'flex' }}>
                                        <TrackImg src={track.cover} alt="album_cover" />
                                        <div>
                                            <p>{track.title}</p>
                                            {track.artists.map((artist) => (
                                                <span>{artist.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td>{track.album_title}</td>
                                <td>{`${msTransform(track.duration_ms).minutes}:${
                                    String(msTransform(track.duration_ms).seconds).length === 1
                                        ? `0${msTransform(track.duration_ms).seconds}`
                                        : msTransform(track.duration_ms).seconds
                                }`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </PlaylistWrap>
        </Container>
    );
};
