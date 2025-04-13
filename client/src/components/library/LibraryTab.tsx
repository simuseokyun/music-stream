import { useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '../common/buttonForm/Button';
import { GridBtn } from '../common/buttonForm/GridButton';
import { ListBtn } from '../common/buttonForm/ListButton';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { addPlaylistState, gridState, libraryState } from '../../store/atoms';

const Tab = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #131212;
    @media (max-width: 768px) {
        background-color: black;
    }
`;
const LeftTab = styled.div`
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
const RightTab = styled.div`
    display: flex;
    align-items: center;
`;
const AddPlaylistBtn = styled.img`
    width: 20px;
    height: 20px;
    background-color: white;
    padding: 4px;
    border-radius: 10px;
    margin-right: 5px;
`;

export const LibraryTab = () => {
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

    const onClickTab = useCallback((type: 'playlist' | 'album') => {
        setLibraryState({
            playlist: type === 'playlist',
            album: type === 'album',
        });
    }, []);
    return (
        <Tab>
            <LeftTab>
                <Button
                    text="플레이리스트"
                    padding="4px 8px"
                    bgColor={libraryState_.playlist ? 'white' : '#232323'}
                    onClick={() => onClickTab('playlist')}
                />
                <Button
                    text="내가 찜한 앨범"
                    padding="4px 8px"
                    margin="0 0 0 5px"
                    bgColor={!libraryState_.playlist ? 'white' : '#232323'}
                    onClick={() => onClickTab('album')}
                />
            </LeftTab>
            <RightTab>
                <AddPlaylistBtn src="/assets/addButton.png" onClick={addPlaylist} />
                {grid ? <ListBtn onList={onList} /> : <GridBtn onGrid={onGrid} />}
            </RightTab>
        </Tab>
    );
};
