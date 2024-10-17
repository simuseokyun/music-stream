import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
const Title = styled.h1`
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const ReleaseWrap = styled.div`
    margin-top: 5px;
`;
const Release = styled.span`
    color: rgb(160, 160, 160);
`;
const Type = styled(Release)`
    margin-left: 3px;
`;
const Cover = styled.img`
    width: 100%;
    border-radius: 8px;
`;

export const AlbumItem = ({ id, name, cover, type, year }: IArtistAlbum) => {
    const navigate = useNavigate();
    const onClickAlbum = () => navigate(`/home/album/${id}`);
    return (
        <Container onClick={onClickAlbum}>
            <Cover src={cover} alt="앨범 커버" />
            <Title>{name}</Title>
            <ReleaseWrap>
                <Release>{year}</Release>
                <Type>{type}</Type>
            </ReleaseWrap>
        </Container>
    );
};
