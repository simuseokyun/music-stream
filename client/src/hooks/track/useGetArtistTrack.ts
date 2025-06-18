import { useQuery } from '@tanstack/react-query';
import { ArtistFiveTracksResponse } from '../../types/api/track';
import { getLocalStorage } from '../../utils/common/setLocalStorage';
import { getArtistTopTrack } from '../../api/getInfo';
const useGetArtistTrack = (artistId?: string) => {
    const token = getLocalStorage('webAccessToken');
    const { data, isError } = useQuery<ArtistFiveTracksResponse>({
        queryKey: ['ArtistPopularTracks', artistId],
        queryFn: () => {
            return getArtistTopTrack(token!, artistId!);
        },
        enabled: Boolean(token && artistId),
    });
    return { data, isError };
};
export default useGetArtistTrack;
