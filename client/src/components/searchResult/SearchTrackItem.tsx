import { Link } from 'react-router-dom';
import Artists from '../common/Artists';
import OpenPlaylistBtn from '../common/button/OpenCategoryBtn';
import { useModalStore, useCategoryStore } from '../../store/common';
import { TrackItem as SearchTrackItem } from '../../types/models/track';

export const TrackItem = ({ track, onPlay }: SearchTrackItem) => {
    const {
        id,
        name,
        album: { artists, images, id: albumId, name: albumTitle },
    } = track;
    const open = useModalStore((state) => state.open);
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
        <tr>
            <td className="w-8 text-left table-cell transition-transform duration-200  active:scale-110">
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
                    <div className="ml-2 flex-1 truncate">
                        <h1 className="text-[14px] font-semibold truncate md:text-base">{name}</h1>
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
