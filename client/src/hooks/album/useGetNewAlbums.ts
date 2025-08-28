import { useQuery } from '@tanstack/react-query';
import { NewAlbumListResponse } from '../../types/api/album';

import { getDataWithoutAuth } from '../../services/api/client';
const useGetNewAlbums = () => {
    const { data, isLoading, isError } = useQuery<NewAlbumListResponse>({
        queryKey: ['albums', 'new'],
        queryFn: () => getDataWithoutAuth<NewAlbumListResponse>(`/v1/new-albums`),
        staleTime: 6 * 60 * 1000,
        gcTime: 6 * 60 * 1000,
    });
    return { isLoading, data, isError };
};
export default useGetNewAlbums;
