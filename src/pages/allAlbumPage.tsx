import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllAlbums } from '../api/api';
import { useRecoilValue } from 'recoil';
import { setMobile, typeTransform } from '../state/atoms';
import { getLocalStorage } from '../utils/util';
import { AllAlbumItem } from '../components/allAlbumForm/allAlbumItem';
import { Message, LoadingWrap, Loading } from '../styles/common.style';

const Container = styled.div`
    width: 100%;
    padding: 20px 20px 100px;
    background: #131212;
    @media (max-width: 768px) {
        margin-top: 60px;
        padding-bottom: 120px;
        background: black;
    }
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
`;
const AlbumList = styled.ul<{ $state: string }>`
    width: 100%;
    display: grid;
    gap: 20px 5px;
    grid-template-columns: ${({ $state }) => `repeat(${$state === 'true' ? 3 : 4}, 1fr)`};
`;

interface I {
    artist: { name: string }[];
}

export const AllAlbumPage = () => {
    const token = getLocalStorage('webAccessToken');
    const isMobile = useRecoilValue(setMobile);
    const { artistId } = useParams();
    const {
        isLoading,
        data: allAlbumList,
        isError,
    } = useQuery(['allAlbum', artistId], async () => {
        if (token && artistId) {
            const allAlbumData = await getAllAlbums(token, artistId);
            return allAlbumData;
        } else {
            return Promise.resolve(null);
        }
    });
    if (isLoading) {
        return (
            <LoadingWrap>
                <Loading src="/images/loading.png" />
            </LoadingWrap>
        );
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    return (
        <Container>
            <Title>{allAlbumList?.[0]?.artists[0].name || ''} 의 모든앨범</Title>
            <AlbumList $state={isMobile.toString()}>
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
