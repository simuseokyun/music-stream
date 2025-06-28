import { useMutation } from '@tanstack/react-query';
import { axiosWithAuth } from '../../services/api/client';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { PlaylistTracksResponse } from '../../types/api/track';
import { useCategoryStore } from '../../store/common';

import useThrottledToast from '../common/useTrottledToast';
const useAddTrack = (onClose: () => void) => {
    const queryClient = useQueryClient();
    const toast = useThrottledToast();
    const { trackId, artistId, artistName, trackImage, trackTitle, setTrack } = useCategoryStore();
    return useMutation({
        mutationFn: async (playlistId: string) => {
            const data = await axiosWithAuth(`/api/me/playlist/track/add/${playlistId}`, {
                method: 'post',
                data: {
                    trackUri: `spotify:track:${trackId}`,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return { playlistId, data };
        },
        onSuccess(data) {
            toast('success', `해당 곡을 추가하였습니다`, trackId);
            const queryData = queryClient.getQueryData<InfiniteData<PlaylistTracksResponse>>([
                'me',
                'playlist',
                data.playlistId,
            ]);
            if (!queryData) {
                setTrack({ trackId: '', trackTitle: '', artistId: '', artistName: '', trackImage: '' });
                return;
            }
            const lastPage = queryData.pages.at(-1);
            if (!lastPage) return;
            const updatedLastPage = {
                ...lastPage,
                items: [
                    ...lastPage.items,
                    {
                        track: {
                            id: trackId,
                            name: trackTitle,
                            album: { images: [{ url: trackImage }], artists: [{ id: artistId, name: artistName }] },
                        },
                    },
                ],
            };
            const newData = {
                ...queryData,
                pages: [
                    ...queryData.pages.slice(0, -1), // 마지막 이전까지 유지
                    updatedLastPage, // 마지막 페이지만 업데이트
                ],
            };
            queryClient.setQueryData(['me', 'playlist', data.playlistId], newData);

            setTrack({ trackId: '', trackTitle: '', artistId: '', artistName: '', trackImage: '' });
        },
        onError(error) {
            toast('error', `해당 곡 추가에 실패했습니다`, trackId);
        },
        onSettled() {
            onClose();
        },
    });
};
export default useAddTrack;
