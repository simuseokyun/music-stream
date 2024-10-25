import styled from 'styled-components';
import { durationTransform, usePlayMusic, useAddPlaylist, useAddTrack } from '../../utils/util';
import { playerTracksStorage, playerTracks } from '../../state/atoms';
import { IArtistsTopTrack } from '../../types/artistInfo';
import { PlayBtn, Tr, AddBtn, Cover } from '../../styles/common.style';
import { PlaylistList } from '../categoryForm/category';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.p`
    margin-left: 10px;
`;

const Td = styled.td`
    padding: 5px;
    &:first-child {
        width: 5%;
    }
    &:nth-child(2) {
        width: 80%;
        text-align: left;
        max-width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &:nth-child(3) {
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        text-align: right;
    }
`;

export const TopFiveTracks = ({
    trackUri,
    id,
    cover,
    title,
    artists,
    album_id,
    album_title,
    duration_ms,
}: IArtistsTopTrack) => {
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const storageTracks = useRecoilValue(playerTracksStorage);
    const setPlayerTracks = useSetRecoilState(playerTracks);
    const { openCategory, addSong, mouseLeave } = usePlaylist;
    const { addTrack } = useAddTrack(id, title, cover, album_title, artists, album_id, trackUri);

    const playBtn = () => {
        setPlayerTracks(storageTracks);
        playMusic({ trackUri, title, cover, artist: artists[0].name });
    };
    return (
        <Tr onMouseLeave={mouseLeave}>
            <Td>
                <PlayBtn src="/images/playButton.png" alt="재생" onClick={playBtn} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="앨범커버" />
                    <Title>{title}</Title>
                </TdWrap>
            </Td>
            <Td>{`${durationTransform(duration_ms).minutes}:${
                String(durationTransform(duration_ms).seconds).length === 1
                    ? `0${durationTransform(duration_ms).seconds}`
                    : durationTransform(duration_ms).seconds
            }`}</Td>
            <Td style={{ position: 'relative' }}>
                <AddBtn src="/images/addButton.png" alt="추가" onClick={addSong} />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </Td>
        </Tr>
    );
};
