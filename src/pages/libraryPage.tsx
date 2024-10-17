import styled from 'styled-components';
import { Button } from '../components/common/buttonForm/button';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { addPlaylistState, libraryState } from '../state/atoms';
import { MyPlaylistList } from '../components/myPlaylistForm/myPlaylistList';
import { MyAlbumList } from '../components/myAlbumForm/myAlbumList';
import { useCallback } from 'react';
import { GridBtn } from '../components/common/buttonForm/gridButton';
import { ListBtn } from '../components/common/buttonForm/listBtn';
import { gridState } from '../state/atoms';

const Container = styled.div`
    background-color: #131212;
    position: relative;
    border-radius: 8px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 550px;
    @media (max-width: 768px) {
        margin-top: 60px;
        background-color: black;
    }
`;
const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #131212;
    @media (max-width: 768px) {
        background-color: black;
    }
`;
const StickyWrap = styled.div`
    position: sticky;
    background-color: #131212;
    top: 0;
    left: 0;
    padding: 20px;

    @media (max-width: 768px) {
        background-color: black;
    }
`;
const LeftBtnWrap = styled.div`
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

const AddPlaylistBtn = styled.img`
    width: 20px;
    height: 20px;
    background-color: white;
    padding: 4px;
    border-radius: 10px;
    margin-right: 5px;
`;

const RightBtnWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const LibraryPage = () => {
    const setPlaylist = useSetRecoilState(addPlaylistState);
    const [libraryState_, setLibraryState] = useRecoilState(libraryState);
    const [grid, setGrid] = useRecoilState(gridState);
    const onGrid = () => {
        setGrid((prev) => true);
    };
    const onList = () => {
        setGrid((prev) => false);
    };

    const addPlaylist = useCallback(() => {
        setPlaylist(true);
    }, []);
    const onClickPlaylist = useCallback(() => {
        setLibraryState({ playlist: true, album: false });
    }, []);
    const onClickSetAlbum = useCallback(() => {
        setLibraryState({ playlist: false, album: true });
    }, []);

    return (
        <Container>
            <StickyWrap>
                <Title>나의 라이브러리</Title>
                <Wrap>
                    <LeftBtnWrap>
                        <Button
                            text="플레이리스트"
                            padding="4px 8px"
                            bgColor={libraryState_.playlist ? 'white' : '#232323'}
                            onClick={onClickPlaylist}
                        />
                        <Button
                            margin="0px 0px 0px 5px"
                            padding="4px 8px"
                            text="내가 찜한 앨범"
                            bgColor={!libraryState_.playlist ? 'white' : '#232323'}
                            onClick={onClickSetAlbum}
                        />
                    </LeftBtnWrap>
                    <RightBtnWrap>
                        <AddPlaylistBtn src="/images/addButton.png" onClick={addPlaylist} />
                        {grid ? <ListBtn onList={onList} /> : <GridBtn onGrid={onGrid} />}
                    </RightBtnWrap>
                </Wrap>
            </StickyWrap>
            {libraryState_.playlist ? <MyPlaylistList /> : <MyAlbumList />}
        </Container>
    );
};
