import styled from 'styled-components';
import { selectPlaylist, playerTracks, playerTracksStorage } from '../../store/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useCallback } from 'react';
import { MyPlaylistInfo } from '../../components/myPlaylistForm/myPlaylistInfo';
import { Message } from '../../styles/common.style';
import { MyPlaylistTrackTable } from '../../components/myPlaylistForm/myPlaylistTrackTable';
import { Button } from '../../components/common/buttonForm/Button';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
    margin-bottom: 100px;
    @media (max-width: 768px) {
        margin-top: 60px;
        padding: 0 20px 20px;
        background-color: black;
    }
`;
const Wrap = styled.div`
    position: relative;
    border-radius: 8px;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const PlaylistBot = styled.div`
    width: 100%;

    text-align: center;
`;

export const MyPlaylist = () => {
    const playlist = useRecoilValue(selectPlaylist);
    const navigate = useNavigate();
    const setStorageTracks = useSetRecoilState(playerTracksStorage);
    const updatePlayerTracks = () => {
        if (playlist?.tracks.length) {
            const tracks = playlist.tracks.map((track) => ({
                trackUri: track.uri,
                title: track.title,
                name: track.artists[0].name,
                cover: track.cover,
            }));
            setStorageTracks(tracks);
        }
    };
    useEffect(() => {
        updatePlayerTracks();
    }, [playlist]);

    const openSearchForm = () => {
        navigate('/search');
    };
    if (!playlist) {
        return <Message style={{ marginTop: '30px' }}>존재하지 않는 플레이리스트 입니다</Message>;
    }
    const { title, cover, top, tracks, id } = playlist;

    return (
        <Container>
            <Wrap>
                <MyPlaylistInfo cover={cover} name={title} length={tracks.length} top={top} />
                <PlaylistBot>
                    {tracks.length ? (
                        <MyPlaylistTrackTable tracks={tracks} playlistId={id} />
                    ) : (
                        <>
                            <Message style={{ marginTop: '30px' }}>플레이리스트에 곡을 추가해주세요</Message>
                            <Button
                                bgColor="white"
                                text="곡 추가하기"
                                padding="4px 8px"
                                margin="15px 0 0"
                                fontSize="16px"
                                onClick={openSearchForm}
                            />
                        </>
                    )}
                </PlaylistBot>
            </Wrap>
        </Container>
    );
};
