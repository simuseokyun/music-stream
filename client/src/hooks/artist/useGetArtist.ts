import { useQuery } from '@tanstack/react-query';
import { ArtistResponse } from '../../types/api/artist';
import { getArtist } from '../../api/getInfo';
import { getLocalStorage } from '../../utils/common/setLocalStorage';
const useGetArtist = (artistId?: string) => {
    const token = getLocalStorage('webAccessToken');
    const { isLoading, data, isError } = useQuery<ArtistResponse>({
        queryKey: ['artistCover', artistId],
        queryFn: async () => {
            return getArtist(token!, artistId!);
        },
        enabled: Boolean(token && artistId),
    });
    return { data, isLoading, isError };
};
export default useGetArtist;
