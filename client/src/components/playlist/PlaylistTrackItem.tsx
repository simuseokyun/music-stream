import Artists from '../common/Artists';
import { useModalStore, useViewportStore } from '../../store/common';
import { MyPlaylistTrack } from '../../types/models/track';
import { MouseEventHandler } from 'react';
import useDeleteTrack from '../../hooks/track/useDeleteTrack';
import useThrottledToast from '../../hooks/common/useTrottledToast';

export default function PlaylistTrackItem({ track, playlistId, onPlay }: MyPlaylistTrack) {
    const toast = useThrottledToast();
    const {
        id,
        name,
        album: { artists, images },
        is_local,
    } = track;

    const { mutate: onDelete } = useDeleteTrack(playlistId, id);
    const isMobile = useViewportStore((state) => state.isMobile);
    const play: MouseEventHandler = (e) => {
        e.stopPropagation();
        if (is_local) {
            toast('error', '로컬 파일은 재생할 수 없습니다', id);
            return;
        }
        onPlay({ id, title: name, artist: artists[0].name, image: images[0].url });
    };

    const mobilePlay = () => {
        if (isMobile) onPlay({ id, title: name, artist: artists[0].name, image: images[0].url });
    };
    return (
        <tr onClick={mobilePlay} className="group md:hover:bg-[#1a191a]">
            <td className={`${isMobile ? 'hidden ' : 'table-cell'} w-[40px] text-center`}>
                <img src="/assets/playButton.svg" onClick={play} />
            </td>
            <td className="w-5/5 md:w-3/5 py-1.5">
                <div className="flex items-center">
                    <img
                        className="img-medium rounded-md"
                        src={images[0]?.url || '/assets/playlist.svg'}
                        alt="앨범커버"
                    />
                    <div className="ml-2 flex-1 text-ellipsis">
                        <h1 className="text-ellipsis font-semibold">{name}</h1>
                        <Artists artists={artists} />
                    </div>
                </div>
            </td>
            <td className="w-0 md:w-2/5"></td>
            <td className="relative w-[40px]">
                <button className="text-sm md:opacity-0 md:group-hover:opacity-100 " onClick={() => onDelete()}>
                    삭제
                </button>
            </td>
        </tr>
    );
}
