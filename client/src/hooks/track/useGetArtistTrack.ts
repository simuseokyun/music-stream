import { useQuery } from '@tanstack/react-query';
import { ArtistFiveTracksResponse } from '../../types/api/track';

import { getArtistTopTrack } from '../../services/artist/artist';
const useGetArtistTrack = (artistId?: string) => {
    const { data, isLoading, isError } = useQuery<ArtistFiveTracksResponse>({
        queryKey: ['ArtistPopularTracks', artistId],
        queryFn: () => {
            return getArtistTopTrack(artistId!);
        },
        enabled: !!artistId,
    });
    return { data, isLoading, isError };
};
export default useGetArtistTrack;
