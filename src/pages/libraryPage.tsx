import styled from 'styled-components';
import { Button } from '../components/buttonForm/button';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addPlaylistState, clickMenuAlbum, clickMenuPlaylist, openSearch } from '../state/atoms';
import { PlaylistList } from '../components/myPlaylistForm/myPlaylistList';
import { AlbumList } from '../components/myAlbumForm/albumList';
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

const Title = styled.h1`
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
    }
`;
const AddPlaylistBtn = styled.img`
    width: 20px;
    height: 20px;
    background-color: white;
    padding: 4px;
    border-radius: 10px;
`;

export const LibraryPage = () => {
    const setPlaylist = useSetRecoilState(addPlaylistState);
    const [playlistState, setPlaylistState] = useRecoilState(clickMenuPlaylist);
    const setAlbumState = useSetRecoilState(clickMenuAlbum);
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

    return (
        <Container>
            <TitleWrap>
                <Title>나의 라이브러리</Title>
                <AddPlaylistBtn src="/images/addButton.png" onClick={addPlaylist} />
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
