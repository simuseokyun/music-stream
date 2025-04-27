import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { playerTracksStorage, playerTracks, setMobile } from '../../store/atoms';
import { usePlayMusic } from '../../hooks/usePlayMusic';
import { useAddPlaylist } from '../../hooks/useAddPlaylist';
import { useAddTrack } from '../../hooks/useAddTrack';

import { AddBtn, PlayBtn, Tr } from '../../styles/common.style';
import { ITrackData } from '../../types/myPlaylist';
import { PlaylistList } from '../common/Category';
import { Artists } from '../common/Artists';

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

    return (
        <tr onMouseLeave={mouseLeave}>
            <td className="w-[40px]">
                <img src="/assets/playButton.svg" alt="재생" />
            </td>
            <td className="w-auto py-2 pr-10">
                <h1 className="text-ellipsis mb-1 font-semibold text-sm md:text-base">{track_title}</h1>
                <Artists artists={artists} />
            </td>
            <td className="w-[40px] relative">
                <img src="/assets/addButton.svg" alt="추가" />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </td>
        </tr>
    );
};
