import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { INewAlbumItemProp, INewAlbumCoverProp } from '../../types/newAlbums';
import { useState } from 'react';
import {} from '../../types/newAlbums';

const Container = styled.li`
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
`;

export const NewAlbumItem = ({ id, name, artist, cover }: INewAlbumItemProp) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onLoadImage = () => setImageLoaded(true);

    const navigate = useNavigate();
    const onClickAlbum = () => {
        navigate(`/album/${id}`);
    };
    return (
        <div onClick={onClickAlbum} className="md:hover:bg-[#1a191a] p-[10px] rounded-md cursor-pointer">
            {/* {!imageLoaded && <LoadingImage src="/assets/loading.png" alt="로딩이미지" />} */}
            <img className="rounded-md" src={cover} alt="앨범커버" onLoad={onLoadImage} />
            <h1 className="text-ellipsis text-md mt-2">{name}</h1>
            <p className="artists  text-sm text-sub mt-1">{artist}</p>
        </div>
    );
};
