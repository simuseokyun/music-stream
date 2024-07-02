import { useQuery } from 'react-query';
import { getFeaturePlaylist } from '../../api/api';
import styled from 'styled-components';
import { FeaturePlaylistItem } from './featurePlaylistItem';
import { getLocalStorage, usePagenation } from '../../utils/util';
import { IPopularPlaylists } from '../../types/popularPlaylists';
import { PrevBtn, NextBtn, Message } from '../../styles/common.style';

const Container = styled.div`
    margin-top: 20px;
`;
const Row = styled.div``;
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
const FeaturePlaylistList = styled.ul<{ state: string }>`
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};
    width: 100%;
`;
const BtnWrap = styled.div`
    text-align: right;
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
    const token = getLocalStorage('webAccessToken');
    const { isMobile, index, onNextBtn, onPrevBtn } = usePagenation();
    const offset = isMobile ? 3 : 4;
    const {
        isLoading,
        data: featurePlaylist,
        isError,
    } = useQuery<IPopularPlaylists>('newPlaylist', () => {
        if (token) {
            return getFeaturePlaylist(token);
        }
        return Promise.resolve(null);
    });

    if (isError) {
        return <Message>에러 발생</Message>;
    }
    return (
        <>
            {featurePlaylist && (
                <Container>
                    <TopWrap>
                        <Title>인기 플레이리스트</Title>
                        <BtnWrap>
                            <PrevBtn src="/images/leftArrow.png" onClick={onPrevBtn}></PrevBtn>
                            <NextBtn src="/images/rightArrow.png" onClick={onNextBtn}></NextBtn>
                        </BtnWrap>
                    </TopWrap>
                    <Row>
                        <FeaturePlaylistList state={isMobile.toString()}>
                            {featurePlaylist?.playlists?.items
                                .slice(offset * index, offset * (index + 1))
                                .map(({ id, name, description, images }) => (
                                    <FeaturePlaylistItem
                                        key={id}
                                        id={id}
                                        name={name}
                                        description={description}
                                        cover={images[0].url}
                                    ></FeaturePlaylistItem>
                                ))}
                        </FeaturePlaylistList>
                    </Row>
                </Container>
            )}
        </>
    );
};
