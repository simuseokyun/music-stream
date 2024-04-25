import { useQuery } from 'react-query';
import { getArtist, getArtistAlbum, getArtistTopTrack } from '../api';
import { useParams } from 'react-router-dom';
import { tokenValue, typeTransform } from '../atoms';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { PopularTracks } from './artistForm/popularTrack';
import { Link } from 'react-router-dom';
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
    tracks: {
        id: string;
        name: string;
        duration_ms: number;
        album: { id: string; images: { url: string }[]; name: string };
        artists: { id: string; name: string }[];
    }[];
}
const Container = styled.div`
    width: 100%;
    padding: 20px;
    background: #131212;
    border-radius: 8px;
    position: relative;
`;
const TopWrap = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden;
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
const Table = styled.table`
    width: 100%;
`;
const Thead = styled.thead``;
const Tr = styled.tr``;

const Th = styled.th`
    &:first-child {
        width: 50px;
        padding: 10px 0;
    }
    &:nth-child(2) {
        width: 80%;
        text-align: left;
    }
    &:nth-child(3) {
    }
    &:nth-child(4) {
    }
`;

const FirstTitle = styled.h1`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
`;
const SecondTitle = styled(FirstTitle)`
    margin-top: 20px;
`;
const Name = styled.h1`
    font-size: 70px;
    font-weight: 700;
`;
const Follower = styled.span`
    margin-top: 20px;
`;

const AlbumWrap = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
`;
const AlbumList = styled.li`
    width: 100%;
    border-radius: 8px;
`;
const AlbumImg = styled.img`
    width: 100%;
    /* height: 200px; */
    border-radius: 8px;
`;
const TopTrackWrap = styled.tbody`
    tr {
        &:hover {
            background-color: #3e3d3d;
        }
    }
`;
// const SelectWrap = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 10px;
// `;
// const BtnWrap = styled.div``;
// const PrevBtn = styled.span`
//     background-color: #232323;
//     padding: 4px;
//     font-size: 20px;
//     border-radius: 20px;
// `;
// const NextBtn = styled(PrevBtn)`
//     margin-left: 10px;
// `;
const TopTrackList = styled.tr``;
const TopTrackTitle = styled.p``;
const TrackImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 8px;
`;
const TrackTitle = styled.p`
    margin-left: 10px;
`;
const AllShow = styled.p`
    margin-bottom: 10px;
    text-align: right;
`;
const AlbumTitle = styled.h1`
    margin-top: 10px;
    /* text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; */
`;
const AlbumReleaseWrap = styled.div`
    margin-top: 5px;
`;
const AlbumRelease = styled.span`
    color: rgb(160, 160, 160);
    font-size: 14px;
`;
const AlbumType = styled.span`
    color: rgb(160, 160, 160);
    margin-left: 3px;
    font-size: 14px;
`;
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
    console.log(albumInfo);
    const isLoading = artistLoading || albumLoading || topTrackLoading;

    return (
        <>
            {isLoading ? (
                'Loading...'
            ) : (
                <Container>
                    {/* <div style={{ position: 'fixed', width: '100%', height: '100vh', top: 0, background: 'red' }}></div> */}
                    <TopWrap>
                        <Top img={artistInfo?.images[0].url!}></Top>
                        <TopOverlay>
                            <Name>{artistInfo?.name}</Name>
                            <Follower>팔로워 : {commaSeparate(artistInfo?.followers.total!)}명</Follower>
                        </TopOverlay>
                    </TopWrap>
                    <FirstTitle>인기 곡</FirstTitle>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>제목</Th>
                                <Th>
                                    <span className="material-symbols-outlined">schedule</span>
                                </Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <TopTrackWrap>
                            {topTrackInfo &&
                                topTrackInfo?.tracks
                                    .slice(0, 5)
                                    .map((track, i) => (
                                        <PopularTracks
                                            key={track.id}
                                            i={i}
                                            cover={track.album.images[0].url}
                                            title={track.name}
                                            artists={track.artists}
                                            album_id={track.album.id}
                                            album_title={track.album.name}
                                            duration_ms={track.duration_ms}
                                        />
                                    ))}
                        </TopTrackWrap>
                    </Table>
                    <SecondTitle>디스코그래피</SecondTitle>
                    <AllShow>
                        <Link to="allAlbum">모두 표시</Link>
                    </AllShow>
                    <AlbumWrap>
                        {albumInfo &&
                            albumInfo.items.slice(0, 4).map((album) => (
                                <AlbumList key={album.id}>
                                    <AlbumImg src={album.images[0].url} />
                                    <AlbumTitle>{album.name}</AlbumTitle>
                                    <AlbumReleaseWrap>
                                        <AlbumRelease>{album.release_date.slice(0, 4)}</AlbumRelease>
                                        <AlbumType>
                                            {album.album_type === 'album'
                                                ? typeTransform.album
                                                : album.album_type === 'single'
                                                ? typeTransform.single
                                                : typeTransform.ep}
                                        </AlbumType>
                                    </AlbumReleaseWrap>
                                </AlbumList>
                            ))}
                        {/* <button>이전</button>
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
                        </button> */}
                    </AlbumWrap>
                    <Outlet />
                </Container>
            )}
        </>
    );
};
