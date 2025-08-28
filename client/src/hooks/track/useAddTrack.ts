import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { addTrack } from '../../services/track/track';
import { PlaylistTracksResponse } from '../../types/api/track';
import { Playlist as PlaylistInfoResponse } from '../../types/models/playlist';
import { useCategoryStore } from '../../store/common';
import useThrottledToast from '../common/useTrottledToast';
const useAddTrack = (onClose: () => void) => {
    const queryClient = useQueryClient();
    const toast = useThrottledToast();
    const { trackId, artistId, artistName, trackImage, trackTitle, setTrack } = useCategoryStore();
    return useMutation({
        mutationFn: async (playlistId: string) => {
            if (!playlistId || !trackId) throw new Error('해당 곡을 삭제하지 못했습니다');
            const data = await addTrack(playlistId, trackId);
            return { playlistId, data };
        },
        onSuccess(data) {
            toast('success', `해당 곡을 추가하였습니다`);
            const trackCache = queryClient.getQueryData<InfiniteData<PlaylistTracksResponse>>([
                'playlist',
                data.playlistId,
            ]);
            const infoCache = queryClient.getQueryData<PlaylistInfoResponse>(['playlist', 'info', data.playlistId]);
            if (trackCache && infoCache) {
                const lastPage = trackCache.pages.at(-1);
                if (lastPage) {
                    const updatedLastPage = {
                        ...lastPage,
                        items: [
                            ...lastPage.items,
                            {
                                track: {
                                    id: trackId,
                                    name: trackTitle,
                                    album: {
                                        images: [{ url: trackImage }],
                                        artists: [{ id: artistId, name: artistName }],
                                    },
                                },
                            },
                        ],
                    };
                    const newInfo = {
                        ...infoCache,
                        tracks: { ...infoCache.tracks, total: infoCache.tracks.total ? infoCache.tracks.total + 1 : 0 },
                    };
                    const newTracks = {
                        ...trackCache,
                        pages: [...trackCache.pages.slice(0, -1), updatedLastPage],
                    };
                    queryClient.setQueryData(['playlist', 'info', data.playlistId], newInfo);
                    queryClient.setQueryData(['playlist', data.playlistId], newTracks);
                }
            }
            setTrack({ trackId: '', trackTitle: '', artistId: '', artistName: '', trackImage: '' });
        },
        onError() {
            toast('error', `해당 곡 추가에 실패했습니다`);
        },
        onSettled() {
            onClose();
        },
    });
};
export default useAddTrack;
