import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IPopularPlaylist } from '../../types/popularPlaylists';
import { useState } from 'react';
import { IPopularListCoverProps } from '../../types/popularPlaylists';

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

const Cover = styled.img<IPopularListCoverProps>`
    width: 100%;
    border-radius: 8px;
    display: ${({ $loaded }) => ($loaded == 'true' ? 'block' : 'none')};
`;
const Title = styled.h1`
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const LoadingSpinner = styled.img`
    width: 100%;
    border-radius: 8px;
`;

export const FeaturePlaylistItem = ({ id, name, cover }: IPopularPlaylist) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onLoadImage = () => setImageLoaded(true);

    return (
        <Container>
            <Link to={`/home/popularPlaylist/${id}`}>
                {!imageLoaded && <LoadingSpinner src="/images/basicPlaylist.png" />}
                <Cover src={cover} alt="albumCover" onLoad={onLoadImage} $loaded={imageLoaded.toString()} />
                <Title>{name}</Title>
            </Link>
        </Container>
    );
};
