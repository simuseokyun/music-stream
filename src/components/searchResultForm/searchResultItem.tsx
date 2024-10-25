import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { playlistList } from '../../state/atoms';
import { useAddPlaylist, useAddTrack, usePlayMusic } from '../../utils/util';
import { ISearchTrackProp } from '../../types/searchTracksInfo';
import { Tr, Td, PlayBtn, AddBtn, Dot, TitleWrap, Title, ArtistWrap, Cover } from '../../styles/common.style';
import { PlaylistList } from '../categoryForm/category';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const SearchTrackItem = ({ id, cover, title, album_id, album_title, artists, trackUri }: ISearchTrackProp) => {
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const { openCategory, addSong, mouseLeave } = usePlaylist;
    const { addTrack } = useAddTrack(id, title, cover, album_title, artists, album_id, trackUri);

    const playBtn = () => playMusic({ trackUri, title, cover, artist: artists[0].name });
    return (
        <Tr onMouseLeave={mouseLeave}>
            <Td>
                <PlayBtn src="/images/playButton.png" onClick={playBtn} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="앨범커버" />
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
            <Td style={{ position: 'relative' }}>
                <AddBtn src="/images/addButton.png" onClick={addSong} />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </Td>
        </Tr>
    );
};
