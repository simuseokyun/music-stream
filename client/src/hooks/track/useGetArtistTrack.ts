import { useQuery } from '@tanstack/react-query';
import { FiveTracksResponse } from '../../types/api/track';
import { getDataWithoutAuth } from '../../services/api/client';

const useGetArtistTrack = (artistId?: string) => {
    const { data, isLoading, isError } = useQuery<FiveTracksResponse>({
        queryKey: ['artist', 'tracks', artistId],
        queryFn: () => {
            if (!artistId) throw new Error('아티스트 정보를 불러올 수 없습니다');
            return getDataWithoutAuth<FiveTracksResponse>(`/v1/artists/${artistId}/top-tracks`);
        },
        enabled: !!artistId,
        staleTime: Infinity,
        gcTime: Infinity,
    });
    return { data, isLoading, isError };
};
export default useGetArtistTrack;
