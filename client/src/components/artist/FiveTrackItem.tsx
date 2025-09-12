import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import Artists from '../common/Artists';
import { useCategoryStore, useModalStore } from '../../store/common';
import convertDuration from '../../utils/common/convertDuration';
import { TrackItem as FiveTrackItem } from '../../types/models/track';
export default function TrackItem({ track, onPlay }: FiveTrackItem) {
    const {
        id,
        name,
        album: {
            images: [images],
            artists,
        },
        duration_ms,
    } = track;

    const { setTrack } = useCategoryStore((state) => state);
    const { open } = useModalStore();

    const onClickCategory = () => {
        const trackInfo = {
            trackId: id,
            trackTitle: name,
            artistName: artists[0]?.name,
            artistId: artists[0]?.id,
            trackImage: images?.url,
        };
        open('selectPlaylist');
        setTrack(trackInfo);
    };

    return (
        <tr>
            <td className="w-8 text-left table-cell transition-transform duration-200  active:scale-110">
                <img
                    className="play-button"
                    src="/assets/playButton.svg"
                    alt="재생 아이콘"
                    onClick={() => onPlay({ id })}
                />
            </td>
            <td className="w-auto py-1">
                <div className="flex items-center">
                    <img className="img-medium rounded-md" src={images?.url ?? '/assets/playlist.svg'} alt="앨범커버" />
                    <div className="ml-3">
                        <h1 className="font-semibold text-sm leading-none truncate md:text-base">{name}</h1>
                        <div className="flex items-center">
                            <Artists artists={artists} />
                            <span className="text-sm text-sub">&nbsp;∙&nbsp;{convertDuration(duration_ms)}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="text-right relative w-10">
                <OpenPlaylistBtn onClick={onClickCategory} />
            </td>
        </tr>
    );
}
