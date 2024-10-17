import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IPopularPlaylist } from '../../types/popularPlaylists';
import { useState } from 'react';
import { IPopularListCoverProps } from '../../types/popularPlaylists';

const Item = styled.li`
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
    line-height: 1.2;
    font-size: 16px;

    @media (max-width: 425px) {
        font-size: 14px;
    }
`;

const LoadingImg = styled.img`
    width: 100%;
    border-radius: 8px;
`;

export const FeaturePlaylistItem = ({ id, name, cover }: IPopularPlaylist) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onLoadImage = () => setImageLoaded(true);

    return (
        <Item>
            <Link to={`/home/popularPlaylist/${id}`}>
                {!imageLoaded && <LoadingImg src="/images/basicPlaylist.png" alt="기본이미지" />}
                <Cover src={cover} alt="앨범커버" onLoad={onLoadImage} $loaded={imageLoaded.toString()} />
                <Title>{name}</Title>
            </Link>
        </Item>
    );
};
