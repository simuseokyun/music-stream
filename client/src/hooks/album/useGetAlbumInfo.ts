import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDataWithoutAuth } from '../../services/api/client';
import { AlbumInfoResponse } from '../../types/api/album';
import useAlbumStore from '../../store/album';
const useGetAlbumInfo = () => {
    const { albumId } = useParams();
    const { data, isLoading, isError, error } = useQuery<AlbumInfoResponse>({
        queryKey: ['album', 'info', albumId],
        queryFn: () => {
            if (!albumId) throw new Error('앨범 아이디가 필요합니다');
            return getDataWithoutAuth(`/v1/albums/${albumId}`);
        },
        enabled: !!albumId,
        staleTime: Infinity,
        gcTime: Infinity,
    });
    console.log(data);
    const setAlbumInfo = useAlbumStore((state) => state.setAlbumInfo);

    useEffect(() => {
        if (!data) {
            setAlbumInfo({
                id: '',
                name: '알 수 없는 앨범',
                artistId: '',
                artistName: '알 수 없는 아티스트',
                image: '/assets/playlist.svg',
                type: '알 수 없음',
                trackLength: 0,
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
            artistId: artists.id,
            artistName: artists.name,
            image: images.url,
            type,
            trackLength: track_length,
        });
    }, [data]);
    return { data, isLoading, isError, error };
};
export default useGetAlbumInfo;
