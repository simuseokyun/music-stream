import styled from 'styled-components';
import { Button } from './button';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addPlaylistState, clickMenuAlbum, clickMenuPlaylist, openSearch } from '../atoms';
import { PlaylistList } from './playlistList';
import { AlbumList } from './albumList';

const SideBarWrap = styled.div`
    width: 100%;
    height: 500px;
    position: sticky;
    top: 70px;
`;
const SideBarTop = styled.ul`
    height: 100px;
    background-color: #131212;
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
`;
const TopList = styled.li`
    font-size: 18px;
    &:first-child {
        margin-bottom: 20px;
    }
`;
const SideBarBot = styled.div`
    height: 400px;
    margin-top: 20px;
    background-color: #131212;
    border-radius: 8px;
    padding: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const AddPlaylistMessage = styled.p`
    position: absolute;
    top: -30px;
    left: -50px;
    background-color: gray;
    padding: 3px;
    font-size: 14px;
    border-radius: 3px;
    opacity: 0;
    transition: all 0.2s;
`;
const TitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

export const SideBar = () => {
    const setPlaylist = useSetRecoilState(addPlaylistState);
    const [playlistState, setPlaylistState] = useRecoilState(clickMenuPlaylist);
    const [albumState, setAlbumState] = useRecoilState(clickMenuAlbum);
    const searchState = useSetRecoilState(openSearch);
    const addPlaylist = () => {
        setPlaylist(true);
    };
    const onClickMenu1 = () => {
        setPlaylistState(true);
        setAlbumState(false);
    };
    const onClickMenu2 = () => {
        setAlbumState(true);
        setPlaylistState(false);
    };
    const setSearch = () => {
        searchState((prev) => {
            return !prev;
        });
    };
    return (
        <SideBarWrap>
            <SideBarTop>
                <TopList>
                    <Link to="/">홈</Link>
                </TopList>
                <TopList onClick={setSearch}>검색하기</TopList>
            </SideBarTop>
            <SideBarBot>
                <TitleWrap>
                    <h1>나의 라이브러리</h1>
                    <span
                        onClick={addPlaylist}
                        style={{ position: 'relative', background: '' }}
                        className="material-symbols-outlined"
                    >
                        add_circle
                        {/* <AddPlaylistMessage>플레이리스트 생성</AddPlaylistMessage> */}
                    </span>
                </TitleWrap>
                <Button text="플레이리스트" state={playlistState} onClick={onClickMenu1} />
                <Button text="내가 찜한 앨범" state={albumState} onClick={onClickMenu2} />
                {playlistState ? <PlaylistList /> : <AlbumList />}
            </SideBarBot>
        </SideBarWrap>
    );
};
