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
            className={`p-[10px] rounded-md cursor-pointer w-full ${sortState === 'flex' && 'flex items-center'} md:hover:bg-[#1a191a]`}
            onClick={goPlaylist}
        >
            {images && images[0] ? (
                <img
                    className={`${sortState === 'flex' && 'w-[75px] h-[75px]'} rounded-md `}
                    src={images[0]?.url}
                    alt="앨범커버"
                />
            ) : (
                <img
                    className={`${sortState === 'flex' ? 'w-[75px] h-[75px]' : 'w-full'}`}
                    src="/assets/playlist.svg"
                    alt="앨범커버"
                />
            )}
            <div className="overflow-hidden">
                <h1 className={`text-ellipsis text-sm font-bold md:text-base mt-2 ${sortState === 'flex' && 'ml-4'}`}>
                    {name}
                </h1>
                <p className={`text-ellipsis text-sm font-bold text-sub ${sortState === 'flex' && 'ml-4'}`}>
                    {description}
                </p>
            </div>
        </li>
    );
}
