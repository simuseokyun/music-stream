import { useNavigate } from 'react-router-dom';
import { AlbumType, Album } from '../../types/models/album';
export default function AlbumItem({ album }: { album: Album }) {
    const { id, name, images, release_date, album_type } = album;
    const navigate = useNavigate();
    const goAlbum = () => {
        navigate(`/album/${id}`);
    };

    return (
        <li className="w-full rounded-md lg:p-3 lg:hover:bg-[#1a191a] " onClick={goAlbum}>
            <img className="rounded-md" src={images[0]?.url ?? '/assets/playlist.svg'} alt="앨범 커버" />
            <h1 className="text-sm font-semibold mt-2 truncate md:text-base">{name}</h1>
            <div>
                <span className="text-sub text-sm">{AlbumType[album_type as keyof typeof AlbumType]}</span>
                <span className="text-sub text-sm ml-1">∙ {release_date.slice(0, 4)}</span>
            </div>
        </li>
    );
}
