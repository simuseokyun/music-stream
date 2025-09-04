import { useNavigate } from 'react-router-dom';
import { Artist } from '../../types/models/artist';
import { useSortTabStore } from '../../store/library';

export default function ArtistItem({ artist }: { artist: Artist }) {
    const { id, name, images } = artist;
    const navigate = useNavigate();
    const sortState = useSortTabStore((state) => state.active);

    const goArtist = () => {
        navigate(`/artist/${id}`);
    };
    return (
        <li
            className={`w-full p-2 rounded-md ${sortState === 'flex' && 'w-full flex items-center'} md:p-3 md:hover:bg-[#1a191a]`}
            onClick={goArtist}
        >
            <img
                className={`rounded-full ${sortState === 'flex' ? 'w-[75px] h-[75px] ' : 'w-full aspect-square'}`}
                src={images[0]?.url ?? '/assets/user.svg'}
                alt="아티스트 이미지"
            />
            <div className={`${sortState === 'flex' ? 'ml-4 flex-1 min-w-0' : 'mt-2'}`}>
                <h1
                    className={`text-sm truncate leading-none ${sortState === 'grid' ? 'text-center' : 'text-left'} md:text-base`}
                >
                    {name}
                </h1>
            </div>
        </li>
    );
}
