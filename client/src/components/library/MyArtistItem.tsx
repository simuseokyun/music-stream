import { useNavigate } from 'react-router-dom';

import { useSortTabStore } from '../../store/library';
import { Artist } from '../../types/api/artist';

export default function ArtistItem({ artist }: { artist: Artist }) {
    const { id, name, images } = artist;
    const navigate = useNavigate();
    const sortState = useSortTabStore((state) => state.active);

    const goArtist = () => {
        navigate(`/artist/${id}`);
    };
    return (
        <li
            className={`w-full p-[10px] rounded-md cursor-pointer ${sortState === 'flex' && 'w-full flex items-center'} md:hover:bg-[#1a191a]`}
            onClick={goArtist}
        >
            <img
                className={`rounded-full ${sortState === 'flex' ? 'w-[75px] h-[75px] flex-shrink-0' : 'w-full aspect-square'}`}
                src={images[0].url}
                alt="앨범 커버"
            />
            <div className={` ${sortState === 'flex' ? 'ml-4 flex-1 min-w-0' : 'mt-2'}`}>
                <h1
                    className={`truncate text-sm font-bold md:text-base ${sortState === 'grid' ? 'text-center' : 'text-left'}`}
                >
                    {name}
                </h1>
            </div>
        </li>
    );
}
