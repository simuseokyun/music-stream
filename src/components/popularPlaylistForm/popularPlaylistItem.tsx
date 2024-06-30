import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { playlistList, playerPrevAndNext } from '../../state/atoms';
import { IPopularPlaylistInfoProp } from '../../types/popularPlaylists';
import { usePlayMusic, useAddPlaylist, useAddTrack } from '../../utils/util';
import { Category, CategoryList, PlayBtn, Tr, AddBtn, Td, Dot } from '../../styles/common.style';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;
const Cover = styled.img`
    width: 45px;
    height: 45px;
`;
const TitleWrap = styled.div`
    width: 100%;
    text-align: left;
    margin-left: 10px;
`;
const Title = styled.p``;

const ArtistsWrap = styled.div`
    display: flex;
`;

const ArtistNameWrap = styled.p`
    margin-top: 6px;
    a {
        color: rgb(160, 160, 160);
    }
`;

export const PopularPlaylistTrack = ({
    id,
    cover,
    title,
    duration,
    artists,
    album_id,
    album_title,
    uri,
}: IPopularPlaylistInfoProp) => {
    const playlists = useRecoilValue(playlistList);
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const useTrack = useAddTrack(id, title, duration, cover, album_title, artists, album_id, uri);
    const { openCategory, toggleAddBtn, mouseLeave } = usePlaylist;
    const { addTrack } = useTrack;
    const playBtn = () => playMusic(uri, title, cover, artists[0].name);

    return (
        <Tr onMouseLeave={mouseLeave}>
            <Td>
                <PlayBtn src="/images/playButton.png" onClick={playBtn} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="album_cover" />
                    <TitleWrap>
                        <Title>{title}</Title>
                        <ArtistsWrap>
                            {artists.map((artist, i) => (
                                <ArtistNameWrap key={artist.id}>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                    {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                                </ArtistNameWrap>
                            ))}
                        </ArtistsWrap>
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
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
