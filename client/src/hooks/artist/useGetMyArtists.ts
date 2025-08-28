import { useQuery } from '@tanstack/react-query';
import { getFollowingArtists } from '../../services/artist/artist';
import { MyArtistResponse } from '../../types/api/artist';
const useGetMyArtists = () => {
    const { data, isLoading, isError, error } = useQuery<MyArtistResponse>({
        queryKey: ['artists', 'following'],
        queryFn: getFollowingArtists,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
    return {
        data,
        isLoading,
        error,
        isError,
    };
};
export default useGetMyArtists;
