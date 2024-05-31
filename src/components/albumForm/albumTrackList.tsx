import styled, { keyframes } from 'styled-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import { addPlaylistState, nowSongInfo, playlistList } from '../../atoms';
import { playSong, msTransform } from '../../util';
import { deviceInfo } from '../../atoms';
import Cookies from 'js-cookie';

interface ITrack {
    name: string;
    artists: { id: string; name: string }[];
    track_number: number;
    duration_ms: number;
    cover: string;
    album_title: string;
    album_id: string;
    uri: string;
}
const Container = styled.tr`
    border-radius: 5px;

    a {
        color: #a0a0a0;
        &:hover {
            color: white;
        }
    }

    border-radius: 10px;
`;
const TrackArtist = styled.span``;
const ArtistName = styled.p`
    margin-bottom: 5px;
`;
const rotateIn = keyframes`
    from {
        transform: rotate(0deg) 
    }
    to {
        transform: rotate(180deg) 
    }
`;
const AddBtn = styled.span`
    &:hover {
        animation: ${rotateIn} 1s forwards;
    }
`;
const Category = styled.ul`
    position: absolute;
    right: 0;
    width: 200px;
    padding: 10px;
    background-color: #282828;
    border-radius: 8px;
    z-index: 1;
`;
const CategoryList = styled.li`
    text-align: left;
    color: white;
    font-size: 14px;
    padding: 5px;
    &:hover {
        background-color: #3e3d3d;
    }
`;
const Td = styled.td`
    padding: 10px 5px;
    &:first-child {
        width: 30px;
        cursor: pointer;
    }
    &:nth-child(2) {
        width: 70%;
        text-align: left;
        max-width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &:nth-child(3) {
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        text-align: right;
    }
`;
const PlayBtn = styled.span``;
export const TrackList = ({ name, track_number, duration_ms, cover, album_title, artists, album_id, uri }: ITrack) => {
    const token = Cookies.get('accessToken');
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
    const [song, setNowSong] = useRecoilState(nowSongInfo);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const deviceId = useRecoilValue(deviceInfo);
    const onAddBtn = () => {
        if (!playlists.length) {
            alert('먼저 플레이리스트를 생성해주세요');
            addPlaylistFormState((prev) => !prev);
            navigate(-1);

            return;
        }
        setOpen((prev) => !prev);
    };

    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent, id },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id: name, title: name, duration_ms, cover, album_title, artists, album_id };
            const prevArray = prev.map((prev, index) => {
                if (prev.title === textContent) {
                    const confirm = prev.tracks.find((ele) => {
                        return ele.title === name;
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
            return prevArray;
        });
    };

    const handleSongClick = async (trackUri: string, title: string, cover: string, artist: string) => {
        try {
            if (!token) {
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

    return (
        <Container
            key={name}
            onMouseLeave={() => {
                setOpen(false);
            }}
        >
            <Td>
                <PlayBtn
                    className="material-symbols-outlined"
                    onClick={() => handleSongClick(uri, name, cover, artists[0].name)}
                >
                    play_arrow
                </PlayBtn>
            </Td>
            <Td>
                <ArtistName>{name}</ArtistName>
                {artists.map((artist, i) => (
                    <TrackArtist key={artist.name}>
                        <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                        {artists.length == 1 ? undefined : artists[i + 1] ? ',' : undefined}
                    </TrackArtist>
                ))}
            </Td>
            <Td>{`${msTransform(duration_ms).minutes}:${
                String(msTransform(duration_ms).seconds).length === 1
                    ? `0${msTransform(duration_ms).seconds}`
                    : msTransform(duration_ms).seconds
            }`}</Td>
            <Td>
                <AddBtn onClick={onAddBtn} style={{ position: 'relative' }} className="material-symbols-outlined">
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
        </Container>
    );
};
