import { useNavigate } from 'react-router-dom';
import { PlaylistItem as PlaylistItemProps } from '../../types/models/playlist';
export default function PlaylistItem({ playlist, sortState }: PlaylistItemProps) {
    const { id, name, description, images } = playlist;
    const navigate = useNavigate();
    const goPlaylist = () => {
        navigate(`/me/playlist/${id}`);
    };

    return (
        <li
            className={`w-full p-2 rounded-md ${sortState === 'flex' && 'flex items-center'} md:p-3 md:hover:bg-[#1a191a]`}
            onClick={goPlaylist}
        >
            {images && images[0] ? (
                <img
                    className={`rounded-md ${sortState === 'flex' && 'w-[75px] h-[75px]'}`}
                    src={images[0]?.url}
                    alt="앨범 커버"
                />
            ) : (
                <img
                    className={`${sortState === 'flex' ? 'w-[75px] h-[75px]' : 'w-full'}`}
                    src="/assets/playlist.svg"
                    alt="앨범 커버"
                />
            )}
            <div className="overflow-hidden">
                <h1 className={`text-sm md:text-base mt-2 truncate ${sortState === 'flex' && 'ml-4'}`}>{name}</h1>
                <p className={`text-sm text-sub truncate ${sortState === 'flex' && 'ml-4'}`}>{description}</p>
            </div>
        </li>
    );
}
