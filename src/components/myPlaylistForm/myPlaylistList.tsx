import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { playlistList } from '../../state/atoms';
import { Message } from '../../styles/common.style';
import { MyPlaylistItem } from './myPlaylistItem';
import { useEffect } from 'react';

const Container = styled.ul`
    width: 100%;
`;

export const MyPlaylistList = () => {
    const playlists = useRecoilValue(playlistList);

    return (
        <Container>
            {playlists.length ? (
                playlists.map((playlist) => {
                    return (
                        <MyPlaylistItem
                            key={playlist.id}
                            id={playlist.id}
                            cover={playlist.cover ? playlist.cover : '/images/basicPlaylist.png'}
                            top={playlist.top && playlist.top}
                            name={playlist.title}
                        />
                    );
                })
            ) : (
                <Message>목록이 없습니다</Message>
            )}
        </Container>
    );
};
