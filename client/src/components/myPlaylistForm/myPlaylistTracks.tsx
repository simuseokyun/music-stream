import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { playlistList, setMobile } from '../../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IMyPlaylistTracks } from '../../types/myPlaylist';
import { usePlayMusic } from '../../hooks/usePlayMusic';
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
        <Tr>
            <Td>
                <PlayBtn src="/assets/playButton.png" onClick={playBtn} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="album_cover" />
                    <TitleWrap>
                        <Title>{title}</Title>
                        {artists.map((artist, i) => (
                            <ArtistWrap key={artist.name}>
                                <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                                {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                            </ArtistWrap>
                        ))}
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/album/${albumId}`}>{albumTitle}</Link>
            </Td>

            <Td>
                <DeleteBtn src="/assets/deleteButton.png" onClick={deleteTrack} />
            </Td>
        </Tr>
    );
};
