import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { clickPlaylistState } from '../../state/atoms';
import { IMyPlaylist } from '../../types/myPlaylist';
import { useRecoilValue } from 'recoil';
import { gridState } from '../../state/atoms';

const Item = styled.li<{ $grid: boolean }>`
    display: ${({ $grid }) => ($grid ? 'block' : 'flex')};
    align-items: center;
    width: 100%;
    overflow: hidden;
`;
const Cover = styled.img<{ $grid: boolean }>`
    width: ${({ $grid }) => ($grid ? '100%' : '60px')};
    height: ${({ $grid }) => ($grid ? '80%' : '60px')};
    border-radius: 8px;
    background-color: #232323;
`;
const Info = styled.div<{ $grid: boolean }>`
    margin: ${({ $grid }) => ($grid ? '5px 0 0' : '0 0 0 10px')};
`;
const Title = styled.h1`
    width: 100%;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const Pin = styled.img`
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-right: 5px;
`;

export const MyPlaylistItem = ({ id, cover, name, top }: IMyPlaylist) => {
    const setPlaylist = useSetRecoilState(clickPlaylistState);
    const grid = useRecoilValue(gridState);
    const navigate = useNavigate();
    const clickPlaylist = () => {
        navigate(`/home/playlist/${id}`);
        setPlaylist(id);
    };

    return (
        <Item onClick={clickPlaylist} $grid={grid}>
            <Cover src={cover} $grid={grid} />
            <Info $grid={grid}>
                <Title>
                    {top && <Pin src="/images/check.png"></Pin>}
                    {name}
                </Title>
            </Info>
        </Item>
    );
};
