import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { playlistList, setMobile, addPlaylistState, nowSongInfo, deviceInfo } from '../../atoms';
import { playSong } from '../../util';
import Cookies from 'js-cookie';

interface IList {
    cover: string;
    title: string;
    duration: number;
    artists: { id: string; name: string }[];
    album_id: string;
    album_title: string;
    uri: string;
}
const TrackList = styled.tr`
    width: 100%;
    border-radius: 8px;
    /* &:hover {
        background-color: #2a2929;
        td > span {
            opacity: 1;
        }
    } */
`;
const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;
const Td = styled.td`
    cursor: pointer;
    padding: 5px 0;
    max-width: 0;
    overflow: hidden;
    &:first-child {
        width: 6%;
        text-align: left;
        @media (max-width: 425px) {
            width: 100px;
        }
    }

    &:nth-child(2) {
        width: 50%;
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
        width: 5%;
    }
`;
const TrackImg = styled.img`
    width: 45px;
    height: 45px;
`;
const TitleWrap = styled.div`
    width: 100%;
    text-align: left;
    margin-left: 10px;
`;
const TrackTitle = styled.p``;

const ArtistsWrap = styled.div`
    display: flex;
`;
const PlayBtn = styled.p``;
const ArtistNameWrap = styled.p`
    margin-top: 6px;
    a {
        color: rgb(160, 160, 160);
    }
`;

const AddBtn = styled.span<{ state: string }>`
    opacity: ${({ state }) => (state === 'true' ? 1 : 0)};
`;
const Category = styled.ul`
    position: absolute;
    right: 0;
    width: 200px;
    padding: 10px;
    background-color: #282828;
    border-radius: 8px;
`;
const CategoryList = styled.li`
    text-align: left;
    color: white;
    font-size: 14px;
    padding: 5px;
    /* &:hover {
        background-color: #3e3d3d;
    } */
`;
const Dot = styled.span`
    color: rgb(160, 160, 160);
    margin: 0 2px;
`;

export const PopularPlaylistTrack = ({ cover, title, duration, artists, album_id, album_title, uri }: IList) => {
    const accessToken = Cookies.get('accessToken');
    const [open, setOpen] = useState(false);
    const isMobile = useRecoilValue(setMobile);
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
    const deviceId = useRecoilValue(deviceInfo);
    const setNowSong = useSetRecoilState(nowSongInfo);
    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id: title, title, duration_ms: duration, cover, album_title, artists, album_id };
            console.log(newTrack);
            const prevArray = prev.map((prev, index) => {
                if (prev.title === textContent) {
                    const confirm = prev.tracks.find((ele) => {
                        return ele.title === title;
                    });
                    if (confirm) {
                        alert('이미 플레이리스트에 곡이 존재합니다');
                        return prev;
                    }
                    return {
                        ...prev,
                        tracks: [...prev.tracks, newTrack],
                    };
                }
                return prev;
            });
            setOpen(false);
            return prevArray;
        });
    };
    const handleSongClick = async (trackUri: string, title: string, cover: string, artist: string) => {
        try {
            if (!accessToken) {
                alert('로그인이 필요한 서비스입니다');
                return;
            }
            if (deviceId) {
                await playSong(trackUri, deviceId);
                setNowSong((prev) => {
                    return { title, cover, artist, is_playing: true };
                });
            } else {
                alert('웹 플레이어를 생성하기 위해 로그아웃 하겠습니다.');
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.href = '/';
                return;
            }
        } catch (error) {
            console.error('노래를 재생하는 중 에러 발생:', error);
            setNowSong((prev) => {
                return { title: '실행 오류', cover: '', artist: '', is_playing: false };
            });
        }
    };

    const onAddBtn = () => {
        if (!playlists.length) {
            alert('먼저 플레이리스트를 생성해주세요');
            addPlaylistFormState((prev) => !prev);
            return;
        }
        setOpen((prev) => !prev);
    };

    return (
        <TrackList
            onMouseLeave={() => {
                setOpen(false);
            }}
        >
            <Td>
                <PlayBtn
                    className="material-symbols-outlined"
                    onClick={() => handleSongClick(uri, title, cover, artists[0].name)}
                >
                    play_arrow
                </PlayBtn>
            </Td>
            <Td>
                <TdWrap>
                    <TrackImg src={cover} alt="album_cover" />
                    <TitleWrap>
                        <TrackTitle>{title}</TrackTitle>
                        <ArtistsWrap>
                            {artists.map((artist, i) => (
                                <ArtistNameWrap>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                    {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                                </ArtistNameWrap>
                            ))}
                        </ArtistsWrap>
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>
            <Td>
                <AddBtn state={isMobile.toString()} onClick={onAddBtn} className="material-symbols-outlined">
                    add_circle
                </AddBtn>
                {open ? (
                    <Category>
                        {playlists.map((playlist) => {
                            return (
                                <CategoryList key={playlist.id} id={playlist.title} onClick={addTrack}>
                                    {playlist.title}
                                </CategoryList>
                            );
                        })}
                    </Category>
                ) : null}
            </Td>
        </TrackList>
    );
};
