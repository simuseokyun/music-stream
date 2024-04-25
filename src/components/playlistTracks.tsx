import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { playlistList } from '../atoms';
import { useRecoilState } from 'recoil';

interface I {
    cover: string;
    title: string;
    album_id: string;
    album_title: string;
    i: number;
    artists: {
        id: string;
        name: string;
    }[];
    duration: number;
    playlist_id: string;
}
const TrackList = styled.tr`
    border-radius: 8px;
    &:hover {
        background-color: #2a2929;
        td > span {
            opacity: 1;
        }
    }
`;
const TrackImg = styled.img`
    width: 45px;
    height: 45px;
`;
const ArtistNameWrap = styled.p`
    margin-top: 4px;

    a {
        color: rgb(160, 160, 160);
    }
`;
const DeleteBtn = styled.span`
    opacity: 0;
`;
export const PlaylistTracks = ({ cover, title, album_id, artists, i, album_title, duration, playlist_id }: I) => {
    const [playlist, setPlaylist] = useRecoilState(playlistList);
    const msTransform = (ms: number) => {
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        return { minutes, seconds };
    };
    const deleteTrack = () => {
        setPlaylist((prev) => {
            const index = playlist.findIndex((ele) => {
                return ele.id === playlist_id;
            });
            const newTracks = [...prev[index].tracks].filter((ele) => {
                return ele.title !== title;
            });
            return [...prev.slice(0, index), { ...prev[index], tracks: newTracks }, ...prev.slice(index + 1)];
        });
    };
    return (
        <TrackList>
            <td>{i + 1}</td>
            <td style={{ padding: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TrackImg src={cover} alt="album_cover" />
                    <div style={{ textAlign: 'left', marginLeft: '10px' }}>
                        <p>{title}</p>
                        <div style={{ display: 'flex' }}>
                            {artists.map((artist, i) => (
                                <ArtistNameWrap>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                    {artists.length == 1 ? undefined : artists[i + 1] ? ',' : undefined}
                                </ArtistNameWrap>
                            ))}
                        </div>
                    </div>
                </div>
            </td>
            <td style={{ textAlign: 'left' }}>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </td>
            <td>{`${msTransform(duration).minutes}:${
                String(msTransform(duration).seconds).length === 1
                    ? `0${msTransform(duration).seconds}`
                    : msTransform(duration).seconds
            }`}</td>
            <td>
                <DeleteBtn onClick={deleteTrack} className="material-symbols-outlined">
                    do_not_disturb_on
                </DeleteBtn>
            </td>
        </TrackList>
    );
};
