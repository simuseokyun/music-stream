import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { getPlaylist } from '../../services/playlist/playlist';

import { PlaylistTracksResponse } from '../../types/api/track';

const useGetPlaylist = (playlistId?: string) => {
    const { ref, inView } = useInView({ delay: 500, rootMargin: '100px' });
    const { data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<
        PlaylistTracksResponse,
        Error,
        InfiniteData<PlaylistTracksResponse>,
        [string, string],
        number
    >({
        queryKey: ['playlist', playlistId as string],
        queryFn: ({ pageParam = 0 }) => {
            if (!playlistId) throw new Error('목록을 불러 올 수 없습니다');
            return getPlaylist({ id: playlistId, pageParam });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const nextOffset = url.searchParams.get('offset');
            return Number(nextOffset);
        },
        enabled: !!playlistId,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    return { data, isLoading, isError, error, isFetchingNextPage, ref };
};
export default useGetPlaylist;
