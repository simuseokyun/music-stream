import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { clickPlaylistState } from '../../store/atoms';
import { IMyPlaylist } from '../../types/myPlaylist';
import { useRecoilValue } from 'recoil';
import { gridState } from '../../store/atoms';

export const MyPlaylistItem = ({ id, cover, name, top }: IMyPlaylist) => {
    const setPlaylist = useSetRecoilState(clickPlaylistState);
    const grid = useRecoilValue(gridState);
    const navigate = useNavigate();
    const clickPlaylist = () => {
        navigate(`/myPlaylist/${id}`);
        setPlaylist(id);
    };

    return (
        <li onClick={clickPlaylist}>
            <img className="img-medium" src={cover} />
            <div>
                <h1>{name}</h1>
            </div>
        </li>
    );
};
