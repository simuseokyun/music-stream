import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllAlbums } from '../../api/getAllAlbums';
import { useRecoilValue } from 'recoil';
import { setMobile, typeTransform } from '../../store/atoms';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { AlbumItem } from '../../components/allAlbum/AllAlbum';
import { Message, LoadingWrap, Loading } from '../../styles/common.style';

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

export const AllAlbum = () => {
    const token = getLocalStorage('webAccessToken');
    const isMobile = useRecoilValue(setMobile);
    const { artistId } = useParams();
    const {
        isLoading,
        data: albumData,
        isError,
    } = useQuery({ queryKey: ['getAllAlbums', artistId], queryFn: () => getAllAlbums(token!, artistId!) });
    if (isLoading) {
        return (
            <LoadingWrap>
                <Loading src="/assets/loading.png" />
            </LoadingWrap>
        );
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    if (!albumData) {
        return <Message>앨범 데이터가 없습니다.</Message>;
    }
    console.log(albumData);
    const { artists } = albumData[0];
    return (
        <Container>
            <Title>{artists[0].name || ''} 의 모든앨범</Title>
            <AlbumList $state={isMobile.toString()}>
                {albumData.map(({ id, name, images, release_date, album_type }) => (
                    <AlbumItem
                        key={id}
                        id={id}
                        release={release_date.slice(0, 4)}
                        type={album_type === 'album' ? typeTransform.album : typeTransform.single}
                        cover={images[0].url}
                        name={name}
                    />
                ))}
            </AlbumList>
        </Container>
    );
};
