import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { playlistList, setMobile } from '../../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IMyPlaylistTracks } from '../../types/myPlaylist';
import { usePlayMusic } from '../../hooks/usePlayMusic';
import { Tr, Td, Dot, TitleWrap, Title, ArtistWrap, Cover, PlayBtn } from '../../styles/common.style';

export const PlaylistTracks = ({
    cover,
    title,
    albumId,
    artists,
    albumTitle,
    playlistId,
    uri,
}: // duration,
IMyPlaylistTracks) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const playMusic = usePlayMusic();
    const isMobile = useRecoilValue(setMobile);
    const deleteTrack = () => {
        setPlaylist((prev) => {
            const index = playlists.findIndex((list) => {
                return list.id === playlistId;
            });
            const newTracks = [...prev[index].tracks].filter((track) => {
                return track.title !== title;
            });
            return [...prev.slice(0, index), { ...prev[index], tracks: newTracks }, ...prev.slice(index + 1)];
        });
    };
    const playBtn = () => playMusic({ trackUri: uri, title: title, cover, artist: artists[0].name });
    const mobilePlayBtn = () => {
        if (isMobile) {
            playBtn();
        }
    };
    return (
        <tr>
            <td>
                <img className="action-button" src="/assets/playButton.png" onClick={playBtn} />
            </td>
            <td>
                <div className="song-wrap">
                    <img className="img-medium" src={cover} alt="album_cover" />
                    <div>
                        <h1 className="text-ellipsis">{title}</h1>
                        {artists.map((artist, i) => (
                            <span key={artist.name}>
                                <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                                {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                            </span>
                        ))}
                    </div>
                </div>
            </td>
            <td>
                <Link to={`/album/${albumId}`}>{albumTitle}</Link>
            </td>

            <td>
                <img className="action-button" src="/assets/deleteButton.png" onClick={deleteTrack} />
            </td>
        </tr>
    );
};
