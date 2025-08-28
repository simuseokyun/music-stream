import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { createPlaylist } from '../../services/playlist/playlist';
import { PlaylistListResponse } from '../../types/api/playlist';
import useThrottledToast from '../common/useTrottledToast';
const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const toast = useThrottledToast();
    return useMutation({
        mutationFn: createPlaylist,
        onSuccess: (data) => {
            toast('success', '플레이리스트를 생성하였습니다');
            const cache = queryClient.getQueryData<InfiniteData<PlaylistListResponse>>(['playlists']);
            if (cache) {
                const newData = {
                    ...cache,
                    pages: [{ ...cache.pages[0], items: [data, ...cache.pages[0].items] }, ...cache.pages.slice(1)],
                };
                queryClient.setQueryData(['playlists'], newData);
            }
        },
        onError: () => {
            toast('error', '플레이리스트 생성에 실패했습니다');
        },
    });
};

export default useCreatePlaylist;
