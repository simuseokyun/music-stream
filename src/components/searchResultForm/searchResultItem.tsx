import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { setMobile, playlistList } from '../../state/atoms';
import { useAddPlaylist, useAddTrack } from '../../utils/util';
import { ISearchTrackProp } from '../../types/searchTracksInfo';
import { usePlayMusic } from '../../utils/util';
import { Category, CategoryList, Tr } from '../../styles/common.style';

const TdWrap = styled.div`
    display: flex;
`;
const Td = styled.td`
    cursor: pointer;
    padding: 5px 0;
    max-width: 0;
    &:first-child {
        width: 6%;
        text-align: left;
        @media (max-width: 425px) {
            width: 100px;
        }
    }

    &:nth-child(2) {
        width: 50%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            width: 80%;
        }
    }
    &:nth-child(3) {
        width: 30%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 5%;
        text-align: right;
    }
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
const Cover = styled.img`
    width: 45px;
    height: 45px;
    background-position: center;
    background-size: cover;
`;

const AddBtn = styled.img<{ state: string }>`
    background-color: white;
    border-radius: 10px;
    padding: 4px;
    width: 20px;
    height: 20px;
    display: inline-block;
    position: relative;
`;

const PlayBtn = styled.img`
    width: 25px;
    height: 25px;
`;

const Dot = styled.span`
    color: rgb(160, 160, 160);
    margin: 0 2px;
`;
export const SearchTrackItem = ({
    cover,
    title,
    album_id,
    album_title,
    artists,
    duration_ms,
    id,
    uri,
}: ISearchTrackProp) => {
    const playlists = useRecoilValue(playlistList);
    const isMobile = useRecoilValue(setMobile);
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const { open, toggleAddBtn, mouseLeave } = usePlaylist;
    const useTrack = useAddTrack(title, duration_ms, cover, album_title, artists, album_id, uri);
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
                <AddBtn src="/images/addButton.png" state={isMobile.toString()} onClick={toggleAddBtn} />
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
