import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import { TrackItem as FiveTrackItem } from '../../types/models/track';
import { useCategoryStore, useViewportStore, useModalStore } from '../../store/common';
export default function TrackItem({ track, onPlay }: FiveTrackItem) {
    const {
        id,
        name,
        album: {
            images: [images],
            artists: [artists],
        },
    } = track;
    const { isMobile } = useViewportStore();
    const { setTrack } = useCategoryStore((state) => state);
    const { open } = useModalStore();

    const onClickCategory = () => {
        const trackInfo = {
            trackId: id,
            trackTitle: name,
            artistName: artists?.name,
            artistId: artists?.id,
            trackImage: images?.url,
        };
        open('selectPlaylist');
        setTrack(trackInfo);
    };

    return (
        <tr>
            <td className="table-cell w-8 text-left">
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
                    <h1 className="font-semibold text-sm ml-2 leading-none truncate md:text-base">{name}</h1>
                </div>
            </td>
            <td className="text-right relative w-10">
                <OpenPlaylistBtn onClick={onClickCategory} />
            </td>
        </tr>
    );
}
