import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllAlbums } from '../api/api';
import { useRecoilValue } from 'recoil';
import { setMobile, typeTransform } from '../state/atoms';
import { getLocalStorage } from '../utils/util';
import { AllAlbumItem } from '../components/allAlbumForm/allAlbumItem';
import { Message } from '../styles/common.style';

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background: #131212;
    border-radius: 8px;
    margin-bottom: 140px;
    @media (max-width: 768px) {
        padding: 10px;
        background: black;
    }
`;
const Title = styled.h1`
    font-size: 20px;
    margin-bottom: 10px;
`;
const AlbumList = styled.ul<{ state: string }>`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};
`;

export const AllAlbumPage = () => {
    const token = getLocalStorage('webAccessToken') || '';
    const isMobile = useRecoilValue(setMobile);
    const { artistId } = useParams();
    const { isLoading, data: allAlbumList } = useQuery('albumList', async () => {
        const response = await getAllAlbums(token, artistId!);
        return response;
    });
    if (isLoading) {
        return <Message>로딩 중</Message>;
    }
    return (
        <Container>
            <Title>모든 앨범</Title>
            <AlbumList state={isMobile.toString()}>
                {allAlbumList &&
                    allAlbumList.map((album) => (
                        <AllAlbumItem
                            key={album.id}
                            id={album.id}
                            release={album.release_date.slice(0, 4)}
                            type={album.album_type === 'album' ? typeTransform.album : typeTransform.single}
                            cover={album.images[0].url}
                            name={album.name}
                        />
                    ))}
            </AlbumList>
        </Container>
    );
};
