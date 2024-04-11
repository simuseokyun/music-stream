import { useQuery } from 'react-query';
import { getArtist, getArtistAlbum, getArtistTopTrack } from '../api';
import { useParams } from 'react-router-dom';
import { tokenValue, typeTransform } from '../atoms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { msTransform } from '../api';
interface IArtist {
    images: { height: number; width: number; url: string }[];
    id: string;
    name: string;
    popularity: number;
    followers: { total: number };
}
interface IAlbum {
    items: { id: string; name: string; album_type: string; images: { url: string }[]; release_date: string }[];
    next: string;
    offset: number;
}
interface ITopTracks {
    tracks: { id: string; name: string; duration_ms: number; album: { images: { url: string }[]; name: string } }[];
}
const Container = styled.div`
    padding: 20px;
    background: #131212;
    border-radius: 8px;
`;
const TopWrap = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
`;
const Top = styled.div<{ img: string }>`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    background-image: url(${(props) => props.img});
    background-position: center;
    background-size: cover;
    opacity: 0.7;
`;
const TopOverlay = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 20px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;
const Name = styled.h1`
    font-size: 70px;
    font-weight: 700;
`;
const Follower = styled.span`
    margin-top: 20px;
`;

const AlbumWrap = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;
const AlbumList = styled.li`
    width: 100%;
`;
const AlbumImg = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 8px;
`;
const TopTrackWrap = styled.tbody``;
const TopTrackList = styled.tr``;
const TopTrackTitle = styled.p``;
const TrackImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 8px;
`;
const AlbumTitle = styled.h1``;
const AlbumRelease = styled.span``;
const AlbumType = styled.span``;
export const ArtistForm = () => {
    const { artistId } = useParams();
    const token = useRecoilValue(tokenValue);
    const commaSeparate = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const { isLoading: artistLoading, data: artistInfo } = useQuery<IArtist>(['artist', artistId], async () =>
        getArtist(token, artistId!)
    );
    const { isLoading: albumLoading, data: albumInfo } = useQuery<IAlbum>(['album', artistId], async () =>
        getArtistAlbum(token, artistId!)
    );
    const { isLoading: topTrackLoading, data: topTrackInfo } = useQuery<ITopTracks>(['topTrack', artistId], async () =>
        getArtistTopTrack(token, artistId!)
    );

    const isLoading = artistLoading || albumLoading || topTrackLoading;

    return (
        <>
            {isLoading ? (
                'Loading...'
            ) : (
                <Container>
                    <TopWrap>
                        <Top img={artistInfo?.images[0].url!}></Top>
                        <TopOverlay>
                            <Name>{artistInfo?.name}</Name>
                            <Follower>팔로워 : {commaSeparate(artistInfo?.followers.total!)}명</Follower>
                        </TopOverlay>
                    </TopWrap>
                    <h1>인기 곡</h1>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>제목</th>
                                <th>앨범</th>
                                <th>재생 시간</th>
                            </tr>
                        </thead>
                        <TopTrackWrap>
                            {topTrackInfo &&
                                topTrackInfo?.tracks.slice(0, 5).map((track, i) => (
                                    <TopTrackList>
                                        <td>{i + 1}</td>
                                        <td>
                                            <div style={{ display: 'flex' }}>
                                                <TrackImg src={track.album.images[0].url} alt="album_cover" />
                                                <p>{track.name}</p>
                                            </div>
                                        </td>
                                        <td>{track.album.name}</td>
                                        <td>{`${msTransform(track.duration_ms).minutes}:${
                                            String(msTransform(track.duration_ms).seconds).length === 1
                                                ? `0${msTransform(track.duration_ms).seconds}`
                                                : msTransform(track.duration_ms).seconds
                                        }`}</td>
                                    </TopTrackList>
                                ))}
                        </TopTrackWrap>
                    </table>
                    <h1>디스코그래피</h1>
                    <select name="" id="">
                        <option value="">모두</option>
                        <option value="">앨범</option>
                        <option value="">싱글 및 EP</option>
                    </select>
                    <AlbumWrap>
                        {albumInfo &&
                            albumInfo.items.slice(0, 4).map((album) => (
                                <AlbumList key={album.id}>
                                    <AlbumImg src={album.images[0].url} />
                                    <AlbumTitle>{album.name}</AlbumTitle>
                                    <AlbumRelease>{album.release_date.slice(0, 4)}</AlbumRelease>
                                    <AlbumType>
                                        {album.album_type === 'album'
                                            ? typeTransform.album
                                            : album.album_type === 'single'
                                            ? typeTransform.single
                                            : typeTransform.ep}
                                    </AlbumType>
                                </AlbumList>
                            ))}
                        <button>이전</button>
                        <button
                            onClick={
                                isLoading
                                    ? () => {
                                          console.log(1);
                                      }
                                    : async () => {
                                          const response = await fetch(albumInfo?.next!);
                                          const json = await response.json();
                                          return json;
                                      }
                            }
                        >
                            다음
                        </button>
                    </AlbumWrap>
                </Container>
            )}
        </>
    );
};
