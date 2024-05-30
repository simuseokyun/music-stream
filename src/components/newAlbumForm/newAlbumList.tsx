import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.li`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
    &:hover {
        background-color: #1a191a;
    }
    @media (max-width: 425px) {
        padding: 5px;
    }
`;
const NewAlbumImg = styled.img`
    width: 100%;
    border-radius: 8px;
`;
const NewAlbumTitle = styled.h1`
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;
const NewAlbumArtist = styled.p`
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(160, 160, 160);
    margin-top: 5px;
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;

interface INewAlbum {
    id: string;
    title: string;
    artist: string;
    img: string;
}

export const NewAlbumList = ({ id, title, artist, img }: INewAlbum) => {
    const navigate = useNavigate();
    const onClickAlbum = () => {
        navigate(`/home/album/${id}`);
    };
    return (
        <Container onClick={onClickAlbum}>
            <NewAlbumImg src={img} />
            <NewAlbumTitle>{title}</NewAlbumTitle>
            <NewAlbumArtist>{artist}</NewAlbumArtist>
        </Container>
    );
};
