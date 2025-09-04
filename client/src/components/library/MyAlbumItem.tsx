import { useNavigate } from 'react-router-dom';
import { Album, AlbumType } from '../../types/models/album';
import { useSortTabStore } from '../../store/library';

export default function AlbumItem({ album }: { album: Album }) {
    const { id, name, artists, images, album_type } = album;
    const navigate = useNavigate();
    const sortState = useSortTabStore((state) => state.active);
    const goAlbum = () => {
        navigate(`/album/${id}`);
    };
    return (
        <li
            className={`w-full p-2 rounded-md ${sortState === 'flex' && 'w-full flex items-center'} md:p-3 md:hover:bg-[#1a191a]`}
            onClick={goAlbum}
        >
            <img
                className={`rounded-md ${sortState === 'flex' ? 'w-[75px] h-[75px]' : 'w-full aspect-square'}`}
                src={images[0]?.url ?? '/assets/playlist.svg'}
                alt="앨범 커버"
            />
            <div className={`mt-2 ${sortState === 'flex' && 'ml-4 flex-1 min-w-0'}`}>
                <h1 className="text-sm truncate leading-none md:text-base">{name}</h1>
                <p className="text-sm text-sub truncate">
                    {artists[0]?.name}
                    <span className="ml-2">{AlbumType[album_type as keyof typeof AlbumType]}</span>
                </p>
            </div>
        </li>
    );
}
