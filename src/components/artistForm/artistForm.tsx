import { useQuery } from 'react-query';
import { getArtist, getArtistAlbum, getArtistTopTrack } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { setMobile, typeTransform } from '../../atoms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PopularTracks } from './popularTrack';
import { Link } from 'react-router-dom';
import { getTokenLocalStorage } from '../../util';

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
        uri: string;
    }[];
}
const Container = styled.div`
    width: 100%;
    padding: 20px;
    background: #131212;
    border-radius: 8px;
    overflow-x: hidden;
    margin-bottom: 100px;
    @media (max-width: 768px) {
        background: black;
        padding: 10px;
    }
`;
const TopWrap = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    @media (max-width: 425px) {
        height: 200px;
    }
`;
const Top = styled.div<{ img: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
    @media (max-width: 425px) {
        padding: 10px;
    }
`;
const Table = styled.table`
    width: 100%;
`;
const Thead = styled.thead`
    width: 100%;
`;
const Tr = styled.tr`
    width: 100%;
`;
const Th = styled.th`
    padding: 5px;
    &:first-child {
        width: 50px;
    }
    &:nth-child(2) {
        width: 80%;
        text-align: left;
    }
    &:nth-child(3) {
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        text-align: right;
    }
`;

const FirstTitle = styled.h1`
    font-size: 20px;
    font-weight: 700;
    margin: 30px 0 10px 0;
    @media (max-width: 425px) {
        font-size: 16px;
    }
`;
const SecondTitle = styled(FirstTitle)``;
const Name = styled.h1`
    font-size: 36px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 24px;
    }
    @media (max-width: 425px) {
        font-size: 20px;
    }
`;
const Follower = styled.span`
    font-size: 18px;
    margin-top: 10px;
    @media (max-width: 425px) {
        font-size: 14px;
    }
`;

const AlbumWrap = styled.ul<{ state: string }>`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ state }) => `repeat(${state === 'true' ? 3 : 4}, 1fr)`};

    @media (max-width: 768px) {
    }
`;
const AlbumList = styled.li`
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    padding: 10px;
    &:hover {
        background-color: #1a191a;
    }
    @media (max-width: 768px) {
        padding: 5px;
    }
`;
const AlbumImg = styled.img`
    width: 100%;
    border-radius: 8px;
`;
const TopTrackWrap = styled.tbody`
    width: 100%;
    tr {
        &:hover {
            background-color: #3e3d3d;
        }
    }
`;
const AllShow = styled.p`
    margin-bottom: 10px;
    text-align: right;
`;
const AlbumTitle = styled.h1`
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const AlbumReleaseWrap = styled.div`
    margin-top: 5px;
`;
const AlbumRelease = styled.span`
    color: rgb(160, 160, 160);
`;
const AlbumType = styled(AlbumRelease)`
    margin-left: 3px;
`;
export const ArtistForm = () => {
    const { artistId } = useParams();
    const navigate = useNavigate();
    const isMobile = useRecoilValue(setMobile);
    const token = getTokenLocalStorage('webAccessToken') || '';
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
    console.log(topTrackInfo);
    console.log(albumInfo);
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
                    <FirstTitle>인기 곡</FirstTitle>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
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
                                            uri={track.uri}
                                        />
                                    ))}
                        </TopTrackWrap>
                    </Table>
                    <SecondTitle>디스코그래피</SecondTitle>
                    <AllShow>
                        <Link to={`/home/allAlbum/${artistId}`}>모두 표시</Link>
                    </AllShow>
                    <AlbumWrap state={isMobile.toString()}>
                        {albumInfo &&
                            albumInfo.items.slice(0, isMobile ? 3 : 4).map((album) => (
                                <AlbumList key={album.id} onClick={() => navigate(`/home/album/${album.id}`)}>
                                    <AlbumImg src={album.images[0].url} />
                                    <AlbumTitle>{album.name}</AlbumTitle>
                                    <AlbumReleaseWrap>
                                        <AlbumRelease>{album.release_date.slice(0, 4)}</AlbumRelease>
                                        <AlbumType>
                                            {album.album_type === 'album' ? typeTransform.album : typeTransform.single}
                                        </AlbumType>
                                    </AlbumReleaseWrap>
                                </AlbumList>
                            ))}
                    </AlbumWrap>
                </Container>
            )}
        </>
    );
};
