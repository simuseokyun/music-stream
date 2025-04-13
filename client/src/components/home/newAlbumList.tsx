import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getNewAlbum } from '../../api/getInfo';
import { NewAlbumItem } from './newAlbumItem';

import { getLocalStorage } from '../../utils/getLocalStorage';
import { INewAlbums } from '../../types/newAlbums';
import { NextBtn, PrevBtn, Message, LoadingWrap, Loading } from '../../styles/common.style';
import { usePagenation } from '../../hooks/usePagenation';

const Container = styled.div`
    width: 100%;
`;
const PagenationWrap = styled.div`
    margin-bottom: 10px;
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
    font-size: 20px;
    font-weight: 700;
    /* @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 425px) {
        font-size: 16px;
    } */
`;

export const NewAlbum = () => {
    const { index, isMobile, onNextBtn, onPrevBtn } = usePagenation();
    const offset = 8;
    const token = getLocalStorage('webAccessToken');
    const {
        isLoading,
        data: albumData,
        isError,
    } = useQuery<INewAlbums>({ queryKey: ['getNewAlbum'], queryFn: () => getNewAlbum(token!) });
    // const { data: albumData } = useQuery<INewAlbums>({
    //     queryKey: ['getNewAlbum'],
    if (isLoading) {
        return (
            <LoadingWrap>
                <Loading src="/assets/loading.png" alt="로딩중" />
            </LoadingWrap>
        );
    }
    if (isError) {
        return <Message>네트워크 오류</Message>;
    }
    if (!albumData) {
        return <Message>리스트가 없습니다</Message>;
    }

    const {
        albums: { items },
    } = albumData;
    return (
        <Container>
            <PagenationWrap>
                <>
                    <Title>최신 음악</Title>
                    <Title>인기 플레이리스트</Title>
                </>
                <BtnWrap>
                    <PrevBtn src="/assets/leftArrow.png" alt="Prev" onClick={onPrevBtn}></PrevBtn>
                    <NextBtn src="/assets/rightArrow.png" alt="Next" onClick={onNextBtn}></NextBtn>
                </BtnWrap>
            </PagenationWrap>
            <NewAlbumList $state={isMobile.toString()}>
                {items.slice(offset * index, offset * (index + 1)).map(({ id, name, artists, images }) => (
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
};
