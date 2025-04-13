import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { playlistList, setMobile } from '../../store/atoms';
import { IPopularPlaylistInfoProp } from '../../types/popularPlaylists';

import { useAddPlaylist } from '../../hooks/useAddPlaylist';
import { useAddTrack } from '../../hooks/useAddTrack';
import { usePlayMusic } from '../../hooks/usePlayMusic';
import { PlayBtn, Tr, AddBtn, Td, TitleWrap, Title, Cover } from '../../styles/common.style';
import { PlaylistList } from '../common/Category';
import { ArtistMap } from '../common/ArtistMap';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const PopularPlaylistTrack = ({
    id,
    cover,
    title,
    duration,
    artists,
    album_id,
    album_title,
    trackUri,
}: IPopularPlaylistInfoProp) => {
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const useTrack = useAddTrack(id, title, cover, album_title, artists, album_id, trackUri);
    const { openCategory, addSong, mouseLeave } = usePlaylist;
    const { addTrack } = useTrack;
    const playBtn = () => playMusic({ trackUri, title, cover, artist: artists[0].name });
    const isMobile = useRecoilValue(setMobile);

    const mobilePlayBtn = () => {
        if (isMobile) {
            playBtn();
        }
    };

    return (
        <Tr onMouseLeave={mouseLeave} onClick={mobilePlayBtn}>
            <Td>
                <PlayBtn src="/assets/playButton.png" onClick={playBtn} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="album_cover" />
                    <TitleWrap>
                        <Title>{title}</Title>
                        <ArtistMap artists={artists} />
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/album/${album_id}`}>{album_title}</Link>
            </Td>
            <Td style={{ position: 'relative' }}>
                <AddBtn src="/assets/addButton.png" onClick={addSong} />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </Td>
        </Tr>
    );
};
