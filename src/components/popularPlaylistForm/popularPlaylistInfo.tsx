import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 20px;
    @media (max-width: 425px) {
        display: block;
    }
`;
const Cover = styled.img`
    background-color: #232323;
    width: 200px;
    border-radius: 8px;
    @media (max-width: 768px) {
        width: 150px;
    }
    @media (max-width: 425px) {
        margin: auto;
    }
`;

const Info = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 10px 0 0 0;
    }
`;
const Description = styled.p`
    color: #e2e2e2;
    font-size: 14px;
    line-height: 1.4;
`;
const Type = styled.p`
    margin-bottom: 2px;
    font-size: 14px;
`;
const Title = styled.p`
    font-size: 30px;
    font-weight: 700;
    margin: 10px 0;
    @media (max-width: 768px) {
        font-size: 20px;
        margin: 5px 0;
    }
`;

const Follower = styled.p`
    margin-top: 5px;
    font-size: 12px;
    color: rgba(160, 160, 160);
`;

interface IPopularPlaylistInfo {
    cover: string;
    name: string;
    description: string;
    followers: string;
}

export const PopularPlaylistInfo = ({ cover, name, description, followers }: IPopularPlaylistInfo) => {
    return (
        <Container>
            <Cover src={cover}></Cover>
            <Info>
                <Type>공개 플레이리스트</Type>
                <Title>{name}</Title>
                <Description>{description}</Description>
                <Follower>저장 횟수 : {followers}</Follower>
            </Info>
        </Container>
    );
};
