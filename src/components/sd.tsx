import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.li`
    width: 100%;
    padding: 10px;
    border-radius: 8px;

    &:hover {
        background-color: #1a191a;
    }
`;
const Img = styled.img`
    width: 100%;
    border-radius: 8px;
`;
const Title = styled.h1`
    margin-top: 10px;
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
                {/* <p>{description}</p> */}
            </Link>
        </Container>
    );
};
