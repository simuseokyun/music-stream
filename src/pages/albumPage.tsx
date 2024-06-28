import { useParams } from 'react-router-dom';
import { playerTracks, typeTransform } from '../state/atoms';
import { useQuery } from 'react-query';
import { getAlbum } from '../api/api';
import { getLocalStorage } from '../utils/util';
import styled from 'styled-components';
import { IAlbumInfo } from '../types/albumInfo';
import { Message } from '../styles/common.style';
import { AlbumInfo } from '../components/albumForm/albumInfo';
import { AlbumTrackList } from '../components/albumForm/albumTrackList';
import { useSetRecoilState } from 'recoil';

const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    z-index: 3;
`;
const AlbumWrap = styled.div`
    background: linear-gradient(90deg, black 0%, #392f31);
    width: 90%;
    max-width: 860px;
    height: 80vh;
    position: relative;
    border-radius: 8px;
    padding-bottom: 100px;
    overflow-y: scroll;
    @media (max-width: 768px) {
        width: 100%;
        height: 100vh;
        background: black;
    }
`;
const TrackListsWrap = styled.div`
    padding: 0 20px 20px 20px;
`;

const Copyright = styled.p`
    font-size: 12px;
    padding-top: 20px;
    color: #e2e2e2;
`;

export const AlbumPage = () => {
    const { albumId } = useParams();
    const token = getLocalStorage('webAccessToken');
    const setPlayerTracks = useSetRecoilState(playerTracks);
    const {
        isLoading: albumLoading,
        data: albumData,
        isError,
    } = useQuery<IAlbumInfo>(
        ['albumInfo', albumId],
        () => {
            if (token && albumId) {
                return getAlbum(token, albumId);
            }
            return Promise.resolve(null);
        },
        {
            onSuccess: (data) => {
                if (data && data.tracks && data.tracks.items) {
                    const trackSummaries = data.tracks.items.map((track) => ({
                        uri: track.uri,
                        title: track.name,
                        name: track.artists[0].name,
                        cover: data.images[0].url,
                    }));
                    setPlayerTracks(trackSummaries);
                }
            },
        }
    );

    if (albumLoading) {
        return <Message>로딩 중</Message>;
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    return (
        <Container>
            {albumData && (
                <AlbumWrap key={albumData?.id}>
                    <AlbumInfo
                        id={albumData?.id}
                        name={albumData?.name}
                        artist={albumData?.artists[0]}
                        cover={albumData?.images[0].url}
                        type={albumData?.album_type === 'single' ? typeTransform.single : typeTransform.album}
                        year={albumData?.release_date.slice(0, 4)}
                        trackLength={albumData?.total_tracks}
                    />
                    <TrackListsWrap>
                        <AlbumTrackList data={albumData} />
                        <Copyright>{albumData?.copyrights[0].text}</Copyright>
                    </TrackListsWrap>
                </AlbumWrap>
            )}
        </Container>
    );
};
