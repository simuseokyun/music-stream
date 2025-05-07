import { useRecoilValue, useSetRecoilState } from 'recoil';
import { playerTracksStorage, playerTracks, setMobile } from '../../store/atoms';
import { usePlayMusic } from '../../hooks/usePlayMusic';
import { useAddPlaylist } from '../../hooks/useAddPlaylist';
import { useAddTrack } from '../../hooks/useAddTrack';

import { ITrackData } from '../../types/myPlaylist';
import { PlaylistList } from '../common/Category';
import { Artists } from '../common/Artists';

export const TrackItem = ({ track_id, track_title, cover, album_title, artists, album_id, trackUri }: ITrackData) => {
    const usePlaylist = useAddPlaylist();
    const { openCategory, addSong, mouseLeave } = usePlaylist;
    const { addTrack } = useAddTrack(track_id, track_title, cover, album_title, artists, album_id, trackUri);

    return (
        <tr onMouseLeave={mouseLeave}>
            <td className="w-[40px]">
                <img src="/assets/playButton.svg" alt="재생" />
            </td>
            <td className="w-auto py-2 pr-10">
                <h1 className="text-ellipsis font-semibold text-sm md:text-base">{track_title}</h1>
                <Artists artists={artists} />
            </td>
            <td className="w-[40px] relative">
                <img src="/assets/addButton.svg" alt="추가" />
                {openCategory && <PlaylistList addTrack={addTrack} />}
            </td>
        </tr>
    );
};
