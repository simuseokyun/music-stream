import { useQuery } from '@tanstack/react-query';
import { AlbumListResponse } from '../../types/api/album';
import { getDataWithoutAuth } from '../../services/api/client';

const useGetArtistAlbums = (artistId?: string) => {
    const { data, isLoading, isError } = useQuery<AlbumListResponse>({
        queryKey: ['artist', 'albums', artistId],
        queryFn: async () => {
            if (!artistId) throw new Error('아티스트 아이디가 필요합니다');
            return getDataWithoutAuth<AlbumListResponse>(artistId);
        },
        enabled: !!artistId,
        staleTime: Infinity,
        gcTime: Infinity,
    });
    return { data, isLoading, isError };
};
export default useGetArtistAlbums;
