import styled from 'styled-components';
import { durationTransform } from '../../utils/durationTransform';
import { playerTracksStorage, playerTracks } from '../../store/atoms';
import { IArtistsTopTrack } from '../../types/artistInfo';
import { PlayBtn, Tr, AddBtn, Cover } from '../../styles/common.style';
import { PlaylistList } from '../common/Category';
import { usePlayMusic } from '../../hooks/usePlayMusic';
import { useAddTrack } from '../../hooks/useAddTrack';
import { useAddPlaylist } from '../../hooks/useAddPlaylist';
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
        text-align: right;
    }
`;

export const FiveTrackItem = ({ trackUri, id, cover, title, artists, albumId, albumTitle }: IArtistsTopTrack) => {
    const playMusic = usePlayMusic();
    const { openCategory, addSong, mouseLeave } = useAddPlaylist();
    const storageTracks = useRecoilValue(playerTracksStorage);
    const setPlayerTracks = useSetRecoilState(playerTracks);
    const { addTrack } = useAddTrack(id, title, cover, albumTitle, artists, albumId, trackUri);

    const playBtn = () => {
        setPlayerTracks(storageTracks);
        playMusic({ trackUri, title, cover, artist: artists[0].name });
    };
    return (
        <tr onMouseLeave={mouseLeave}>
            <td className="w-0 sm:w-[40px]">
                <img src="/assets/playButton.svg" alt="재생" onClick={playBtn} />
            </td>
            <td className="w-auto py-1">
                <div className="flex items-center">
                    <img className="img-medium rounded-md" src={cover} alt="앨범커버" />
                    <h1 className="text-ellipsis ml-2 font-semibold text-sm md:text-base">{title}</h1>
                </div>
            </td>
            <td className="w-[40px] text-right relative">
                <img src="/assets/addButton.svg" alt="추가" onClick={addSong} />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </td>
        </tr>
    );
};
