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
            className={`w-full rounded-md ${sortState === 'flex' && 'w-full flex items-center mt-2'} lg:p-3 lg:hover:bg-[#1a191a]`}
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
            <div className={`overflow-hidden ${sortState === 'flex' && 'ml-3'}`}>
                <h1 className={`font-semibold leading-none truncate  ${sortState === 'grid' && 'mt-3'}`}>{name}</h1>
                <p className={`text-sm mt-0.5 text-sub truncate`}>{description}</p>
            </div>
        </li>
    );
}
