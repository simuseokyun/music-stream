import { useNavigate } from 'react-router-dom';
import { MyAlbumItem as MyAlbumItemProps } from '../../types/api/album';
import { useSortTabStore } from '../../store/library';

export default function MyAlbumItem({ album }: MyAlbumItemProps) {
    const { id, name, artists, images } = album;
    const navigate = useNavigate();
    const sortState = useSortTabStore((state) => state.active);

    const goAlbum = () => {
        navigate(`/album/${id}`);
    };
    return (
        <li
            className={`w-full p-[10px] rounded-md cursor-pointer ${sortState === 'flex' && 'w-full flex items-center'} md:hover:bg-[#1a191a]`}
            onClick={goAlbum}
        >
            <img
                className={`rounded-md ${sortState === 'flex' ? 'w-[75px] h-[75px] flex-shrink-0' : ''}`}
                src={images[0].url}
                alt="앨범커버"
            />
            <div className={`mt-2 ${sortState === 'flex' ? 'ml-4 flex-1 min-w-0' : ''}`}>
                <h1 className="text-ellipsis text-sm font-bold md:text-base">{name}</h1>
                <p className="text-ellipsis text-sm text-sub mt-0.5">{artists[0].name}</p>
            </div>
        </li>
    );
}
