import { useQuery } from '@tanstack/react-query';
import { ArtistResponse } from '../../types/api/artist';
import { getDataWithoutAuth } from '../../services/api/client';
const useGetArtist = (artistId?: string) => {
    const { data, isLoading, isError } = useQuery<ArtistResponse>({
        queryKey: ['artist', 'info', artistId],
        queryFn: async () => {
            if (!artistId) throw new Error('아티스트 아이디가 필요합니다');
            return getDataWithoutAuth<ArtistResponse>(`/v1/artists/${artistId}`);
        },
        enabled: !!artistId,
        staleTime: Infinity,
        gcTime: Infinity,
    });
    return { data, isLoading, isError };
};
export default useGetArtist;
