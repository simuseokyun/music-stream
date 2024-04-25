import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getFeaturePlaylist, getNewAlbum } from '../api';
import { NewAlbumList } from './newAlbumList';
import { typeTransform } from '../atoms';
import { useRecoilValue } from 'recoil';
import { tokenValue } from '../atoms';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    padding: 20px;
    background: linear-gradient(-90deg, #293a32, #181818);
`;

const FirstAlbumImg = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 8px;
`;
const FirstAlbumInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: end;
`;
const FirstAlbumType = styled.p``;
const FirstAlbumTitle = styled.h1`
    font-weight: 700;
    font-size: 50px;
    margin: 10px 0;
`;
const FirstAlbumArtist = styled.span`
    font-size: 20px;
`;

const Row = styled.div`
    position: relative;
    margin-top: 10px;
    width: 100%;
    /* overflow: hidden; */
`;
const NewAlbumWrap = styled.ul`
    /* position: absolute; */
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    width: 100%;
    /* height: 220px; */
`;
const BtnWrap = styled.div`
    text-align: right;
`;
const PrevBtn = styled.span`
    background-color: #232323;
    padding: 4px;
    font-size: 20px;
    border-radius: 20px;
`;
const NextBtn = styled(PrevBtn)`
    margin-left: 10px;
`;
const SectionTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
`;
const TopWrap = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const NewAlbum = () => {
    const offset = 4;
    const [index, setIndex] = useState(0);
    const onNextBtn = () => {
        setIndex((prev) => (prev === 4 ? 0 : prev + 1));
    };
    const onPrevBtn = () => {
        setIndex((prev) => (prev === 0 ? 4 : prev - 1));
    };
    const token = useRecoilValue(tokenValue);
    const { isLoading: newAlbumLoading, data: newAlbumData } = useQuery<INewAlbum>(
        'newAlbum',
        async () => {
            if (token) {
                return getNewAlbum(token);
            }
        },
        {
            enabled: !!token,
        }
    );

    return (
        <>
            {newAlbumData && (
                <Container>
                    <FirstAlbumWrap>
                        <FirstAlbumImg src={newAlbumData?.albums.items[0].images[0].url} />
                        <FirstAlbumInfo>
                            <FirstAlbumType>
                                {newAlbumData?.albums.items[0].album_type === 'single'
                                    ? typeTransform.single
                                    : typeTransform.album}
                            </FirstAlbumType>
                            <FirstAlbumTitle>{newAlbumData?.albums.items[0].name}</FirstAlbumTitle>
                            <FirstAlbumArtist>{newAlbumData?.albums.items[0].artists[0].name}</FirstAlbumArtist>
                        </FirstAlbumInfo>
                    </FirstAlbumWrap>
                    <TopWrap>
                        <SectionTitle>최신 음악</SectionTitle>
                        <BtnWrap>
                            <PrevBtn className="material-symbols-outlined" onClick={onPrevBtn}>
                                arrow_back_ios_new
                            </PrevBtn>
                            <NextBtn className="material-symbols-outlined" onClick={onNextBtn}>
                                arrow_forward_ios
                            </NextBtn>
                        </BtnWrap>
                    </TopWrap>
                    <Row>
                        <NewAlbumWrap>
                            {newAlbumData?.albums.items
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
