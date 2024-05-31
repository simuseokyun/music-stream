import styled from 'styled-components';
import { Button } from '../buttonForm/button';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { addPlaylistState, clickMenuAlbum, clickMenuPlaylist, openSearch } from '../../atoms';
import { PlaylistList } from '../playlistForm/playlistList';
import { AlbumList } from '../albumForm/albumList';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
    background-color: #131212;
    border-radius: 8px;
    height: 450px;
    padding: 20px;
    margin-bottom: 140px;
    overflow-y: scroll;
    overflow-x: hidden;
    @media (max-width: 768px) {
        padding: 10px;
        height: auto;
        background-color: black;
    }
`;

const LibraryTitle = styled.h1`
    font-size: 20px;
    padding: 0 0 10px 0;
    @media (max-width: 768px) {
    }
`;
const TitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    span {
        border-radius: 20px;
        padding: 2px;
        transition: all 0.2s;
        &:hover {
            background-color: rgb(117, 117, 117);
            p {
                opacity: 1;
            }
        }
    }
`;

export const Library = () => {
    const setPlaylist = useSetRecoilState(addPlaylistState);
    const [playlistState, setPlaylistState] = useRecoilState(clickMenuPlaylist);
    const [albumState, setAlbumState] = useRecoilState(clickMenuAlbum);
    const searchState = useSetRecoilState(openSearch);
    const navigate = useNavigate();
    const addPlaylist = () => {
        setPlaylist(true);
    };
    const onClickPlaylist = () => {
        setPlaylistState(true);
        setAlbumState(false);
    };
    const onClickSetAlbum = () => {
        setAlbumState(true);
        setPlaylistState(false);
    };
    const setSearch = () => {
        searchState((prev) => {
            return !prev;
        });
    };

    return (
        <Container>
            <TitleWrap>
                <LibraryTitle>나의 라이브러리</LibraryTitle>
                <span onClick={addPlaylist} className="material-symbols-outlined">
                    add_circle
                </span>
            </TitleWrap>
            <Button text="플레이리스트" bgColor={playlistState ? 'white' : '#232323'} onClick={onClickPlaylist} />
            <Button
                margin="0px 0px 0px 5px"
                text="내가 찜한 앨범"
                bgColor={playlistState ? '#232323' : 'white'}
                onClick={onClickSetAlbum}
            />
            {playlistState ? <PlaylistList /> : <AlbumList />}
        </Container>
    );
};
