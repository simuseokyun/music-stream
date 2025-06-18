import { getLocalStorage } from '../../utils/common/setLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { AlbumDataResponse } from '../../types/api/album';
import { useEffect } from 'react';
import { getAlbum } from '../../api/getInfo';
import useAlbumStore from '../../store/album';
const useGetAlbumInfo = (albumId?: string) => {
    const token = getLocalStorage('webAccessToken');
    const setAlbumInfo = useAlbumStore((state) => state.setAlbumInfo);
    const { isLoading, data, isError } = useQuery<AlbumDataResponse>({
        queryKey: ['albumInfo', albumId],
        queryFn: async () => getAlbum(token!, albumId!),
        enabled: Boolean(token && albumId),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    useEffect(() => {
        if (!data) {
            setAlbumInfo({
                id: '',
                name: '알 수 없는 앨범',
                artist_id: '',
                artist_name: '알 수 없는 아티스트',
                image: '/assets/playlist.svg',
                type: '알 수 없음',
                track_length: 0,
            });
            return;
        }
        const {
            id,
            name,
            images: [images],
            artists: [artists],
            album_type: type,
            total_tracks: track_length,
        } = data;
        setAlbumInfo({
            id,
            name,
            artist_id: artists.id,
            artist_name: artists.name,
            image: images.url,
            type,
            track_length,
        });
    }, [data]);
    return { data, isLoading, isError };
};
export default useGetAlbumInfo;
