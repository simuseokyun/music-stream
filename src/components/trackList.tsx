import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { playlistList } from '../atoms';

interface ITrack {
    name: string;
    artists: { id: string; name: string }[];
    track_number: number;
    duration_ms: number;
    cover: string;
    album_title: string;
}
const Container = styled.tr`
    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
    a {
        color: #a0a0a0;
        &:hover {
            color: white;
        }
    }

    border-radius: 10px;
`;
const TrackArtist = styled.span`
    /* margin-left: 5px; */
`;
export const TrackList = ({ name, track_number, duration_ms, cover, album_title, artists }: ITrack) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const [open, setOpen] = useState(false);

    const addTrack = () => {
        setOpen((prev) => !prev);
        // setPlaylist((prev) => {
        //     if (!prev.length) {
        //         alert('플레이리스트를 먼저 생성해주세요');
        //         return [];
        //     }
        //     const newTrack = { id: name, title: name, duration_ms, cover, album_title, artists };
        //     const newTracks = [...prev[0]?.tracks, newTrack];
        //     const newPlaylist = [{ ...prev[0], tracks: newTracks }];
        //     return newPlaylist;
        // });
    };
    const msTransform = (ms: number) => {
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        return { minutes, seconds };
    };
    return (
        <Container key={name} style={{ borderRadius: '5px' }}>
            <td style={{ width: '10%' }}>{track_number}</td>
            <td style={{ textAlign: 'left', padding: '10px 0' }}>
                <p style={{ marginBottom: '5px' }}>{name}</p>
                {artists.map((artist, i) => (
                    <TrackArtist key={artist.name}>
                        <Link to={`/artist/${artist.id}`}>
                            {artists.length == 1
                                ? artist.name
                                : artists.length == i + 1
                                ? artist.name
                                : artist.name + ' , '}
                        </Link>
                    </TrackArtist>
                ))}
            </td>
            <td>{`${msTransform(duration_ms).minutes}:${
                String(msTransform(duration_ms).seconds).length === 1
                    ? `0${msTransform(duration_ms).seconds}`
                    : msTransform(duration_ms).seconds
            }`}</td>
            <button onClick={addTrack}>추가</button>
            {open
                ? playlists.map((playlist) => {
                      return <button>{playlist.title}</button>;
                  })
                : null}
        </Container>
    );
};
