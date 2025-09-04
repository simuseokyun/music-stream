import Artists from '../common/Artists';
import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import { AlbumTrackItem } from '../../types/models/track';
import { useCategoryStore, useViewportStore, useModalStore } from '../../store/common';

export default function TrackItem({ track, image, onPlay }: AlbumTrackItem) {
    const { id, name, artists } = track;
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
            <td className="w-10 text-center table-cell">
                <img
                    className="play-button"
                    src="/assets/playButton.svg"
                    alt="재생 아이콘"
                    onClick={() => onPlay({ id })}
                />
            </td>
            <td className="p-2">
                <h1 className="text-sm font-semibold leading-none truncate md:text-base">{name}</h1>
                <Artists artists={artists} />
            </td>
            <td className="relative w-10">
                <OpenPlaylistBtn onClick={onClickCategory} />
            </td>
        </tr>
    );
}
