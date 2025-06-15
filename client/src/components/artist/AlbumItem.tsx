import { useNavigate } from 'react-router-dom';
import { ArtistAlbumList } from '../../types/models/album';

export const AlbumItem = ({ id, name, cover, type, year }: ArtistAlbumList) => {
    const navigate = useNavigate();
    const goAlbum = () => navigate(`/album/${id}`);
    return (
        <li className="md:hover:bg-[#1a191a] p-[10px] rounded-md cursor-pointer" onClick={goAlbum}>
            <img className="rounded-md" src={cover} alt="앨범 커버" />
            <h1 className="text-ellipsis mt-2 font-semibold text-sm sm:text-base">{name}</h1>
            <div className="mt-1">
                <span className="text-sub text-sm">{year}</span>
                <span className="text-sub text-sm ml-1">{type}</span>
            </div>
        </li>
    );
};
