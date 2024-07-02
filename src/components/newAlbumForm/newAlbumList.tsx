import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getNewAlbum } from '../../api/api';
import { NewAlbumItem } from './newAlbumItem';
import { typeTransform } from '../../state/atoms';
import { getLocalStorage, usePagenation } from '../../utils/util';
import { INewAlbums } from '../../types/newAlbums';
import { NextBtn, PrevBtn, Message } from '../../styles/common.style';
import { NewAlbumFirst } from './newAlbumFirst';

const Container = styled.div`
    width: 100%;
`;

const Row = styled.div`
    position: relative;
    width: 100%;
`;
const NewAlbumList = styled.ul<{ state: string }>`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};

    width: 100%;
`;
const BtnWrap = styled.div`
    text-align: right;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 20px;
    }
    @media (max-width: 425px) {
        font-size: 16px;
    }
`;
const TopWrap = styled.div`
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

export const NewAlbum = () => {
    const { index, isMobile, onNextBtn, onPrevBtn } = usePagenation();
    const offset = isMobile ? 3 : 4;
    const token = getLocalStorage('webAccessToken');
    const {
        isLoading: newAlbumLoading,
        data: newAlbumData,
        isError,
    } = useQuery<INewAlbums>(
        'newAlbum',
        async () => {
            if (token) {
                const newAlbumData = await getNewAlbum(token);
                return newAlbumData;
            } else {
                Promise.resolve(null);
            }
        },
        {
            enabled: !!token,
        }
    );
    if (newAlbumLoading) {
        return <Message>로딩 중</Message>;
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    return (
        <>
            {newAlbumData && (
                <Container>
                    <NewAlbumFirst
                        cover={newAlbumData?.albums?.items[0].images[0].url}
                        type={
                            newAlbumData?.albums?.items[0].album_type === 'single'
                                ? typeTransform.single
                                : typeTransform.album
                        }
                        name={newAlbumData?.albums?.items[0].name}
                        artist={newAlbumData?.albums?.items[0].artists[0].name}
                    />
                    <TopWrap>
                        <Title>최신 음악</Title>
                        <BtnWrap>
                            <PrevBtn src="/images/leftArrow.png" onClick={onPrevBtn}></PrevBtn>
                            <NextBtn src="/images/rightArrow.png" onClick={onNextBtn}></NextBtn>
                        </BtnWrap>
                    </TopWrap>
                    <Row>
                        <NewAlbumList state={isMobile.toString()}>
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
                    </Row>
                </Container>
            )}
        </>
    );
};
