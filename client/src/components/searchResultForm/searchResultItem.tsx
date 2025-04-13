import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { playlistList, setMobile } from '../../store/atoms';

import { useAddPlaylist } from '../../hooks/useAddPlaylist';
import { useAddTrack } from '../../hooks/useAddTrack';
import { usePlayMusic } from '../../hooks/usePlayMusic';
import { ISearchTrackProp } from '../../types/searchTracksInfo';
import { Tr, Td, PlayBtn, AddBtn, Dot, TitleWrap, Title, ArtistWrap, Cover } from '../../styles/common.style';
import { PlaylistList } from '../common/Category';
import { ArtistMap } from '../common/ArtistMap';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const SearchTrackItem = ({ id, cover, title, album_id, album_title, artists, trackUri }: ISearchTrackProp) => {
    const isMobile = useRecoilValue(setMobile);
    const playMusic = usePlayMusic();

    const { openCategory, addSong, mouseLeave } = useAddPlaylist();
    const { addTrack } = useAddTrack(id, title, cover, album_title, artists, album_id, trackUri);

    const playBtn = () => playMusic({ trackUri, title, cover, artist: artists[0].name });

    const mobilePlayBtn = () => {
        if (isMobile) {
            playBtn();
        }
    };
    return (
        <Tr onMouseLeave={mouseLeave} onClickCapture={mobilePlayBtn}>
            <Td>
                <PlayBtn src="/assets/playButton.png" onClick={playBtn} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="앨범커버" />
                    <TitleWrap>
                        <Title>{title}</Title>
                        <ArtistMap artists={artists} />
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>
            <Td style={{ position: 'relative' }}>
                <AddBtn src="/assets/addButton.png" onClick={addSong} />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </Td>
        </Tr>
    );
};
