import styled from 'styled-components';
import { Button } from '../components/common/buttonForm/button';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { addPlaylistState, libraryAlbumState, libraryPliState } from '../state/atoms';
import { MyPlaylistList } from '../components/myPlaylistForm/myPlaylistList';
import { MyAlbumList } from '../components/myAlbumForm/albumList';

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
const Title = styled.h1`
    font-size: 20px;
    padding: 0 0 10px 0;
    @media (max-width: 768px) {
    }
`;
const ButtonWrap = styled.div`
    margin-bottom: 20px;
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
    const [pliState, setPlistate] = useRecoilState(libraryPliState);
    const setAlbumState = useSetRecoilState(libraryAlbumState);
    const addPlaylist = () => {
        setPlaylist(true);
    };
    const onClickPlaylist = () => {
        setPlistate(true);
        setAlbumState(false);
    };
    const onClickSetAlbum = () => {
        setAlbumState(true);
        setPlistate(false);
    };

    return (
        <Container>
            <TitleWrap>
                <Title>나의 라이브러리</Title>
                <AddPlaylistBtn src="/images/addButton.png" onClick={addPlaylist} />
            </TitleWrap>
            <ButtonWrap>
                <Button text="플레이리스트" bgColor={pliState ? 'white' : '#232323'} onClick={onClickPlaylist} />
                <Button
                    margin="0px 0px 0px 5px"
                    text="내가 찜한 앨범"
                    bgColor={pliState ? '#232323' : 'white'}
                    onClick={onClickSetAlbum}
                />
            </ButtonWrap>
            {pliState ? <MyPlaylistList /> : <MyAlbumList />}
        </Container>
    );
};
