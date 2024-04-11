import styled from 'styled-components';
import { clickPlaylistState, playlistFilter, playlistList } from '../atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

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
    const [changeForm, setChangeForm] = useState(false);
    const [value, setValue] = useState('');
    const playlist = useRecoilValue(playlistFilter);
    const navigate = useNavigate();
    console.log(playlist);

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
            const fil = prev.filter((playlist) => playlist.top !== null);
            if (fil.length > 2) {
                alert('플레이리스트는 최대 3개까지 고정할 수 있습니다');
                return prev;
            }
            const index = prev.findIndex((playlist) => {
                return playlist.title === name;
            });
            const newTracks = [{ ...prev[index], top: Date.now() }, ...prev.slice(0, index), ...prev.slice(index + 1)];
            return newTracks;
        });
    };
    const clearFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setPlaylists((prev) => {
            const index = prev.findIndex((playlist) => {
                return playlist.title === name;
            });
            const newTrack = { ...prev[index], top: false };

            // const index = prev.findIndex((playlist) => {
            //     return playlist.title === name;
            // });
            console.log(prev);
            return prev;
        });
    };
    const titleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPlaylists((prev) => {
            // const fil = playlists.find((ele) => ele.id === playlist?.id);
            const index = playlists.findIndex((ele) => ele.id === playlist?.id);
            const find = prev.find((e) => {
                return e.title === value;
            });
            if (value.length < 1) {
                alert('한 글자 이상 입력하세요');
                return prev;
            }
            if (find) {
                alert('중복된 플레이리스트가 존재합니다');
                return prev;
            }
            setChangeForm(false);
            return [...prev.slice(0, index), { ...prev[index], title: value }, ...prev.slice(index + 1)];
        });
    };
    return (
        <Container>
            {playlist && (
                <PlaylistWrap>
                    <PlaylistTop>
                        <PlaylistImg src={playlist?.img || '/basicPlaylist.webp'}></PlaylistImg>
                        <PlaylistInfo>
                            <p>플레이리스트</p>
                            {changeForm ? (
                                <>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const {
                                                currentTarget: { value },
                                            } = event;
                                            setValue(value);
                                        }}
                                    />
                                    <button onClick={titleChange}>수정</button>
                                </>
                            ) : (
                                <p>
                                    {playlist?.title}
                                    <span
                                        onClick={() => setChangeForm(true)}
                                        className="material-symbols-outlined"
                                        style={{ fontSize: '15px' }}
                                    >
                                        border_color
                                    </span>
                                </p>
                            )}
                            <p>{playlist?.tracks.length + '곡'}</p>
                            <button name={playlist?.title} onClick={onDelete}>
                                플레이리스트 삭제하기
                            </button>
                            <button name={playlist?.title} onClick={topFixed}>
                                플레이리스트 고정
                            </button>
                            <button name={playlist?.title} onClick={clearFixed}>
                                고정 해제
                            </button>
                        </PlaylistInfo>
                    </PlaylistTop>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th style={{ textAlign: 'left' }}>제목</th>
                                <th>앨범</th>
                                <th>
                                    <span className="material-symbols-outlined">schedule</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist?.tracks.map((track, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <TrackImg src={track.cover} alt="album_cover" />
                                            <div>
                                                <p>{track.title}</p>
                                                {track.artists.map((artist) => (
                                                    <span>
                                                        <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                                                        {track.artists.length == 1
                                                            ? undefined
                                                            : track.artists[i + 1]
                                                            ? ','
                                                            : undefined}
                                                    </span>
                                                ))}
                                                {/* <td style={{ textAlign: 'left', padding: '10px 0' }}>
                                                    <p style={{ marginBottom: '5px' }}>{name}</p>
                                                    {artists.map((artist, i) => (
                                                        <TrackArtist key={artist.name}>
                                                            <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                                                            {artists.length == 1
                                                                ? undefined
                                                                : artists[i + 1]
                                                                ? ','
                                                                : undefined}
                                                        </TrackArtist>
                                                    ))}
                                                </td> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={`/album/${track.album_id}`}>{track.album_title}</Link>
                                    </td>
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
            )}
        </Container>
    );
};
