import { useSearchParams } from 'react-router-dom';
import TracksResult from '../../components/searchResult/SearchTracks';
import ArtistResult from '../../components/searchResult/SearchArtist';

import useGetSearchResult from '../../hooks/searchResult/useGetSearchResult';
export default function SearchResult() {
    const [searchParams] = useSearchParams();
    const title = searchParams.get('q');
    const { data, isLoading, isError } = useGetSearchResult();
    const artist = data?.pages[0]?.artists.items?.[0];

    return (
        <div className="flex-1 rounded-md">
            <h1 className="text-2xl font-bold mb-[10px]">
                {title ? `"${title}"에 대한 검색결과` : '검색 결과가 없습니다'}
            </h1>
            <ArtistResult artist={artist} isLoading={isLoading} isError={isError} />
            <TracksResult />
        </div>
    );
}
