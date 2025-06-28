import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { PlaylistTracksResponse } from '../../types/api/track';
import { axiosWithAuth } from '../../services/api/client';

import useThrottledToast from '../common/useTrottledToast';
const useDeleteTrack = (playlistId: string, id: string) => {
    const queryClient = useQueryClient();
    const toast = useThrottledToast();
    return useMutation({
        mutationFn: async () => {
            if (!playlistId || !id) throw new Error('로컬 파일은 삭제가 불가능합니다');
            console.log(playlistId, id);
            const response = await axiosWithAuth(`/api/me/playlist/track/delete/${playlistId}`, {
                method: 'delete',
                data: {
                    trackUri: `spotify:track:${id}`,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
        onSuccess: () => {
            toast('success', '해당 곡을 삭제하였습니다.', id);
            const data = queryClient.getQueryData<InfiniteData<PlaylistTracksResponse>>(['me', 'playlist', playlistId]);
            if (!data) return;
            const newPages = data.pages.map((page) => {
                const findIndex = page.items.findIndex((item) => item.track.id === id);
                console.log(findIndex);
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
            const newData = { ...data, pages: newPages };
            queryClient.setQueryData(['me', 'playlist', playlistId], newData);
        },
        onError: (error) => {
            toast('error', '해당 곡 삭제에 실패하였습니다.', id);
        },
    });
};
export default useDeleteTrack;
