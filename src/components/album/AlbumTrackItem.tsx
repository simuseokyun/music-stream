import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { playerTracksStorage, playerTracks, setMobile } from '../../store/atoms';
import { usePlayMusic } from '../../hooks/usePlayMusic';
import { useAddPlaylist } from '../../hooks/useAddPlaylist';
import { useAddTrack } from '../../hooks/useAddTrack';

import { AddBtn, PlayBtn, Tr } from '../../styles/common.style';
import { ITrackData } from '../../types/myPlaylist';
import { PlaylistList } from '../categoryForm/category';
import { ArtistMap } from '../common/ArtistMap';

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
        overflow-x: hidden;
        white-space: nowrap;
    }

    &:last-child {
        text-align: right;
    }
`;
const Title = styled.h1`
    margin-bottom: 2px;
`;

export const TrackItem = ({ track_id, track_title, cover, album_title, artists, album_id, trackUri }: ITrackData) => {
    const isMobile = useRecoilValue(setMobile);
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const storageTracks = useRecoilValue(playerTracksStorage);
    const setPlayerTracks = useSetRecoilState(playerTracks);
    const { openCategory, addSong, mouseLeave } = usePlaylist;
    const { addTrack } = useAddTrack(track_id, track_title, cover, album_title, artists, album_id, trackUri);

    const onPlay = () => {
        setPlayerTracks(storageTracks);
        playMusic({ trackUri, title: track_title, cover, artist: artists[0].name });
    };

    return (
        <Tr onMouseLeave={mouseLeave}>
            <Td>
                <PlayBtn src="/assets/playButton.png" onClick={onPlay} alt="재생" />
            </Td>
            <Td>
                <Title>{track_title}</Title>
                <ArtistMap artists={artists} />
            </Td>
            <Td style={{ position: 'relative' }}>
                <AddBtn src="/assets/addButton.png" alt="추가" onClick={addSong} />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </Td>
        </Tr>
    );
};
