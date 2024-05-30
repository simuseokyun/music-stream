import styled from 'styled-components';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import { deviceInfo, nowSongInfo, setMobile, addPlaylistState, playlistList } from '../../atoms';
import { playSong, msTransform } from '../../util';
import Cookies from 'js-cookie';

interface ITrack {
    cover: string;
    title: string;
    artists: { id: string; name: string }[];
    album_id: string;
    album_title: string;
    duration_ms: number;
    i: number;
    uri: string;
}

const TopTrackList = styled.tr`
    width: 100%;
`;
const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;
const TrackImg = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 8px;
`;
const TrackTitle = styled.p`
    margin-left: 10px;
`;

const Td = styled.td`
    padding: 5px;
    &:first-child {
        width: 5%;
    }
    &:nth-child(2) {
        width: 80%;
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

const AddBtn = styled.span<{ state: string }>`
    /* opacity: ${({ state }) => (state === 'true' ? 1 : 0)}; */
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
const PlayBtn = styled.span``;

export const PopularTracks = ({ i, cover, title, artists, album_id, album_title, duration_ms, uri }: ITrack) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const isMobile = useRecoilValue(setMobile);
    const [song, setNowSong] = useRecoilState(nowSongInfo);
    const deviceId = useRecoilValue(deviceInfo);
    const accessToken = Cookies.get('accessToken');
    const [open, setOpen] = useState(false);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
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
    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent, id },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id: title, title, duration_ms, cover, album_title, artists, album_id };
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

    return (
        <TopTrackList>
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
                    <TrackTitle>{title}</TrackTitle>
                </TdWrap>
            </Td>
            <Td>{`${msTransform(duration_ms).minutes}:${
                String(msTransform(duration_ms).seconds).length === 1
                    ? `0${msTransform(duration_ms).seconds}`
                    : msTransform(duration_ms).seconds
            }`}</Td>
            <Td>
                <AddBtn onClick={onAddBtn} state={isMobile.toString()} className="material-symbols-outlined">
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
        </TopTrackList>
    );
};
