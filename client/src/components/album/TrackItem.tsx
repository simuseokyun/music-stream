import Artists from '../common/Artists';
import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import { MouseEventHandler } from 'react';
import { AlbumTrack } from '../../types/models/track';
import { useCategoryStore, useViewportStore, useModalStore } from '../../store/common';
export default function TrackItem({ track, image, onPlay }: AlbumTrack) {
    const { id, name, artists: artists } = track;
    const { setTrack } = useCategoryStore();
    const { open } = useModalStore();
    const { isMobile } = useViewportStore();
    const play: MouseEventHandler = (e) => {
        e.stopPropagation();
        onPlay({ id, title: name, artist: artists[0].name, image });
    };
    const mobilePlay = () => {
        if (isMobile) onPlay({ id, title: name, artist: artists[0].name, image });
    };
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
        <tr onClick={mobilePlay}>
            <td className={`${isMobile ? 'hidden ' : 'table-cell'} w-[40px] text-center`}>
                <img src="/assets/playButton.svg" alt="재생" onClick={play} />
            </td>
            <td className="p-2 pr-10">
                <h1 className="text-ellipsis font-semibold text-sm md:text-base">{name}</h1>
                <Artists artists={artists} />
            </td>
            <td className="w-[40px] relative">
                <OpenPlaylistBtn onClick={onClickCategory} />
            </td>
        </tr>
    );
}
