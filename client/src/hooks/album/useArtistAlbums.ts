import { getLocalStorage } from '../../utils/common/setLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { AlbumListResponse } from '../../types/api/album';
import { getArtistAlbum } from '../../api/getInfo';

const useGetArtistAlbums = (artistId?: string) => {
    const token = getLocalStorage('webAccessToken');
    const { data } = useQuery<AlbumListResponse>({
        queryKey: ['artistAlbum', artistId],
        queryFn: async () => {
            return getArtistAlbum(token!, artistId!);
        },
        enabled: Boolean(token && artistId),
    });
    return { data };
};
export default useGetArtistAlbums;
