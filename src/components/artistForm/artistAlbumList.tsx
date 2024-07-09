import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getLocalStorage } from '../../utils/util';
import { getArtistAlbum } from '../../api/api잠시주석';
import { setMobile, typeTransform } from '../../state/atoms';
import { IArtistAlbums } from '../../types/artistInfo';
import { AlbumItem } from './artistAlbumItem';

const Container = styled.ul<{ state: string }>`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};
    @media (max-width: 768px) {
    }
`;

export const AlbumList = () => {
    const { artistId } = useParams();
    const token = getLocalStorage('webAccessToken') || '';
    const isMobile = useRecoilValue(setMobile);
    const {
        isLoading,
        data: albumInfo,
        isError,
    } = useQuery<IArtistAlbums>(
        'artistAlbum',
        async () => {
            if (artistId) {
                const artistAlbumData = await getArtistAlbum(token, artistId);
                return artistAlbumData;
            } else {
                return Promise.resolve(null);
            }
        },
        {
            enabled: !!artistId,
        }
    );

    return (
        <Container state={isMobile.toString()}>
            {albumInfo &&
                albumInfo.items
                    .slice(0, isMobile ? 3 : 4)
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
        </Container>
    );
};
