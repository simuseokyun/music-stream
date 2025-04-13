import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { INewAlbumItemProp, INewAlbumCoverProp } from '../../types/newAlbums';
import { useState } from 'react';
import {} from '../../types/newAlbums';

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

const Cover = styled.img<INewAlbumCoverProp>`
    width: 100%;
    border-radius: 8px;
    display: ${({ $loaded }) => ($loaded == 'true' ? 'block' : 'none')};
`;
const Title = styled.h1`
    width: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
`;
const Artist = styled.p`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(160, 160, 160);

    @media (max-width: 768px) {
        font-size: 14px;
    }
    @media (max-width: 425px) {
        font-size: 12px;
    }
`;
const LoadingImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 8px;
`;

export const NewAlbumItem = ({ id, name, artist, cover }: INewAlbumItemProp) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onLoadImage = () => setImageLoaded(true);

    const navigate = useNavigate();
    const onClickAlbum = () => {
        navigate(`/album/${id}`);
    };
    return (
        <Container onClick={onClickAlbum}>
            {/* {!imageLoaded && <LoadingImage src="/assets/loading.png" alt="로딩이미지" />} */}
            <Cover src={cover} alt="앨범커버" onLoad={onLoadImage} $loaded={imageLoaded.toString()} />
            <Title>{name}</Title>
            <Artist>{artist}</Artist>
        </Container>
    );
};
