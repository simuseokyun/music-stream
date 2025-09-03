import { useNavigate } from 'react-router-dom';
import { Album } from '../../types/models/album';

export default function AlbumItem({ album }: { album: Album }) {
    const { id, name, artists, images } = album;
    const navigate = useNavigate();
    const goAlbum = () => {
        navigate(`/album/${id}`);
    };
    return (
        <div onClick={goAlbum} className="p-2  rounded-md md:hover:bg-[#1a191a] md:p-3">
            <img className="rounded-md" src={images[0]?.url ?? '/assets/playlist.svg'} alt="앨범 커버" />
            <h1 className="text-sm md:text-base leading-normal mt-2 truncate">{name}</h1>
            <p className=" text-sm text-sub truncate">{artists[0]?.name}</p>
        </div>
    );
}
