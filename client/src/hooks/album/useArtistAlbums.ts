import { getLocalStorage } from '../../utils/common/setLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { AlbumListResponse } from '../../types/api/album';
import { getArtistAlbum } from '../../services/album/album';

const useGetArtistAlbums = (artistId?: string) => {
    const { data, isLoading, isError } = useQuery<AlbumListResponse>({
        queryKey: ['artistAlbum', artistId],
        queryFn: async () => {
            if (!artistId) Promise.reject('아티스트 아이디 필요');

            return getArtistAlbum(artistId!);
        },
        enabled: !!artistId,
    });
    return { data, isLoading, isError };
};
export default useGetArtistAlbums;
