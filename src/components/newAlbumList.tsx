import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { typeTransform } from '../atoms';

const Container = styled.li`
    width: 100%;
    padding: 10px;
    border-radius: 8px;

    &:hover {
        background-color: #1a191a;
    }
`;
const NewAlbumImg = styled.img`
    width: 100%;
    border-radius: 8px;
`;
const NewAlbumTitle = styled.h1``;
const NewAlbumArtist = styled.p``;

interface INewAlbum {
    id: string;
    title: string;
    artist: string;
    img: string;
}

export const NewAlbumList = ({ id, title, artist, img }: INewAlbum) => {
    const navigate = useNavigate();
    const onClickAlbum = () => {
        navigate(`/album/${id}`);
    };
    return (
        <Container onClick={onClickAlbum}>
            <NewAlbumImg src={img} />
            <NewAlbumTitle>{title}</NewAlbumTitle>
            <NewAlbumArtist>{artist}</NewAlbumArtist>
        </Container>
    );
};
