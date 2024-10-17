import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getNewAlbum } from '../../api/api';
import { NewAlbumItem } from './newAlbumItem';
import { typeTransform } from '../../state/atoms';
import { getLocalStorage, usePagenation } from '../../utils/util';
import { INewAlbums } from '../../types/newAlbums';
import { NextBtn, PrevBtn, Message, LoadingWrap, Loading } from '../../styles/common.style';
import { NewAlbumFirst } from './newAlbumFirst';

const Container = styled.div`
    width: 100%;
`;
const PagenationWrap = styled.div`
    padding: 0 5px;
    margin: 30px 0 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
        margin: 20px 0 5px 0;
    }
    @media (max-width: 425px) {
    }
`;

const NewAlbumList = styled.ul<{ $state: string }>`
    display: grid;
    grid-template-columns: ${({ $state }) => `repeat(${$state === 'true' ? 3 : 4}, 1fr)`};
`;
const BtnWrap = styled.div`
    text-align: right;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 425px) {
        font-size: 16px;
    }
`;

export const NewAlbum = () => {
    const { index, isMobile, onNextBtn, onPrevBtn } = usePagenation();
    const offset = isMobile ? 3 : 4;
    const token = getLocalStorage('webAccessToken');
    const {
        isLoading: newAlbumLoading,
        data: newAlbumData,
        isError,
    } = useQuery<INewAlbums>('newAlbum', async () => {
        if (token) {
            const newAlbumData = await getNewAlbum(token);
            return newAlbumData;
        } else {
            Promise.resolve(null);
        }
    });
    if (newAlbumLoading) {
        return (
            <LoadingWrap>
                <Loading src="/images/loading.png" alt="로딩중" />
            </LoadingWrap>
        );
    }
    if (isError) {
        return <Message>네트워크 오류</Message>;
    }
    if (newAlbumData) {
        const albumItem = newAlbumData?.albums?.items[0];
        const artist = albumItem?.artists[0];
        const cover = albumItem?.images[0]?.url;
        const albumType = albumItem?.album_type === 'single' ? typeTransform.single : typeTransform.album;
        return (
            <Container>
                <NewAlbumFirst
                    id={albumItem?.id}
                    artistId={artist?.id}
                    cover={cover}
                    type={albumType}
                    name={albumItem?.name}
                    artist={artist?.name}
                />
                <PagenationWrap>
                    <Title>최신 음악</Title>
                    <BtnWrap>
                        <PrevBtn src="/images/leftArrow.png" alt="Prev" onClick={onPrevBtn}></PrevBtn>
                        <NextBtn src="/images/rightArrow.png" alt="Next" onClick={onNextBtn}></NextBtn>
                    </BtnWrap>
                </PagenationWrap>
                <NewAlbumList $state={isMobile.toString()}>
                    {newAlbumData?.albums?.items
                        .slice(1)
                        .slice(offset * index, offset * (index + 1))
                        .map(({ id, name, artists, images }) => (
                            <NewAlbumItem
                                key={id}
                                id={id}
                                name={name}
                                artist={artists[0].name}
                                cover={images[0].url}
                            ></NewAlbumItem>
                        ))}
                </NewAlbumList>
            </Container>
        );
    }
    return null;
};
