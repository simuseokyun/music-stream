import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { typeTransform, alertState } from '../state/atoms';
import { useQuery } from 'react-query';
import { getAlbum } from '../api/api';
import { getLocalStorage } from '../utils/util';
import { IGetAlbumData } from '../types/albumInfo';
import { Message, LoadingWrap, Loading } from '../styles/common.style';
import { AlbumInfo } from '../components/albumForm/albumInfo';
import { TrackList } from '../components/albumForm/albumTrackList';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { playerTracksStorage } from '../state/atoms';
import { RequiredLoginAlert } from '../components/alertForm/requiredLoginAlert';
import { RequiredPlaylist } from '../components/alertForm/requiredPlaylistAlert';

const Container = styled.div`
    background-color: #131212;
    border-radius: 8px;
    @media (max-width: 768px) {
        margin-top: 60px;
        overflow-y: scroll;
        background-color: black;
    }
`;
const AlbumWrap = styled.div`
    height: inherit;
    border-radius: 8px;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const TrackListsWrap = styled.div`
    background: #131212;
    padding: 0 20px 100px 20px;
    @media (max-width: 768px) {
        background: black;
        padding: 0 20px 150px 20px;
    }
`;

const Copyright = styled.p`
    font-size: 12px;
    margin-top: 20px;
    color: #e2e2e2;
    @media (max-width: 768px) {
    }
`;

export const AlbumPage = () => {
    const { albumId } = useParams();
    const token = getLocalStorage('webAccessToken');
    const setStorageTracks = useSetRecoilState(playerTracksStorage);
    const alertFormState = useRecoilValue(alertState);

    const {
        isLoading: albumLoading,
        data: albumData,
        isError,
    } = useQuery<IGetAlbumData>(
        ['albumInfo', albumId],
        () => {
            if (token && albumId) {
                const albumData = getAlbum(token, albumId);
                return albumData;
            }

            return Promise.resolve(null);
        },
        {
            onSuccess: (data) => {
                if (data && data.tracks && data.tracks.items) {
                    const tracks = data.tracks.items.map((track) => ({
                        uri: track.uri,
                        title: track.name,
                        name: track.artists[0].name,
                        cover: data.images[0].url,
                        playTime: track.duration_ms,
                    }));
                    setStorageTracks(tracks);
                }
            },
        }
    );

    if (albumLoading) {
        return (
            <LoadingWrap>
                <Loading src="/images/loading.png" />
            </LoadingWrap>
        );
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    return (
        <Container>
            {alertFormState.requiredLogin && <RequiredLoginAlert />}
            {alertFormState.requiredPlaylist && <RequiredPlaylist />}
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
                        <TrackList data={albumData} />
                        <Copyright>{albumData?.copyrights[0].text}</Copyright>
                    </TrackListsWrap>
                </AlbumWrap>
            )}
        </Container>
    );
};
