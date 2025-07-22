import { useQuery } from '@tanstack/react-query';
import { getArtistAlbums } from '../../services/album/album';
import { AlbumListResponse } from '../../types/api/album';

const useGetArtistAlbums = (artistId?: string) => {
    const { data, isLoading, isError } = useQuery<AlbumListResponse>({
        queryKey: ['album', 'artist', artistId],
        queryFn: async () => {
            if (!artistId) throw new Error('아티스트 아이디가 필요합니다');
            return getArtistAlbums(artistId);
        },
        enabled: !!artistId,
        staleTime: Infinity,
        gcTime: Infinity,
    });
    return { data, isLoading, isError };
};
export default useGetArtistAlbums;
