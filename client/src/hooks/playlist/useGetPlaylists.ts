import { useEffect } from 'react';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getPlaylists } from '../../services/playlist/playlist';
import { PlaylistListResponse } from '../../types/api/playlist';

export const useGetPlaylists = () => {
    const { ref, inView } = useInView({ delay: 100, rootMargin: '100px' });
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
        PlaylistListResponse,
        Error,
        InfiniteData<PlaylistListResponse>,
        [string],
        number
    >({
        queryKey: ['playlists'],
        queryFn: getPlaylists,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const nextOffset = url.searchParams.get('offset');
            return Number(nextOffset);
        },
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
