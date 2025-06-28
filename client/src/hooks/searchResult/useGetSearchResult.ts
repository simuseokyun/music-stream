import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { SearchResultsResponse } from '../../types/api/searchResult';
import { useSearchParams } from 'react-router-dom';
import getSearchTracks from '../../services/track/track';
const useGetSearchResult = () => {
    const [searchParams] = useSearchParams();
    const title = searchParams.get('q');
    const { ref, inView } = useInView({ delay: 100, rootMargin: '100px' });
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
        SearchResultsResponse,
        Error,
        InfiniteData<SearchResultsResponse>,
        string[],
        number
    >({
        queryKey: ['searchResult', title!],
        queryFn: ({ pageParam = 0 }) => getSearchTracks(title!, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.tracks.next) return undefined;
            const url = new URL(lastPage.tracks.next);
            const nextOffset = url.searchParams.get('offset');
            return Number(nextOffset);
        },
        enabled: !!title,
        staleTime: Infinity,
        gcTime: Infinity,
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
export default useGetSearchResult;
