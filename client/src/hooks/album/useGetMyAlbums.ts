import { useEffect } from 'react';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getFollowingAlbums } from '../../services/album/album';
import { MyAlbumListResponse } from '../../types/api/album';
const useGetMyAlbums = () => {
    const { ref, inView } = useInView({ delay: 100, rootMargin: '100px' });
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
        MyAlbumListResponse,
        Error,
        InfiniteData<MyAlbumListResponse>,
        [string, string],
        number
    >({
        queryKey: ['albums', 'following'],
        queryFn: getFollowingAlbums,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const nextOffset = url.searchParams.get('offset');
            return Number(nextOffset);
        },
        staleTime: 6 * 60 * 1000,
        gcTime: 6 * 60 * 1000,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    return {
        data,
        isLoading,
        error,
        isError,
        ref,
        isFetchingNextPage,
    };
};
export default useGetMyAlbums;
