import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenValue } from '../atoms';
import { useQuery } from 'react-query';
import { getAlbum } from '../api';
import styled from 'styled-components';

interface IAlbum {
    images: { height: number; url: string; width: number }[];
    artists: { id: string; name: string }[];
    name: string;
    release_date: string;
    total_tracks: number;
    tracks: { items: { name: string; track_number: number; duration_ms: number }[] };
}

const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
`;
const AlbumWrap = styled.div`
    width: 1000px;
    height: 700px;
    margin: auto;
`;
const AlbumTop = styled.div`
    display: flex;
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, #392f31);
    align-items: end;
    padding: 20px;
`;
const AlbumImg = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 8px;
`;
const AlbumInfo = styled.div`
    margin-left: 20px;
`;

const AlbumTitle = styled.h2`
    font-size: 40px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const ArtistName = styled.span`
    font-weight: 700;
`;
const ReleaseYear = styled.span`
    margin-left: 10px;
`;
const RunningTime = styled(ReleaseYear)``;
const TotalTracks = styled(ReleaseYear)``;

const TrackLists = styled.table`
    background-color: black;
    padding: 20px;
    width: 100%;
    overflow-y: scroll;
`;
const TrackList = styled.tr`
    padding: 20px;
`;

export const AlbumForm = () => {
    const msTransform = (ms: number) => {
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        return { minutes, seconds };
    };

    const { albumId } = useParams();
    const token = useRecoilValue(tokenValue);

    const { isLoading, data } = useQuery<IAlbum>(['albumId', albumId], () => getAlbum(token, albumId!));
    console.log(data);
    return (
        <Container>
            {isLoading ? (
                'Loading...'
            ) : (
                <AlbumWrap>
                    <AlbumTop>
                        <AlbumImg src={data?.images[0].url} />
                        <AlbumInfo>
                            <p>앨범</p>
                            <AlbumTitle>{data?.name}</AlbumTitle>
                            <ArtistName>{data?.artists[0].name}</ArtistName>
                            <ReleaseYear>{data?.release_date.slice(0, 4)}</ReleaseYear>
                            <TotalTracks>{data?.total_tracks}곡</TotalTracks>
                            <RunningTime></RunningTime>
                        </AlbumInfo>
                    </AlbumTop>
                    <TrackLists>
                        <tr>
                            <th>#</th>
                            <th>제목</th>
                            <th>재생</th>
                            <th>러닝타임</th>
                        </tr>
                        {data?.tracks.items.map((track, i) => (
                            <TrackList key={track.name}>
                                <td>{track.track_number}</td>
                                <td>{track.name}</td>
                                <td>{`${msTransform(track.duration_ms).minutes}:${
                                    msTransform(track.duration_ms).seconds
                                }`}</td>
                            </TrackList>
                        ))}
                    </TrackLists>
                </AlbumWrap>
            )}
        </Container>
    );
};
