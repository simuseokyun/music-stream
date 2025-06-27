import { useNavigate } from 'react-router-dom';
import { ArtistAlbumItem } from '../../types/models/album';
import { AlbumType } from '../../types/models/album';
export default function AlbumItem({ album: { id, name, images, album_type, release_date } }: ArtistAlbumItem) {
    const navigate = useNavigate();
    const goAlbum = () => {
        navigate(`/album/${id}`);
    };

    return (
        <li
            className="w-full rounded-md p-2 md:hover:bg-[#1a191a] max-[768px]:p-[5px] md:hover:bg-unset"
            onClick={goAlbum}
        >
            <img className="rounded-md" src={images[0].url} alt="앨범 커버" />
            <h1 className="text-ellipsis mt-2 font-semibold text-sm md:text-base">{name}</h1>
            <div className="mt-1">
                <span className="text-sub text-sm">{release_date.slice(0, 4)}</span>
                <span className="text-sub text-sm ml-1">
                    {album_type === 'album' ? AlbumType.album : AlbumType.single}
                </span>
            </div>
        </li>
    );
}
