import { Category, CategoryItem } from '../../styles/common.style';
import { useRecoilValue } from 'recoil';
import { playlistSelector } from '../../state/atoms';

export const PlaylistSelector = ({ addTrack }: { addTrack: (event: React.MouseEvent<HTMLLIElement>) => void }) => {
    const playlists = useRecoilValue(playlistSelector);
    return (
        <Category>
            {playlists?.map((playlist) => {
                return (
                    <CategoryItem key={playlist.id} id={playlist.title} onClick={addTrack}>
                        {playlist.title}
                    </CategoryItem>
                );
            })}
        </Category>
    );
};
