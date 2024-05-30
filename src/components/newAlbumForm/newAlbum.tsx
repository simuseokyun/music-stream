import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getFeaturePlaylist, getNewAlbum } from '../../api';
import { NewAlbumList } from './newAlbumList';
import { setMobile, typeTransform } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { getTokenLocalStorage } from '../../util';

interface INewAlbum {
    albums: IAlbums;
}
interface IAlbums {
    items: IItems[];
    href: string;
}
interface IItems {
    album_type: string;
    artists: { name: string; id: string }[];
    id: string;
    images: { url: string; height: number; width: number }[];
    name: string;
}
const Container = styled.div`
    width: 100%;
`;

const FirstAlbumWrap = styled.div`
    display: flex;
`;

const FirstAlbumImg = styled.img`
    width: 30%;
    border-radius: 8px;
    @media (max-width: 768px) {
    }
`;
const FirstAlbumInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: end;
    @media (max-width: 425px) {
        margin-left: 10px;
    }
`;
const FirstAlbumType = styled.p`
    font-size: 20px;
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;
const FirstAlbumTitle = styled.h1`
    font-weight: 700;
    font-size: 38px;
    margin: 10px 0;
    @media (max-width: 768px) {
        font-size: 24px;
        margin: 5px 0;
    }
    @media (max-width: 425px) {
        font-size: 14px;
    }
`;
const FirstAlbumArtist = styled.span`
    font-size: 20px;
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;

const Row = styled.div`
    position: relative;
    width: 100%;
`;
const NewAlbumWrap = styled.ul<{ state: string }>`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};
    /* gap: 5px; */
    width: 100%;
`;
const BtnWrap = styled.div`
    text-align: right;
`;
const PrevBtn = styled.img`
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.4);
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 24px;
    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;
const NextBtn = styled(PrevBtn)`
    margin-left: 10px;
`;
const SectionTitle = styled.h1`
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
    const isMobile = useRecoilValue(setMobile);
    const offset = isMobile ? 3 : 4;
    const [index, setIndex] = useState(0);
    const onNextBtn = () => {
        if (isMobile) {
            setIndex((prev) => (prev === 6 ? 0 : prev + 1));
        } else {
            setIndex((prev) => (prev === 4 ? 0 : prev + 1));
        }
    };
    const onPrevBtn = () => {
        if (isMobile) {
            setIndex((prev) => (prev === 0 ? 6 : prev - 1));
        } else {
            setIndex((prev) => (prev === 0 ? 4 : prev - 1));
        }
    };
    const token = getTokenLocalStorage('webAccessToken');
    const {
        isLoading: newAlbumLoading,
        data: newAlbumData,
        isError,
    } = useQuery<INewAlbum>(
        'newAlbum',
        async () => {
            if (token) {
                return getNewAlbum(token);
            }
        },
        {
            enabled: !!token,
            onError: (error) => {
                console.error('API 요청 에러:', error);
            },
        }
    );

    return (
        <>
            {newAlbumData && newAlbumData.albums && newAlbumData.albums.items && (
                <Container>
                    <FirstAlbumWrap>
                        <FirstAlbumImg src={newAlbumData?.albums?.items[0].images[0].url} />
                        <FirstAlbumInfo>
                            <FirstAlbumType>
                                {newAlbumData?.albums?.items[0].album_type === 'single'
                                    ? typeTransform.single
                                    : typeTransform.album}
                            </FirstAlbumType>
                            <FirstAlbumTitle>{newAlbumData?.albums?.items[0].name}</FirstAlbumTitle>
                            <FirstAlbumArtist>{newAlbumData?.albums?.items[0].artists[0].name}</FirstAlbumArtist>
                        </FirstAlbumInfo>
                    </FirstAlbumWrap>
                    <TopWrap>
                        <SectionTitle>최신 음악</SectionTitle>
                        <BtnWrap>
                            <PrevBtn src="/images/left_arrow.png" onClick={onPrevBtn}></PrevBtn>
                            <NextBtn src="/images/right_arrow.png" onClick={onNextBtn}></NextBtn>
                        </BtnWrap>
                    </TopWrap>
                    <Row>
                        <NewAlbumWrap state={isMobile.toString()}>
                            {newAlbumData?.albums?.items
                                .slice(1)
                                .slice(offset * index, offset * (index + 1))
                                .map((item) => (
                                    <NewAlbumList
                                        key={item.id}
                                        id={item.id}
                                        title={item.name}
                                        artist={item.artists[0].name}
                                        img={item.images[0].url}
                                    ></NewAlbumList>
                                ))}
                        </NewAlbumWrap>
                    </Row>
                </Container>
            )}
        </>
    );
};
