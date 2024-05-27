import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
const Img = styled.img`
    width: 100%;
    border-radius: 8px;
`;
const Title = styled.h1`
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;

interface IFeature {
    id: string;
    description: string;
    name: string;
    img: string;
}

export const FeaturePlaylistList = ({ id, description, name, img }: IFeature) => {
    return (
        <Container>
            <Link to={`/home/popularPlaylist/${id}`}>
                <Img src={img} />
                <Title>{name}</Title>
            </Link>
        </Container>
    );
};
