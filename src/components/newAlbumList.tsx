import styled from 'styled-components';

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
    title: string;
    artist: string;
    img: string;
}
export const NewAlbumList = ({ title, artist, img }: INewAlbum) => {
    return (
        <Container>
            <NewAlbumImg src={img} />
            <NewAlbumTitle>{title}</NewAlbumTitle>
            <NewAlbumArtist>{artist}</NewAlbumArtist>
        </Container>
    );
};
