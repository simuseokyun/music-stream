import { useNavigate } from 'react-router-dom';
import { NewAlbumItem as INewAlbumItem } from '../../types/models/album';

export default function NewAlbumItem({ id, name, artist, cover }: INewAlbumItem) {
    const navigate = useNavigate();
    const goAlbum = () => {
        navigate(`/album/${id}`);
    };
    return (
        <div onClick={goAlbum} className=" p-[5px] rounded-md cursor-pointer md:hover:bg-[#1a191a] md:p-[10px]">
            <img className="rounded-md" src={cover} alt="앨범커버" />
            <h1 className="text-ellipsis text-sm font-bold md:text-base mt-2 ">{name}</h1>
            <p className="artists text-ellipsis text-sm text-sub">{artist}</p>
        </div>
    );
}
