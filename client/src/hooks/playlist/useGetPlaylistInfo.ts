import { useQuery } from '@tanstack/react-query';
import { PlaylistInfoResponse } from '../../types/api/playlist';
import { getPlaylistInfo } from '../../services/playlist/playlist';
const useGetPlaylistInfo = (playlistId?: string) => {
    const { data, isLoading, isError } = useQuery<PlaylistInfoResponse>({
        queryKey: ['playlistInfo', playlistId],
        queryFn: () => getPlaylistInfo(playlistId!),
        enabled: !!playlistId,
        staleTime: 5000,
    });
    return { data, isLoading, isError };
};
export default useGetPlaylistInfo;
