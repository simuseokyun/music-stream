import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { getArtistAlbum } from '../../api/getInfo';
import { setMobile, typeTransform } from '../../store/atoms';
import { IArtistAlbums } from '../../types/artistInfo';
import { AlbumItem } from './ArtistAlbumItem';

const Container = styled.ul<{ $state: string }>`
    display: grid;
    grid-template-columns: ${({ $state }) => `repeat(${$state === 'true' ? 3 : 4}, 1fr)`};
    @media (max-width: 768px) {
    }
`;

export const AlbumList = () => {
    const { artistId } = useParams();
    const token = getLocalStorage('webAccessToken') || '';

    const { data: albumInfo } = useQuery<IArtistAlbums>({
        queryKey: ['getArtistAlbum', artistId],
        queryFn: () => {
            return getArtistAlbum(token, artistId!);
        },
        enabled: !!artistId,
    });

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 ">
            {albumInfo &&
                albumInfo.items
                    .slice(0, 4)
                    .map(({ id, name, images, album_type, release_date }) => (
                        <AlbumItem
                            key={id}
                            id={id}
                            name={name}
                            cover={images[0].url}
                            type={album_type === 'album' ? typeTransform.album : typeTransform.single}
                            year={release_date.slice(0, 4)}
                        />
                    ))}
        </div>
    );
};
