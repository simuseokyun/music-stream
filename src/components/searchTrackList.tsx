import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { playlistList } from '../atoms';
import { addPlaylistState } from '../atoms';

interface ITrack {
    cover: string;
    title: string;
    artists: { name: string; id: string }[];
    album_id: string;
    album_title: string;
    i: number;
    duration_ms: number;
}

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
const Table = styled.table``;
const Tr = styled.tr``;
const Th = styled.th``;

const TrackImg = styled.div<{ url: string }>`
    background-image: url(${(props) => props.url});
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background-position: center;
    background-size: cover;
`;
const TrackTitle = styled.td`
    margin-left: 20px;
    text-overflow: ellipsis;
    text-align: left;
`;
const AlbumTitle = styled.td`
    margin-left: 20px;
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

export const SearchTrackList = ({ i, cover, title, album_id, album_title, artists, duration_ms }: ITrack) => {
    const [open, setOpen] = useState(false);
    const [playlists, setPlaylist] = useRecoilState(playlistList);
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
        <TrackList
            key={i}
            onMouseLeave={() => {
                setOpen(false);
            }}
        >
            <td style={{ textAlign: 'left', padding: '5px 0 5px 5px' }}>
                <TrackImg url={cover} />
            </td>
            <TrackTitle>
                {title}
                <div style={{ display: 'flex', marginTop: '4px' }}>
                    {artists.map((artist, i) => {
                        return (
                            <p style={{ textAlign: 'left' }}>
                                <Link style={{ fontSize: '14px', color: '#a0a0a0' }} to={`/home/artist/${artist.id}`}>
                                    {artist.name}
                                </Link>
                                {artists.length == 1 ? undefined : artists[i + 1] ? ',' : undefined}
                            </p>
                        );
                    })}
                </div>
            </TrackTitle>
            <AlbumTitle>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </AlbumTitle>
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
        </TrackList>
    );
};
