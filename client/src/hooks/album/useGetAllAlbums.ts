import { useEffect } from 'react';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { AlbumListResponse } from '../../types/api/album';
import { getAllAlbum } from '../../services/album/album';
import { useParams } from 'react-router-dom';

const useGetAllAlbums = () => {
    const { artistId } = useParams();
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
            if (!artistId) Promise.reject('');

            return getAllAlbum(artistId!, pageParam);
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
        enabled: !!artistId,
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
