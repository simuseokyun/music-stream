import { useQuery } from '@tanstack/react-query';
import { getPlaylistInfo } from '../../services/playlist/playlist';
import { Playlist } from '../../types/models/playlist';
const useGetPlaylistInfo = (playlistId?: string) => {
    const { data, isLoading, isError } = useQuery<Playlist>({
        queryKey: ['playlist', 'info', playlistId],
        queryFn: () => {
            if (!playlistId) throw new Error('목록을 불러올 수 없습니다');
            return getPlaylistInfo(playlistId);
        },
        enabled: !!playlistId,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
    return { data, isLoading, isError };
};
export default useGetPlaylistInfo;
