import { useQuery } from '@tanstack/react-query';
import { NewAlbumListResponse } from '../../types/api/album';
import { getNewAlbum } from '../../services/album/album';

const useGetNewAlbums = () => {
    const { isLoading, data, isError } = useQuery<NewAlbumListResponse>({
        queryKey: ['newAlbum'],
        queryFn: getNewAlbum,
        staleTime: 6 * 60 * 1000,
        gcTime: 6 * 60 * 1000,
    });
    return { isLoading, data, isError };
};
export default useGetNewAlbums;
