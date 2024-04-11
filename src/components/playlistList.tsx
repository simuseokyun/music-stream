import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { clickPlaylistState, playlistList } from '../atoms';
import { IPlaylist } from '../atoms';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const Container = styled.ul``;
const List = styled.li`
    display: flex;
    align-items: center;
    /* margin-top: 5px; */
    border-radius: 8px;
    transition: all 0.2s;
    padding: 5px;
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
`;
const ListInfo = styled.div`
    margin-left: 8px;
`;
const ListTitle = styled.h1`
    margin-bottom: 5px;
`;
const ListType = styled.p`
    font-size: 12px;
`;
const ListFixed = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: green;
    margin-right: 5px;
`;
const Message = styled.p``;

export const PlaylistList = () => {
    const playlists = useRecoilValue(playlistList);
    const setPlaylist = useSetRecoilState(clickPlaylistState);
    const navigate = useNavigate();
    return (
        <Container>
            {playlists.length ? (
                playlists.map((playlist) => {
                    return (
                        <List
                            key={playlist.id}
                            onClick={() => {
                                navigate(`/playlist/${playlist.id}`);
                                setPlaylist(playlist.id);
                            }}
                        >
                            <ListImg src={undefined || '/basicPlaylist.webp'} />
                            <ListInfo>
                                <ListTitle>
                                    {playlist.top && <ListFixed />}
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
