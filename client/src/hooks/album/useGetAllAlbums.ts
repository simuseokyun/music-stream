import { useEffect } from 'react';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { AlbumListResponse } from '../../types/api/album';
import { getLocalStorage } from '../../utils/common/setLocalStorage';
import { getAllAlbums } from '../../api/getInfo';

const useGetAllAlbums = (artistId?: string) => {
    const token = getLocalStorage('webAccessToken');
    const { ref, inView } = useInView({ delay: 100, rootMargin: '100px' });
    const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<
        AlbumListResponse,
        Error,
        InfiniteData<AlbumListResponse>,
        any,
        number
    >({
        queryKey: ['allAlbum', artistId],
        queryFn: ({ pageParam = 0 }) => {
            return getAllAlbums(token!, artistId!, pageParam);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const nextOffset = url.searchParams.get('offset');
            return Number(nextOffset);
        },
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: Boolean(token && artistId),
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    return {
        data,
        isLoading,
        isError,
        ref,
        isFetchingNextPage,
    };
};

export default useGetAllAlbums;
