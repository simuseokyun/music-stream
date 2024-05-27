import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { clickPlaylistState, playlistList, titleChangeState } from '../../atoms';
import { useNavigate } from 'react-router-dom';

const Container = styled.ul`
    width: 100%;
`;
const List = styled.li`
    display: flex;
    align-items: center;
    border-radius: 8px;
    transition: all 0.2s;
    padding: 5px;
    width: 100%;
    overflow: hidden;
    &:hover {
        background-color: gray;
    }
    &:first-child {
        margin-top: 10px;
    }
`;
const ListImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background-color: #232323;
`;
const ListInfo = styled.div`
    width: calc(100% - 50px);
    margin-left: 8px;
`;
const ListTitle = styled.h1`
    margin-bottom: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const ListType = styled.p`
    font-size: 12px;
`;

const Message = styled.p`
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
`;
const Pin = styled.span`
    vertical-align: middle;
    font-size: 16px;
    color: #65d46e;
    margin-right: 2px;
`;

export const PlaylistList = () => {
    const playlists = useRecoilValue(playlistList);
    const setPlaylist = useSetRecoilState(clickPlaylistState);
    const setChangeForm = useSetRecoilState(titleChangeState);
    const navigate = useNavigate();
    return (
        <Container>
            {playlists.length ? (
                playlists.map((playlist) => {
                    return (
                        <List
                            key={playlist.id}
                            onClick={() => {
                                navigate(`/home/playlist/${playlist.id}`);
                                setPlaylist(playlist.id);
                                setChangeForm(() => false);
                            }}
                        >
                            <ListImg src={playlist.img ? playlist.img : '/basicPlaylist.webp'} />
                            <ListInfo>
                                <ListTitle>
                                    {playlist.top && <Pin className="material-symbols-outlined">check</Pin>}
                                    {playlist.title}
                                </ListTitle>
                                <ListType>플레이리스트</ListType>
                            </ListInfo>
                        </List>
                    );
                })
            ) : (
                <Message>목록이 없습니다.</Message>
            )}
        </Container>
    );
};
