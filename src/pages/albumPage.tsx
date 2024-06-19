import { useParams } from 'react-router-dom';
import { typeTransform } from '../state/atoms';
import { useQuery } from 'react-query';
import { getAlbum } from '../api/api';
import { getLocalStorage } from '../utils/util';
import styled from 'styled-components';
import { IAlbumInfo } from '../types/albumInfo';
import { Message } from '../styles/common.style';
import { AlbumInfo } from '../components/albumForm/albumInfo';
import { AlbumTrackList } from '../components/albumForm/albumTrackList';

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
    padding: 50px 0;
    box-sizing: border-box;
    z-index: 3;
`;
const AlbumWrap = styled.div`
    width: 90%;
    max-width: 860px;
    height: 700px;
    position: relative;
    border-radius: 8px;
    overflow-y: scroll;
`;
const TrackListsWrap = styled.div`
    padding: 20px;
    background: linear-gradient(90deg, black 0%, #392f31);
`;

const Copyright = styled.p`
    font-size: 12px;
    padding-top: 20px;
    color: #e2e2e2;
`;

export const AlbumPage = () => {
    const { albumId } = useParams();
    const token = getLocalStorage('webAccessToken');
    const {
        isLoading: albumLoading,
        data: albumData,
        isError,
    } = useQuery<IAlbumInfo>('albumInfo', () => {
        if (token && albumId) {
            return getAlbum(token, albumId);
        }
        return Promise.resolve(null);
    });

    if (albumLoading) {
        return <Message>로딩 중</Message>;
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    return (
        <Container>
            {albumData && (
                <AlbumWrap>
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
