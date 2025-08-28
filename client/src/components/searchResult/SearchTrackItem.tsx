import { Link } from 'react-router-dom';
import Artists from '../common/Artists';
import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import { TrackItem as SearchTrackItem } from '../../types/models/track';
import { useModalStore, useViewportStore, useCategoryStore } from '../../store/common';

export const TrackItem = ({ track, onPlay }: SearchTrackItem) => {
    const {
        id,
        name,
        album: { artists, images, id: albumId, name: albumTitle },
    } = track;
    const open = useModalStore((state) => state.open);
    const isMobile = useViewportStore((state) => state.isMobile);
    const setTrack = useCategoryStore((state) => state.setTrack);
    const openCategory = () => {
        open('selectPlaylist');
        setTrack({
            trackId: id,
            trackTitle: name,
            artistId: artists[0].id,
            artistName: artists[0].name,
            trackImage: images[0].url || '/assets/playlist.svg',
        });
    };

    return (
        <tr onClick={isMobile ? () => onPlay({ id }) : undefined}>
            <td className={`${isMobile ? 'hidden ' : 'table-cell'} w-10 text-center`}>
                <img
                    className="play-button"
                    src="/assets/playButton.svg"
                    alt="재생 아이콘"
                    onClick={() => onPlay({ id })}
                />
            </td>
            <td className="w-full py-1.5 pr-5 md:w-3/5">
                <div className="flex items-center overflow-hidden">
                    <img className="img-medium rounded-md " src={images[0].url} alt="앨범 커버" />
                    <div className="ml-4 flex-1 ">
                        <h1 className="truncate">{name}</h1>
                        <Artists artists={artists} />
                    </div>
                </div>
            </td>
            <td className="hidden pr-10 md:table-cell md:w-[25%]">
                <Link className="block  text-sm truncate" to={`/album/${albumId}`}>
                    {albumTitle}
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
