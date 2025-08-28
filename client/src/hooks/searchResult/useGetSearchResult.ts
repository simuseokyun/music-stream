import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { getDataWithoutAuth } from '../../services/api/client';
import { SearchResultsResponse } from '../../types/api/searchResult';
const useGetSearchResult = () => {
    const [searchParams] = useSearchParams();
    const title = searchParams.get('q');
    const { ref, inView } = useInView({ delay: 100, rootMargin: '100px' });
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
        SearchResultsResponse,
        Error,
        InfiniteData<SearchResultsResponse>,
        [string, string],
        number
    >({
        queryKey: ['searchResult', title || ''],
        queryFn: ({ pageParam = 0 }) => {
            if (!title) throw new Error('검색어가 필요합나다');
            return getDataWithoutAuth<SearchResultsResponse>(
                `/v1/search?q=${encodeURIComponent(title)}&type=track,artist&offset=${pageParam}`
            );
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.tracks.next) return undefined;
            const url = new URL(lastPage.tracks.next);
            const nextOffset = url.searchParams.get('offset');
            return Number(nextOffset);
        },
        enabled: !!title,
        staleTime: 60 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
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
export default useGetSearchResult;
