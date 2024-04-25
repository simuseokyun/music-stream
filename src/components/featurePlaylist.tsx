import { useQuery } from 'react-query';
import { getFeaturePlaylist } from '../api';
import { useRecoilValue } from 'recoil';
import { tokenValue } from '../atoms';
import styled from 'styled-components';
import { useState } from 'react';
import { FeaturePlaylistList } from './sd';

interface IFeaturePlaylist {
    playlists: { items: { id: string; description: string; name: string; images: { url: string }[] }[] };
}
const Container = styled.div`
    margin-top: 20px;
`;
const Row = styled.div`
    height: 500px;
`;
const SectionTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
`;
const FeaturePlaylistWrap = styled.ul`
    /* position: absolute; */
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    width: 100%;
    margin-top: 10px;
`;
const BtnWrap = styled.div`
    text-align: right;
`;
const PrevBtn = styled.span`
    background-color: #e2e2e2;
    padding: 4px;
    font-size: 20px;
    border-radius: 20px;
`;
const NextBtn = styled(PrevBtn)`
    margin-left: 10px;
`;
const TopWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const FeaturePlaylist = () => {
    const offset = 4;
    const [index, setIndex] = useState(0);
    const token = useRecoilValue(tokenValue);
    const { isLoading: playlistLoading, data: featurePlaylist } = useQuery<IFeaturePlaylist>(
        'newPlaylist',
        async () => {
            if (token) {
                return getFeaturePlaylist(token);
            }
        }
    );
    console.log(featurePlaylist);
    const onNextBtn = () => {
        setIndex((prev) => (prev === 4 ? 0 : prev + 1));
    };
    const onPrevBtn = () => {
        setIndex((prev) => (prev === 0 ? 4 : prev - 1));
    };
    return (
        <>
            {featurePlaylist && (
                <Container>
                    <TopWrap>
                        <SectionTitle>인기 플레이리스트</SectionTitle>
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
                        <FeaturePlaylistWrap>
                            {featurePlaylist.playlists.items.slice(offset * index, offset * (index + 1)).map((item) => (
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
