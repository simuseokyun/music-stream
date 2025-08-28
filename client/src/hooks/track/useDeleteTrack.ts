import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { deleteTrack } from '../../services/track/track';
import { PlaylistTracksResponse } from '../../types/api/track';
import { Playlist as PlaylistInfoResponse } from '../../types/models/playlist';
import useThrottledToast from '../common/useTrottledToast';
const useDeleteTrack = (playlistId: string, id: string) => {
    const queryClient = useQueryClient();
    const toast = useThrottledToast();
    return useMutation({
        mutationFn: async () => {
            if (!playlistId || !id) throw new Error('해당 곡을 삭제하지 못했습니다');
            const data = await deleteTrack(playlistId, id);
            return data;
        },
        onSuccess: () => {
            toast('success', '해당 곡을 삭제하였습니다');
            const trackCache = queryClient.getQueryData<InfiniteData<PlaylistTracksResponse>>(['playlist', playlistId]);
            const infoCache = queryClient.getQueryData<PlaylistInfoResponse>(['playlist', 'info', playlistId]);
            if (trackCache && infoCache) {
                const newPages = trackCache.pages.map((page) => {
                    const findIndex = page.items.findIndex((item) => item.track.id === id);
                    if (findIndex !== -1) {
                        const newItems = [...page.items];
                        newItems.splice(findIndex, 1);
                        return {
                            ...page,
                            items: newItems,
                        };
                    }
                    return page;
                });
                const newInfo = {
                    ...infoCache,
                    tracks: { ...infoCache?.tracks, total: infoCache?.tracks.total ? infoCache?.tracks.total - 1 : 0 },
                };
                const newTracks = { ...trackCache, pages: newPages };
                queryClient.setQueryData(['playlist', playlistId], newTracks);
                queryClient.setQueryData(['playlist', 'info', playlistId], newInfo);
            }
        },
        onError: () => {
            toast('error', '해당 곡을 삭제하지 못했습니다');
        },
    });
};
export default useDeleteTrack;
