import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { commaSeparate } from '../../utils/commaSeparate';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { getArtist } from '../../api/getInfo';
import { IArtistInfo } from '../../types/artistInfo';
import { Message, Loading, LoadingWrap } from '../../styles/common.style';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    @media (max-width: 425px) {
        height: 200px;
    }
`;
const Cover = styled.div<{ $img: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url(${({ $img }) => $img});
    background-position: center;
    background-size: cover;
    opacity: 0.7;
`;
const Overlay = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 20px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @media (max-width: 425px) {
        padding: 10px;
    }
`;
const Artist = styled.h1`
    font-size: 36px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 24px;
    }
    @media (max-width: 425px) {
        font-size: 20px;
    }
`;
const Follower = styled.span`
    font-size: 18px;
    margin-top: 10px;
    @media (max-width: 425px) {
        font-size: 14px;
    }
`;
export const ArtistCover = () => {
    const token = getLocalStorage('webAccessToken');
    const { artistId } = useParams();
    const {
        isLoading,
        data: artistData,
        isError,
    } = useQuery<IArtistInfo>({
        queryKey: ['artistCover', artistId],
        queryFn: async () => {
            if (artistId && token) {
                const artistData = await getArtist(token, artistId);
                return artistData;
            } else {
                return Promise.resolve(null);
            }
        },
    });
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
    if (!artistData) {
        return <Message>데이터가 없습니다</Message>;
    }
    const { name, images, followers } = artistData;
    return (
        <Container>
            <Cover $img={images[0].url}></Cover>
            <Overlay>
                <Artist>{name}</Artist>
                <Follower>팔로워 : {commaSeparate(followers.total)}명</Follower>
            </Overlay>
        </Container>
    );
};
