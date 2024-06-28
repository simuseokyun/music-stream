import styled from 'styled-components';
import { selectPlaylist, playerTracks } from '../state/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { MyPlaylistInfo } from '../components/myPlaylistForm/myPlaylistInfo';
import { Message } from '../styles/common.style';
import { MyPlaylistTrackTable } from '../components/myPlaylistForm/myPlaylistTrackTable';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
    margin-bottom: 100px;
    @media (max-width: 768px) {
        background-color: black;
        padding: 10px;
    }
`;
const PlaylistWrap = styled.div`
    position: relative;
    border-radius: 8px;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const PlaylistBot = styled.div`
    height: 500px;
    width: 100%;
    overflow-y: scroll;
    @media (max-width: 768px) {
        height: 300px;
    }
`;

export const MyPlaylistPage = () => {
    const playlist = useRecoilValue(selectPlaylist);
    const setPlayerTracks = useSetRecoilState(playerTracks);
    useEffect(() => {
        if (playlist) {
            const trackSummaries = playlist.tracks.map((track) => ({
                uri: track.uri,
                title: track.title,
                name: track.artists[0].name,
                cover: track.cover,
            }));
            setPlayerTracks(trackSummaries);
        }
    }, []);

    return (
        <Container>
            {playlist ? (
                <PlaylistWrap>
                    <MyPlaylistInfo
                        cover={playlist.cover}
                        name={playlist.title}
                        length={playlist.tracks.length}
                        top={playlist.top}
                    />
                    <PlaylistBot>
                        {playlist.tracks.length ? (
                            <MyPlaylistTrackTable tracks={playlist.tracks} playlist_id={playlist.id} />
                        ) : (
                            <Message>플레이리스트에 곡을 추가해주세요</Message>
                        )}
                    </PlaylistBot>
                </PlaylistWrap>
            ) : (
                <Message>존재하지 않는 플레이리스트 입니다</Message>
            )}
        </Container>
    );
};
