import { useNavigate } from 'react-router-dom';
import { ArtistAlbumItem } from '../../types/models/album';
import { AlbumType } from '../../types/models/album';

export default function AlbumItem({ album }: ArtistAlbumItem) {
    const { id, images, name, release_date, album_type } = album;
    const navigate = useNavigate();
    const goAlbum = () => navigate(`/album/${id}`);
    return (
        <li className="md:hover:bg-[#1a191a] p-[10px] rounded-md cursor-pointer" onClick={goAlbum}>
            <img className="rounded-md" src={images[0]?.url} alt="앨범 커버" />
            <h1 className="text-ellipsis mt-2 font-semibold text-sm sm:text-base">{name}</h1>
            <div className="mt-1">
                <span className="text-sub text-sm">{release_date.slice(0, 4)}</span>
                <span className="text-sub text-sm ml-1">
                    {album_type === 'album' ? AlbumType.album : AlbumType.single}
                </span>
            </div>
        </li>
    );
}
