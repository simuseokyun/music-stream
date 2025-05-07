import { useRecoilValue } from 'recoil';
import { gridState } from '../../store/atoms';
import { useNavigate } from 'react-router-dom';
import { useAddPlaylist } from '../../hooks/useAddPlaylist';
import usePlaylistInfo from '../../store/usePlaylistInfo';

export const MyPlaylistItem = ({
    id,
    name,
    image,
    owner,
    grid,
}: {
    id: string;
    name: string;
    image: string;
    owner: string;
    grid: string;
}) => {
    const navigate = useNavigate();
    const setPlaylistInfo = usePlaylistInfo((state) => state.setPlaylistInfo);
    const onClickPlaylist = () => {
        setPlaylistInfo({
            id,
            name,
            image: image || '/assets/playlist.svg',
            owner,
        });
        navigate(`/me/playlist/${id}`);
    };

    return (
        <li
            className={`p-[10px] rounded-md cursor-pointer ${grid === 'flex' && 'w-full flex items-center'} md:hover:bg-[#1a191a]`}
            onClick={onClickPlaylist}
        >
            {image ? (
                <img className={`rounded-md ${grid === 'flex' && 'w-[100px] h-[100px]'}`} src={image} alt="앨범커버" />
            ) : (
                <img className={`${grid === 'flex' ? 'w-[100px] h-[100px]' : 'w-full'}`} src="/assets/playlist.svg" />
            )}
            <h1 className={`text-ellipsis text-sm font-bold md:text-base mt-2 ${grid === 'flex' && 'ml-4'}`}>{name}</h1>
        </li>
    );
};
