import { useEffect } from 'react';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { PlaylistTracksResponse } from '../../types/api/track';
import { getPlaylist } from '../../services/playlist/playlist';
import { useInView } from 'react-intersection-observer';
const useGetPlaylist = (playlistId?: string) => {
    const { ref, inView } = useInView({ delay: 500, rootMargin: '100px' });
    const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<
        PlaylistTracksResponse,
        Error,
        InfiniteData<PlaylistTracksResponse>,
        [string, string, string],
        number
    >({
        queryKey: ['me', 'playlist', playlistId as string],
        queryFn: ({ pageParam = 0 }) => {
            return getPlaylist({ id: playlistId!, pageParam });
        },
        enabled: !!playlistId,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const nextOffset = url.searchParams.get('offset');
            return Number(nextOffset);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 6 * 60 * 1000,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    return { data, isLoading, isError, isFetchingNextPage, ref };
};
export default useGetPlaylist;
