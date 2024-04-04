import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { playlistList } from '../atoms';
import { IPlaylist } from '../atoms';
const Container = styled.ul``;
const List = styled.li`
    display: flex;
    align-items: center;
    margin-top: 10px;
    border-radius: 8px;
    transition: all 0.2s;
    padding: 5px;
    &:hover {
        background-color: #123212;
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

export const PlaylistList = () => {
    const playlists = useRecoilValue(playlistList);
    return (
        <Container>
            {playlists.map((playlist) => {
                return (
                    <List>
                        <ListImg src={undefined || '/logo512.png'} />
                        <ListInfo>
                            <ListTitle>{playlist.title}</ListTitle>
                            <ListType>플레이리스트</ListType>
                        </ListInfo>
                    </List>
                );
            })}
        </Container>
    );
};
