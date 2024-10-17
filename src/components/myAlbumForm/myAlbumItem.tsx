import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IMyAlbumList } from '../../types/myAlbums';
import { useRecoilValue } from 'recoil';
import { gridState } from '../../state/atoms';

const Item = styled.li<{ $grid: boolean }>`
    display: ${({ $grid }) => ($grid ? 'block' : 'flex')};
    align-items: center;
    width: 100%;
    overflow: hidden;
    a {
        text-decoration: none;
        display: flex;
        align-items: center;
    }
`;
const Cover = styled.img<{ $grid: boolean }>`
    width: ${({ $grid }) => ($grid ? '100%' : '60px')};
    border-radius: 8px;
    object-fit: cover;
    background-color: #232323;
`;

const Info = styled.div<{ $grid: boolean }>`
    margin: ${({ $grid }) => ($grid ? '5px 0 0' : '0 0 0 10px')};
`;
const Title = styled.h1`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const Artist = styled.p`
    color: rgb(160, 160, 160);
`;

export const AlbumItem = ({ id, name, artist, cover }: IMyAlbumList) => {
    const navigate = useNavigate();
    const grid = useRecoilValue(gridState);

    const clickAlbum = () => {
        navigate(`/home/album/${id}`);
    };
    return (
        <Item onClick={clickAlbum} $grid={grid}>
            <Cover src={cover} $grid={grid} />
            <Info $grid={grid}>
                <Title>{name}</Title>
                <Artist>{artist}</Artist>
            </Info>
        </Item>
    );
};
