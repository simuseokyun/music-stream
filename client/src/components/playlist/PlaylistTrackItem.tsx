import { MouseEventHandler } from 'react';
import useDeleteTrack from '../../hooks/track/useDeleteTrack';
import useThrottledToast from '../../hooks/common/useTrottledToast';
import Artists from '../common/Artists';

import convertDuration from '../../utils/common/convertDuration';
import { PlaylistTrackItem } from '../../types/models/track';

export default function TrackItem({ track, playlistId, onPlay }: PlaylistTrackItem) {
    const {
        id,
        name,
        album: { artists, images },
        is_local,
        duration_ms,
    } = track;
    const { mutate: onDelete } = useDeleteTrack(playlistId, id);
    const toast = useThrottledToast();

    const playSong: MouseEventHandler = (e) => {
        e.stopPropagation();
        if (is_local) {
            toast('error', '로컬 파일은 재생할 수 없습니다');
            return;
        }
        onPlay({ id });
    };

    return (
        <tr className="md:hover:bg-[#1a191a] group">
            <td className="w-8 text-left table-cell transition-transform duration-200  active:scale-110">
                <img className="play-button" src="/assets/playButton.svg" alt="재생 아이콘" onClick={playSong} />
            </td>
            <td className="w-full md:w-3/5 py-2">
                <div className="flex items-center">
                    <img
                        className="img-medium rounded-md"
                        src={images[0]?.url || '/assets/playlist.svg'}
                        alt="앨범 커버"
                    />
                    <div className="ml-2 w-full truncate">
                        <h1 className="text-[14px] font-semibold truncate md:text-base">{name}</h1>
                        <div className="flex items-center">
                            <Artists artists={artists} />
                            <span className="text-sm text-sub">&nbsp;∙&nbsp;{convertDuration(duration_ms)}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="w-0 md:w-2/5" />
            <td className="w-10">
                <button className="text-sm md:opacity-0 md:group-hover:opacity-100" onClick={() => onDelete()}>
                    삭제
                </button>
            </td>
        </tr>
    );
}
