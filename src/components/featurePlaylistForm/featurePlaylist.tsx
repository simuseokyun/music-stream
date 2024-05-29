import { useQuery } from 'react-query';
import { getFeaturePlaylist } from '../../api';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useState } from 'react';
import { FeaturePlaylistList } from './featurePlaylistList';
import { getTokenLocalStorage } from '../../util';
import { setMobile } from '../../atoms';

interface IFeaturePlaylist {
    playlists: { items: { id: string; description: string; name: string; images: { url: string }[] }[] };
}
const Container = styled.div`
    margin-top: 20px;
`;
const Row = styled.div``;
const SectionTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 425px) {
        font-size: 14px;
    }
`;
const FeaturePlaylistWrap = styled.ul<{ state: string }>`
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};
    gap: 5px;
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
    }
`;
const NextBtn = styled(PrevBtn)`
    margin-left: 10px;
`;
const TopWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 10px 0;
    @media (max-width: 768px) {
        margin: 20px 0 5px 0;
    }
    @media (max-width: 425px) {
    }
`;

export const FeaturePlaylist = () => {
    const isMobile = useRecoilValue(setMobile);
    const offset = isMobile ? 3 : 4;
    const [index, setIndex] = useState(0);
    const token = getTokenLocalStorage('webAccessToken');
    const {
        isLoading: playlistLoading,
        data: featurePlaylist,
        isError,
    } = useQuery<IFeaturePlaylist>('newPlaylist', async () => {
        if (token) {
            return getFeaturePlaylist(token);
        }
        return Promise.resolve(null);
    });
    const onNextBtn = () => {
        if (isMobile) {
            setIndex((prev) => (prev === 6 ? 0 : prev + 1));
        } else {
            setIndex((prev) => (prev === 4 ? 0 : prev + 1));
        }
    };
    const onPrevBtn = () => {
        if (isMobile) {
            setIndex((prev) => (prev === 6 ? 0 : prev - 1));
        } else {
            setIndex((prev) => (prev === 4 ? 0 : prev - 1));
        }
    };
    if (isError) {
        return <button>세션 만료</button>;
    }
    return (
        <>
            {featurePlaylist && (
                <Container>
                    <TopWrap>
                        <SectionTitle>인기 플레이리스트</SectionTitle>
                        <BtnWrap>
                            <PrevBtn src="/images/left_arrow.png" onClick={onPrevBtn}></PrevBtn>
                            <NextBtn src="/images/right_arrow.png" onClick={onNextBtn}></NextBtn>
                        </BtnWrap>
                    </TopWrap>
                    <Row>
                        <FeaturePlaylistWrap state={isMobile.toString()}>
                            {featurePlaylist?.playlists?.items
                                .slice(offset * index, offset * (index + 1))
                                .map((item) => (
                                    <FeaturePlaylistList
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        description={item.description}
                                        img={item.images[0].url}
                                    ></FeaturePlaylistList>
                                ))}
                        </FeaturePlaylistWrap>
                    </Row>
                </Container>
            )}
        </>
    );
};
