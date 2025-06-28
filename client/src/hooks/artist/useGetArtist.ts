import { useQuery } from '@tanstack/react-query';
import { ArtistResponse } from '../../types/api/artist';
import { getArtist } from '../../services/artist/artist';
import { getLocalStorage } from '../../utils/common/setLocalStorage';
const useGetArtist = (artistId?: string) => {
    const { isLoading, data, isError } = useQuery<ArtistResponse>({
        queryKey: ['artistCover', artistId],
        queryFn: async () => {
            return getArtist(artistId!);
        },
        enabled: !!artistId,
    });
    return { data, isLoading, isError };
};
export default useGetArtist;
