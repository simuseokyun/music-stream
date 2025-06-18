import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPlaylists } from '../../services/playlist/playlist';
import { PlaylistListResponse } from '../../types/api/playlist';
import { InfiniteData } from '@tanstack/react-query';

export const useGetPlaylists = () => {
    const { ref, inView } = useInView({ delay: 100, rootMargin: '100px' });
    const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
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
        staleTime: 5000,
    });
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return { ref, data, isLoading, isError, isFetchingNextPage };
};
