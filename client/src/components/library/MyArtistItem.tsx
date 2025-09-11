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
            className={`w-full rounded-md ${sortState === 'flex' && 'w-full flex items-center mt-2 '} lg:p-3 lg:hover:bg-[#1a191a]`}
            onClick={goArtist}
        >
            <img
                className={`rounded-full ${sortState === 'flex' ? 'w-[75px] h-[75px] ' : 'w-full aspect-square'}`}
                src={images[0]?.url ?? '/assets/user.svg'}
                alt="아티스트 이미지"
            />
            <div className={`${sortState === 'flex' ? 'ml-3 flex-1' : 'mt-3'}`}>
                <h1
                    className={`text-base font-semibold truncate leading-none ${sortState === 'grid' ? 'text-center' : 'text-left'}`}
                >
                    {name}
                </h1>
            </div>
        </li>
    );
}
