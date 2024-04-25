import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { playlistList } from '../../atoms';
import { addPlaylistState } from '../../atoms';
import { msTransform } from '../../api';
import { useState } from 'react';
const TopTrackList = styled.tr`
    &:hover {
        span {
            opacity: 1;
        }
    }
`;
const TopTrackTitle = styled.p``;
const TrackImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 8px;
`;
const TrackTitle = styled.p`
    margin-left: 10px;
`;
const Td = styled.td`
    &:first-child {
        width: 50px;
    }
    &:nth-child(2) {
        padding: 5px 0;
        width: 80%;
        text-align: left;
    }
    &:nth-child(3) {
    }
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
    opacity: 0;
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
    align-items: center;
`;
interface ITrack {
    cover: string;
    title: string;
    artists: { id: string; name: string }[];
    album_id: string;
    album_title: string;
    duration_ms: number;
    i: number;
}
export const PopularTracks = ({ i, cover, title, artists, album_id, album_title, duration_ms }: ITrack) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const [open, setOpen] = useState(false);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
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
            <Td>{i + 1}</Td>
            <Td>
                <TdWrap style={{ display: 'flex' }}>
                    <TrackImg src={cover} alt="album_cover" />
                    <TrackTitle>{title}</TrackTitle>
                </TdWrap>
            </Td>
            <Td>{`${msTransform(duration_ms).minutes}:${
                String(msTransform(duration_ms).seconds).length === 1
                    ? `0${msTransform(duration_ms).seconds}`
                    : msTransform(duration_ms).seconds
            }`}</Td>

            <td style={{ paddingRight: '5px', position: 'relative' }}>
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
            </td>
        </TopTrackList>
    );
};
