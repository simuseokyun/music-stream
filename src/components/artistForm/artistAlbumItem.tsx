import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IArtistAlbum } from '../../types/artistInfo';

const Container = styled.li`
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    padding: 10px;
    &:hover {
        background-color: #1a191a;
    }
    @media (max-width: 768px) {
        padding: 5px;
    }
`;
const AlbumTitle = styled.h1`
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const AlbumReleaseWrap = styled.div`
    margin-top: 5px;
`;
const AlbumRelease = styled.span`
    color: rgb(160, 160, 160);
`;
const AlbumType = styled(AlbumRelease)`
    margin-left: 3px;
`;
const AlbumImg = styled.img`
    width: 100%;
    border-radius: 8px;
`;

export const AlbumItem = ({ id, name, cover, type, year }: IArtistAlbum) => {
    const navigate = useNavigate();
    const onClickAlbum = () => navigate(`/home/album/${id}`);
    return (
        <Container onClick={onClickAlbum}>
            <AlbumImg src={cover} />
            <AlbumTitle>{name}</AlbumTitle>
            <AlbumReleaseWrap>
                <AlbumRelease>{year}</AlbumRelease>
                <AlbumType>{type}</AlbumType>
            </AlbumReleaseWrap>
        </Container>
    );
};
