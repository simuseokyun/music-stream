import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { playlistList } from '../../state/atoms';
import { useAddPlaylist, useAddTrack, usePlayMusic } from '../../utils/util';
import { ISearchTrackProp } from '../../types/searchTracksInfo';
import { Category, CategoryList, Tr, Td, PlayBtn, AddBtn, Dot } from '../../styles/common.style';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;

//     cursor: pointer;
//     padding: 5px 0;
//     max-width: 0;
//     &:first-child {
//         width: 6%;
//         text-align: left;
//         @media (max-width: 425px) {
//             width: 100px;
//         }
//     }

//     &:nth-child(2) {
//         width: 50%;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         overflow: hidden;
//         @media (max-width: 768px) {
//             width: 80%;
//         }
//     }
//     &:nth-child(3) {
//         width: 30%;
//         text-align: left;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         overflow: hidden;
//         @media (max-width: 768px) {
//             display: none;
//         }
//     }
//     &:nth-child(4) {
//         width: 5%;
//         text-align: right;
//     }
// `;
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
const Cover = styled.img`
    width: 45px;
    height: 45px;
    background-position: center;
    background-size: cover;
`;

export const SearchTrackItem = ({
    id,
    cover,
    title,
    album_id,
    album_title,
    artists,
    duration_ms,
    uri,
}: ISearchTrackProp) => {
    const playlists = useRecoilValue(playlistList);
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const { open, toggleAddBtn, mouseLeave } = usePlaylist;
    const useTrack = useAddTrack(id, title, duration_ms, cover, album_title, artists, album_id, uri);
    const { addTrack } = useTrack;

    return (
        <Tr onMouseLeave={mouseLeave}>
            <Td>
                <PlayBtn src="/images/playButton.png" onClick={() => playMusic(uri, title, cover, artists[0].name)} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="앨범커버" />
                    <TitleWrap>
                        <Title>{title}</Title>
                        <ArtistsWrap>
                            {artists.map((artist, i) => (
                                <ArtistNameWrap key={artist.id}>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                    {artists.length == 1 ? null : artists[i + 1] ? <Dot>,</Dot> : null}
                                </ArtistNameWrap>
                            ))}
                        </ArtistsWrap>
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>
            <Td style={{ position: 'relative' }}>
                <AddBtn src="/images/addButton.png" onClick={toggleAddBtn} />
                {open && (
                    <Category>
                        {playlists.map((playlist) => {
                            return (
                                <CategoryList key={playlist.id} id={playlist.title} onClick={addTrack}>
                                    {playlist.title}
                                </CategoryList>
                            );
                        })}
                    </Category>
                )}
            </Td>
        </Tr>
    );
};
