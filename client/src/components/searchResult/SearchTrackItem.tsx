import { Link } from 'react-router-dom';
import Artists from '../common/Artists';
import { useViewportStore, useCategoryStore } from '../../store/common';
import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import { MouseEventHandler } from 'react';
import { useModalStore } from '../../store/common';
import { SearchResultTrack } from '../../types/models/searchResult';

export const TrackItem = ({ track, onPlay }: SearchResultTrack) => {
    const {
        id,
        name,
        album: { artists, images, id: album_id, name: album_title },
    } = track;
    const isMobile = useViewportStore((state) => state.isMobile);
    const { open } = useModalStore();
    const { setTrack } = useCategoryStore((state) => state);
    const openCategory = () => {
        open('selectPlaylist');
        setTrack({
            trackId: id,
            trackTitle: name,
            artistId: artists[0].id,
            artistName: artists[0].name,
            trackImage: images[0].url,
        });
    };

    const play: MouseEventHandler = (e) => {
        e.stopPropagation();
        onPlay({ id, title: name, artist: artists[0].name, image: images[0].url });
    };

    const mobilePlay = () => {
        if (isMobile) onPlay({ id, title: name, artist: artists[0].name, image: images[0].url });
    };

    return (
        <tr onClick={mobilePlay}>
            <td className={`${isMobile ? 'hidden ' : 'table-cell'} w-[40px] text-center`}>
                <img src="/assets/playButton.svg" onClick={play} />
            </td>
            <td className="w-full py-1.5 pr-5 md:w-3/5">
                <div className="flex items-center">
                    <img className="img-medium rounded-md " src={images[0].url} alt="앨범커버" />
                    <div className="ml-4 flex-1 text-ellipsis">
                        <h1 className="text-ellipsis font-semibold">{name}</h1>
                        <Artists artists={artists} />
                    </div>
                </div>
            </td>
            <td className="hidden pr-10 text-ellipsis md:table-cell md:w-[25%]">
                <Link className="text-sm text-ellipsis" to={`/album/${album_id}`}>
                    {album_title}
                </Link>
            </td>
            <td
                className="relative w-[40px] text-center"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <OpenPlaylistBtn onClick={openCategory} />
            </td>
        </tr>
    );
};
