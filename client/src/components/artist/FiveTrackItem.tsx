import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import { MouseEventHandler } from 'react';
import { ArtistTrackItem } from '../../types/api/track';
import { useCategoryStore, useViewportStore, useModalStore } from '../../store/common';
export default function TrackItem({ track, onPlay }: ArtistTrackItem) {
    const {
        id,
        name,
        artists: [artists],
        album: {
            images: [images],
        },
    } = track;
    const { isMobile } = useViewportStore();
    const { setTrack } = useCategoryStore((state) => state);
    const { open } = useModalStore();
    const play: MouseEventHandler = (e) => {
        e.stopPropagation();
        onPlay({ id, title: name, artist: artists.name, image: images.url });
    };

    const mobilePlay = () => {
        if (isMobile) onPlay({ id, title: name, artist: artists.name, image: images.url });
    };
    const onClickCategory = () => {
        const trackInfo = {
            trackId: id,
            trackTitle: name,
            artistName: artists.name,
            artistId: artists.id,
            trackImage: images.url,
        };
        open('selectPlaylist');
        setTrack(trackInfo);
    };

    return (
        <tr onClick={mobilePlay}>
            <td className={`${isMobile ? 'hidden ' : 'table-cell'} w-[40px] text-center`}>
                <img src="/assets/playButton.svg" onClick={play} />
            </td>
            <td className="w-auto py-1">
                <div className="flex items-center">
                    <img className="img-medium rounded-md" src={images.url} alt="앨범커버" />
                    <h1 className="text-ellipsis ml-4 font-semibold text-sm md:text-base">{name}</h1>
                </div>
            </td>
            <td className="text-right relative w-[40px]">
                <OpenPlaylistBtn onClick={onClickCategory} />
            </td>
        </tr>
    );
}
