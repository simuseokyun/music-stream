import { useNavigate } from 'react-router-dom';
import { Album } from '../../types/models/album';
import { AlbumType } from '../../types/models/album';

export default function AlbumItem({ album }: { album: Album }) {
    const { id, images, name, release_date, album_type } = album;
    const navigate = useNavigate();
    const goAlbum = () => navigate(`/album/${id}`);
    return (
        <li className="rounded-md md:hover:bg-[#1a191a] " onClick={goAlbum}>
            <img className="w-full rounded-md" src={images[0]?.url ?? '/assets/playlist.svg'} alt="앨범 커버" />
            <h1 className="text-sm font-semibold mt-2 leading-none truncate md:text-base">{name}</h1>
            <div>
                <span className="text-sub text-sm">{release_date.slice(0, 4)}</span>
                <span className="text-sub text-sm ml-1">∙ {AlbumType[album_type as keyof typeof AlbumType]}</span>
            </div>
        </li>
    );
}
