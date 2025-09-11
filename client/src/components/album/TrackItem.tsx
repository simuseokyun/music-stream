import Artists from '../common/Artists';
import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import convertDuration from '../../utils/common/convertDuration';
import { useCategoryStore, useModalStore } from '../../store/common';
import { AlbumTrackItem } from '../../types/models/track';
export default function TrackItem({ track, image, onPlay }: AlbumTrackItem) {
    const { id, name, artists, duration_ms } = track;
    const setTrack = useCategoryStore((state) => state.setTrack);
    const open = useModalStore((state) => state.open);

    const onClickCategory = () => {
        open('selectPlaylist');
        setTrack({
            trackId: id,
            trackTitle: name,
            artistId: artists[0].id,
            artistName: artists[0].name,
            trackImage: image,
        });
    };

    return (
        <tr>
            <td className="w-8 text-left table-cell active:scale-110">
                <img
                    className="play-button"
                    src="/assets/playButton.svg"
                    alt="재생 아이콘"
                    onClick={() => onPlay({ id })}
                />
            </td>
            <td className="p-2">
                <h1 className="text-sm font-semibold leading-none truncate md:text-base">{name}</h1>
                <div className="flex items-center">
                    <Artists artists={artists} />
                    <span className="text-sm text-sub">&nbsp;∙&nbsp;{convertDuration(duration_ms)}</span>
                </div>
            </td>
            <td className="relative w-10">
                <OpenPlaylistBtn onClick={onClickCategory} />
            </td>
        </tr>
    );
}
