import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getLocalStorage } from '../../utils/common/setLocalStorage';
import { getArtistAlbum } from '../../api/getInfo';
import { AlbumType } from '../../types/models/album';
import { AlbumListResponse } from '../../types/api/album';
import { AlbumItem } from './AlbumItem';

export const AlbumList = () => {
    const { artistId } = useParams();
    const token = getLocalStorage('webAccessToken');
    const { data: albumList } = useQuery<AlbumListResponse>({
        queryKey: ['artistAlbum', artistId],
        queryFn: async () => {
            if (token) {
                return getArtistAlbum(token, artistId!);
            }
        },
        enabled: !!artistId,
    });

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 ">
            {albumList &&
                albumList?.items
                    .slice(0, 4)
                    .map(({ id, name, images, album_type, release_date }) => (
                        <AlbumItem
                            key={id}
                            id={id}
                            name={name}
                            cover={images[0].url}
                            type={album_type === 'album' ? AlbumType.album : AlbumType.single}
                            year={release_date.slice(0, 4)}
                        />
                    ))}
        </div>
    );
};
