import { useNavigate } from 'react-router-dom';
import { AllAlbumItem } from '../../types/models/album';

export const AlbumItem = ({ id, cover, name, release, type }: AllAlbumItem) => {
    const navigate = useNavigate();
    const goAlbum = () => {
        navigate(`/album/${id}`);
    };

    return (
        <li
            className="w-full rounded-md p-2 md:hover:bg-[#1a191a] max-[768px]:p-[5px] md:hover:bg-unset"
            onClick={goAlbum}
        >
            <img className="rounded-md" src={cover} alt="앨범 커버" />
            <h1 className="text-ellipsis mt-2 font-semibold text-sm md:text-base">{name}</h1>
            <div className="mt-1">
                <span className="text-sub text-sm">{release}</span>
                <span className="text-sub text-sm ml-1">{type}</span>
            </div>
        </li>
    );
};
