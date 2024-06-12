import styled from 'styled-components';
import { commaSeparate, getLocalStorage } from '../../utils/util';
import { getArtist } from '../../api/api';
import { useQuery } from 'react-query';
import { IArtistInfo } from '../../types/artistInfo';
import { useParams } from 'react-router-dom';
import { Message } from '../../styles/common.style';

const TopWrap = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    @media (max-width: 425px) {
        height: 200px;
    }
`;
const Top = styled.div<{ img: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url(${(props) => props.img});
    background-position: center;
    background-size: cover;
    opacity: 0.7;
`;
const TopOverlay = styled.div`
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
const Name = styled.h1`
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
    const token = getLocalStorage('webAccessToken') || '';
    const { artistId } = useParams();
    console.log(artistId, token);
    const {
        isLoading: artistLoading,
        data: artistInfo,
        isError,
    } = useQuery<IArtistInfo>(['artist', artistId], () => getArtist(token, artistId!));
    if (artistLoading) {
        return <Message>Loading...</Message>;
    }
    if (isError || !artistInfo) {
        return <Message>Error</Message>;
    }
    return (
        <TopWrap>
            <Top img={artistInfo?.images[0].url!}></Top>
            <TopOverlay>
                <Name>{artistInfo?.name}</Name>
                <Follower>팔로워 : {commaSeparate(artistInfo?.followers.total!)}명</Follower>
            </TopOverlay>
        </TopWrap>
    );
};
