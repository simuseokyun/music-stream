import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getDataWithoutAuth } from '../../services/api/client';
import { AlbumListResponse } from '../../types/api/album';

const useGetAllAlbums = () => {
    const { artistId } = useParams();
    const { ref, inView } = useInView({ delay: 100, rootMargin: '100px' });
    const { data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<
        AlbumListResponse,
        Error,
        InfiniteData<AlbumListResponse>,
        any,
        number
    >({
        queryKey: ['artist', 'albums', 'all', artistId],
        queryFn: ({ pageParam = 0 }) => {
            if (!artistId) throw new Error('아티스트 아이디가 필요합니다');
            return getDataWithoutAuth<AlbumListResponse>(
                `/v1/artists/${artistId}/albums?include_groups=album,single&offset=${pageParam}`
            );
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
        error,
        ref,
        isFetchingNextPage,
    };
};

export default useGetAllAlbums;
