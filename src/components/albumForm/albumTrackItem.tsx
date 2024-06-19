import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { playlistList } from '../../state/atoms';
import { usePlayMusic, useAddPlaylist, useAddTrack } from '../../utils/util';
import { Category, CategoryList, Dot, AddBtn } from '../../styles/common.style';
import { IAddTrack } from '../../types/myPlaylist';

const Tr = styled.tr`
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

    &:last-child {
        text-align: right;
    }
`;
const PlayBtn = styled.img`
    width: 25px;
    height: 25px;
`;
export const AlbumTracks = ({ id, name, duration_ms, cover, album_title, artists, album_id, uri }: IAddTrack) => {
    const playlists = useRecoilValue(playlistList);
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const useTrack = useAddTrack(id, name, duration_ms, cover, album_title, artists, album_id, uri);
    const { openCategory, toggleAddBtn, mouseLeave } = usePlaylist;
    const { addTrack } = useTrack;

    return (
        <Tr onMouseLeave={mouseLeave}>
            <Td>
                <PlayBtn src="/images/playButton.png" onClick={() => playMusic(uri, name, cover, artists[0].name)} />
            </Td>
            <Td>
                <ArtistName>{name}</ArtistName>
                {artists.map((artist, i) => (
                    <TrackArtist key={artist.name}>
                        <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                        {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                    </TrackArtist>
                ))}
            </Td>

            <Td>
                <AddBtn src="/images/addButton.png" onClick={toggleAddBtn} style={{ position: 'relative' }} />
                {openCategory ? (
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
        </Tr>
    );
};
