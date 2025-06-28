import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { axiosWithAuth } from '../../services/api/client';
import { PlaylistListResponse } from '../../types/api/playlist';
import useThrottledToast from '../common/useTrottledToast';
const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const toast = useThrottledToast();
    return useMutation({
        mutationFn: async (data: { name: string; description: string; user: string }) => {
            return await axiosWithAuth(`/api/me/playlist/add`, {
                method: 'post',
                data,
                headers: { 'Content-Type': 'application/json' },
            });
        },
        onSuccess: (data) => {
            toast('success', '플레이리스트를 생성하였습니다', data.user);
            const cache = queryClient.getQueryData<InfiniteData<PlaylistListResponse>>(['playlists']);
            if (!cache) {
                return;
            }
            const newData = {
                ...cache,
                pages: [{ ...cache.pages[0], items: [data, ...cache.pages[0].items] }, ...cache.pages.slice(1)],
            };
            queryClient.setQueryData(['playlists'], newData);
        },
        onError: (error, variables) => {
            toast('error', '플레이리스트 생성에 실패했습니다', variables.user);
        },
    });
};

export default useCreatePlaylist;
