import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IPopularPlaylist } from '../../types/popularPlaylists';

const Container = styled.li`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
    &:hover {
        background-color: #1a191a;
    }
    @media (max-width: 768px) {
        &:hover {
            background-color: unset;
        }
    }
    @media (max-width: 425px) {
        padding: 5px;
    }
`;
const Cover = styled.img`
    width: 100%;
    border-radius: 8px;
`;
const Title = styled.h1`
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const FeaturePlaylistItem = ({ id, name, img }: IPopularPlaylist) => {
    return (
        <Container>
            <Link to={`/home/popularPlaylist/${id}`}>
                <Cover src={img} />
                <Title>{name}</Title>
            </Link>
        </Container>
    );
};
