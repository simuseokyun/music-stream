import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { deviceInfo, nowSongInfo, setMobile, playlistList, addPlaylistState } from '../../atoms';
import { playSong } from '../../util';
import Cookies from 'js-cookie';

interface ITrack {
    id: string;
    cover: string;
    title: string;
    artists: { name: string; id: string }[];
    album_id: string;
    album_title: string;
    duration_ms: number;
    uri: string;
}

// 애니메이션
const rotateIn = keyframes`
    from {
        transform: rotate(0deg) 
    }
    to {
        transform: rotate(180deg) 
    }
`;
//

const TrackList = styled.tr`
    width: 100%;
    &:first-child {
        margin: 0;
    }
    &:hover {
        background-color: #2a2929;
        span {
            opacity: 1;
        }
    }
`;

const TrackImg = styled.div<{ url: string }>`
    background-image: url(${(props) => props.url});
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background-position: center;
    background-size: cover;
`;

const AddBtn = styled.span<{ state: string }>`
    opacity: ${({ state }) => (state === 'true' ? 1 : 0)};
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
const TdWrap = styled.div`
    display: flex;
`;
const Td = styled.td`
    padding: 5px;
    &:first-child {
        width: 10px;
        span:hover {
            color: #65d46e;
        }
    }

    &:nth-child(2) {
        width: 50px;
    }
    &:nth-child(3) {
        width: 50%;
        text-align: left;
        max-width: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            width: 80%;
        }
    }
    &:nth-child(4) {
        width: 30%;
        text-align: left;
        max-width: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:last-child {
        width: 10%;
    }
`;
const PlayBtn = styled.span``;
const ArtistsWrap = styled.p``;

export const SearchTrackList = ({ cover, title, album_id, album_title, artists, duration_ms, uri, id }: ITrack) => {
    const [open, setOpen] = useState(false);
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const isMobile = useRecoilValue(setMobile);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
    const deviceId = useRecoilValue(deviceInfo);
    const setNowSong = useSetRecoilState(nowSongInfo);
    const accessToken = Cookies.get('accessToken');
    const mouseLeave = () => {
        setOpen(false);
    };
    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent, id },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id: title, title, duration_ms, cover, album_title, artists, album_id, uri };
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

    const onAddBtn = () => {
        if (!playlists.length) {
            alert('먼저 플레이리스트를 생성해주세요');
            addPlaylistFormState((prev) => !prev);
            return;
        }
        setOpen((prev) => !prev);
    };

    // 노래 클릭 시 재생 함수 호출 예시
    const handleSongClick = async (trackUri: string, title: string, cover: string, artist: string) => {
        try {
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
        } catch (error) {
            console.error('노래를 재생하는 중 에러 발생:', error);
            setNowSong((prev) => {
                return { title: '실행 오류', cover: '', artist: '', is_playing: false };
            });
        }
    };

    return (
        <TrackList onMouseLeave={mouseLeave} key={id}>
            <Td onClick={() => handleSongClick(uri, title, cover, artists[0].name)}>
                <PlayBtn className="material-symbols-outlined">play_arrow</PlayBtn>
            </Td>
            <Td>
                <TrackImg url={cover} />
            </Td>
            <Td>
                {title}
                <TdWrap>
                    {artists.map((artist, i) => {
                        return (
                            <ArtistsWrap key={artist.id}>
                                <Link style={{ fontSize: '14px', color: '#a0a0a0' }} to={`/home/artist/${artist.id}`}>
                                    {artist.name}
                                </Link>
                                {artists.length == 1 ? undefined : artists[i + 1] ? ',' : undefined}
                            </ArtistsWrap>
                        );
                    })}
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>
            <Td>
                <AddBtn onClick={onAddBtn} className="material-symbols-outlined" state={isMobile.toString()}>
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
