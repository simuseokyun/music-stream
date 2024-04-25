import styled from 'styled-components';
import { clickPlaylistState, playlistFilter, playlistFixState, playlistList, titleChangeState } from '../atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PlaylistTracks } from './playlistTracks';

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

const PlaylistType = styled.p`
    margin-bottom: 2px;
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
// const CoverWrap = styled.div`
//     position: relative;
//     width: 150px;
//     height: 150px;
//     border-radius: 8px;
//     overflow: hidden;
//     CoverWrap:hover ${Overlay} {
//         display: block; /* CoverWrap을 호버할 때 Overlay가 나타남 */
//     }
// `;
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

    const [value, setValue] = useState('');
    const [changeForm, setChangeForm] = useRecoilState(titleChangeState);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        setValue(() => '');
    }, []);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (typeof e.target?.result === 'string') {
                    setImagePreview(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
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
            const value2 = [...prev.slice(0, index), ...value, ...prev.slice(index + 1)];
            const value3 = value2.filter((playlist) => {
                return playlist.hasOwnProperty('top');
            });
            const value4 = value2.filter((playlist) => {
                return !playlist.hasOwnProperty('top');
            });

            console.log(value3, value4);
            const value5 = [...value4].sort((a, b) => {
                if (a.id > b.id) {
                    return 1;
                } else {
                    return -1;
                }
            });
            console.log(value5);
            return [...value3, ...value5];
        });
    };
    return (
        <Container>
            {playlist && (
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
                            {!playlist.top && (
                                <Btn name={playlist?.title} onClick={topFixed}>
                                    플레이리스트 고정
                                </Btn>
                            )}
                            {playlist.top && (
                                <Btn name={playlist?.title} onClick={clearFixed}>
                                    고정 해제
                                </Btn>
                            )}
                            <Btn
                                name={playlist?.title}
                                onClick={onDelete}
                                style={{ marginLeft: '5px', background: '#e2e2e2' }}
                            >
                                플레이리스트 삭제하기
                            </Btn>
                        </PlaylistInfo>
                    </PlaylistTop>
                    {playlist.tracks.length ? (
                        <table style={{ width: '100%' }}>
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
                            <tbody>
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
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '50px' }}>플레이리스트에 곡을 추가해주세요</p>
                    )}
                </PlaylistWrap>
            )}
        </Container>
    );
};
