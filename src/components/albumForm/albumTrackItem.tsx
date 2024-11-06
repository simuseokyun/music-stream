import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { playerTracksStorage, playerTracks, setMobile } from '../../state/atoms';
import { usePlayMusic, useAddPlaylist, useAddTrack } from '../../utils/util';
import { Dot, AddBtn, PlayBtn, Tr, ArtistWrap } from '../../styles/common.style';
import { ITrackData } from '../../types/myPlaylist';
import { PlaylistList } from '../categoryForm/category';

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

    const playBtn = () => {
        setPlayerTracks(storageTracks);
        playMusic({ trackUri, title: track_title, cover, artist: artists[0].name });
    };

    return (
        <Tr onMouseLeave={mouseLeave}>
            <Td>
                <PlayBtn src="/images/playButton.png" onClick={playBtn} alt="재생" />
            </Td>
            <Td>
                <Title>{track_title}</Title>
                {artists.map((artist, i) => (
                    <ArtistWrap key={artist.name}>
                        <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                        {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                    </ArtistWrap>
                ))}
            </Td>
            <Td style={{ position: 'relative' }}>
                <AddBtn src="/images/addButton.png" alt="추가" onClick={addSong} />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </Td>
        </Tr>
    );
};
