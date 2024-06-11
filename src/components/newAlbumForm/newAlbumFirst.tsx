import styled from 'styled-components';
import { IAlbumFirst } from '../../types/albumInfo';

const Container = styled.div`
    display: flex;
`;

const Cover = styled.img`
    width: 30%;
    border-radius: 8px;
    @media (max-width: 768px) {
    }
`;
const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: end;
    @media (max-width: 425px) {
        margin-left: 10px;
    }
`;
const Type = styled.p`
    font-size: 20px;
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;
const Title = styled.h1`
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
const Artist = styled.span`
    font-size: 20px;
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;

export const NewAlbumFirst = ({ cover, artist, type, name }: IAlbumFirst) => {
    return (
        <Container>
            <Cover src={cover} />
            <Info>
                <Type>{type}</Type>
                <Title>{name}</Title>
                <Artist>{artist}</Artist>
            </Info>
        </Container>
    );
};
