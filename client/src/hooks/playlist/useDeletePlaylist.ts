import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { deletePlaylist } from '../../services/playlist/playlist';
import { PlaylistListResponse } from '../../types/api/playlist';
import useThrottledToast from '../common/useTrottledToast';
const useDeletePlaylist = (playlistId?: string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const toast = useThrottledToast();
    return useMutation({
        mutationFn: async () => {
            if (!playlistId) {
                throw new Error('플레이리스트 ID가 필요합니다');
            }
            return deletePlaylist(playlistId);
        },
        onSuccess: () => {
            toast('success', '플레이리스트를 삭제하였습니다');
            const cache = queryClient.getQueryData<InfiniteData<PlaylistListResponse>>(['playlists']);
            if (cache) {
                const newData = {
                    ...cache,
                    pages: cache.pages.map((page) => ({
                        ...page,
                        items: page.items.filter((item) => item.id !== playlistId),
                    })),
                };
                queryClient.setQueryData(['playlists'], newData);
            }
            navigate('/library?active=playlist');
        },
        onError: () => {
            toast('error', '플레이리스트 삭제에 실패했습니다');
        },
    });
};

export default useDeletePlaylist;
