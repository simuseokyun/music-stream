import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { playlistList } from '../../state/atoms';
import { useRecoilState } from 'recoil';
import { IMyPlaylistTracks } from '../../types/myPlaylist';
import { usePlayMusic } from '../../utils/util';
import { Tr, Td, Dot, TitleWrap, Title, ArtistWrap, Cover, PlayBtn } from '../../styles/common.style';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;

const DeleteBtn = styled.img`
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 25px;
    display: inline-block;
`;

export const PlaylistTracks = ({
    cover,
    title,
    album_id,
    artists,
    album_title,
    playlist_id,
    uri,
}: // duration,
IMyPlaylistTracks) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const playMusic = usePlayMusic();
    const deleteTrack = () => {
        setPlaylist((prev) => {
            const index = playlists.findIndex((list) => {
                return list.id === playlist_id;
            });
            const newTracks = [...prev[index].tracks].filter((track) => {
                return track.title !== title;
            });
            return [...prev.slice(0, index), { ...prev[index], tracks: newTracks }, ...prev.slice(index + 1)];
        });
    };
    const playBtn = () => playMusic({ trackUri: uri, title: title, cover, artist: artists[0].name });

    return (
        <Tr>
            <Td>
                <PlayBtn src="/images/playButton.png" onClick={playBtn} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="album_cover" />
                    <TitleWrap>
                        <Title>{title}</Title>
                        {artists.map((artist, i) => (
                            <ArtistWrap key={artist.name}>
                                <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                            </ArtistWrap>
                        ))}
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>

            <Td>
                <DeleteBtn src="/images/deleteSong.png" onClick={deleteTrack} />
            </Td>
        </Tr>
    );
};
