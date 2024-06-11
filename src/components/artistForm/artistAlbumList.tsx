import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getLocalStorage } from '../../utils/util';
import { getArtistAlbum } from '../../api/api';
import { setMobile } from '../../state/atoms';
import { useQuery } from 'react-query';
import { IArtistAlbums } from '../../types/artistInfo';
import { AlbumItem } from './artistAlbumItem';
import { typeTransform } from '../../state/atoms';

const Container = styled.ul<{ state: string }>`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};
    @media (max-width: 768px) {
    }
`;

export const AlbumList = () => {
    const { artistId } = useParams();
    console.log(artistId);
    const navigate = useNavigate();
    const token = getLocalStorage('webAccessToken') || '';
    const isMobile = useRecoilValue(setMobile);
    const { isLoading: albumLoading, data: albumInfo } = useQuery<IArtistAlbums>(['album', artistId], async () =>
        getArtistAlbum(token, artistId!)
    );
    return (
        <Container state={isMobile.toString()}>
            {albumInfo &&
                albumInfo.items
                    .slice(0, isMobile ? 3 : 4)
                    .map((album) => (
                        <AlbumItem
                            key={album.id}
                            id={album.id}
                            name={album.name}
                            cover={album.images[0].url}
                            type={album.album_type === 'album' ? typeTransform.album : typeTransform.single}
                            year={album.release_date.slice(0, 4)}
                        />
                    ))}
        </Container>
    );
};
