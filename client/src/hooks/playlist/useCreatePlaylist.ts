import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { fetchWithAuth } from '../../services/api/client';
import { PlaylistListResponse } from '../../types/api/playlist';

const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { name: string; description: string; user: string }) => {
            return await fetchWithAuth(`/api/me/playlist/add`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                data,
            });
        },
        onSuccess: (data) => {
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
        onError: (error) => {
            console.log(error);
        },
    });
};

export default useCreatePlaylist;
