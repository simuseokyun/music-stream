import styled from 'styled-components';
import { IAlbumFirst } from '../../types/albumInfo';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    margin-left: 5px;
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
        font-size: 16px;
    }
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;
const Title = styled.h1`
    font-weight: 700;
    font-size: 38px;
    margin: 10px 0;
    cursor: pointer;
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
    cursor: pointer;
    @media (max-width: 768px) {
        font-size: 16px;
    }
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;

export const NewAlbumFirst = ({ id, artistId, cover, artist, type, name }: IAlbumFirst) => {
    const navigate = useNavigate();
    const navigateAlbum = () => {
        navigate(`/home/album/${id}`);
    };
    const navigateArtist = () => {
        navigate(`/home/artist/${artistId}`);
    };
    return (
        <Container>
            <Cover src={cover} />
            <Info>
                <Type>{type}</Type>
                <Title onClick={navigateAlbum}>{name}</Title>
                <Artist onClick={navigateArtist}>{artist}</Artist>
            </Info>
        </Container>
    );
};
