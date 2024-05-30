import { useParams } from 'react-router-dom';
import { clickMenuAlbum, clickMenuPlaylist, saveAlbumList, typeTransform } from '../../atoms';
import { useQuery } from 'react-query';
import { getAlbum } from '../../api';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { TrackList } from './albumTrackList';
import { getTokenLocalStorage } from '../../util';
interface IAlbum {
    album_type: string;
    images: { height: number; url: string; width: number }[];
    artists: { id: string; name: string }[];
    name: string;
    release_date: string;
    total_tracks: number;
    tracks: {
        items: {
            id: string;
            name: string;
            track_number: number;
            duration_ms: number;
            uri: string;
            artists: { name: string; id: string }[];
        }[];
    };
    copyrights: { text: string }[];
    id: string;
}

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
    &::-webkit-scrollbar {
        display: none;
    }
`;
const AlbumTop = styled.div`
    display: flex;
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, #392f31);
    align-items: end;
    padding: 20px;
    @media (max-width: 425px) {
        display: block;
    }
`;
const AlbumImg = styled.img`
    width: 200px;
    border-radius: 8px;
    @media (max-width: 768px) {
        width: 150px;
    }
    @media (max-width: 425px) {
        margin: auto;
    }
`;
const AlbumInfo = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 10px 0 0 0;
    }
`;
const AlbumType = styled.p``;
const AlbumTitle = styled.h2`
    font-size: 40px;
    font-weight: 700;
    margin: 10px 0;
    @media (max-width: 768px) {
        font-size: 20px;
        margin: 5px 0;
    }
`;
const ArtistName = styled.span`
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
const ReleaseYear = styled.span`
    margin-left: 10px;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
const TotalTracks = styled(ReleaseYear)`
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const TrackListsWrap = styled.div`
    padding: 20px;
    background: linear-gradient(90deg, black 0%, #392f31);
`;
const TrackLists = styled.table`
    width: 100%;
    height: 100%;
    border-collapse: collapse;
`;

const Table = styled.table``;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr``;
const Th = styled.th`
    border-bottom: 1px solid #808080;
    padding: 10px 5px;
    &:first-child {
        width: 30px;
    }
    &:nth-child(2) {
        width: 80%;
        text-align: left;
        max-width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
const CloseBtn = styled.span`
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 25px;
    border-radius: 25px;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;
const CopyrightWrap = styled.div`
    padding: 20px 0;
`;
const Copyright = styled.p`
    font-size: 12px;
    color: #e2e2e2;
`;
const Btn = styled.button`
    font-size: 12px;
    text-align: center;
    background-color: #65d46e;
    border: none;
    border-radius: 20px;
    padding: 4px 8px;
    margin-top: 10px;
    vertical-align: middle;
`;
export const AlbumForm = () => {
    const navigate = useNavigate();
    const onClose = () => {
        navigate(-1);
    };

    const { albumId } = useParams();
    const token = getTokenLocalStorage('webAccessToken');
    const [albums, setAlbum] = useRecoilState(saveAlbumList);
    const clickPlaylistState = useSetRecoilState(clickMenuPlaylist);
    const clickAlbumState = useSetRecoilState(clickMenuAlbum);
    const { isLoading, data } = useQuery<IAlbum>([albumId], () => {
        if (token) {
            return getAlbum(token, albumId!);
        }
        return Promise.resolve(null);
    });

    const saveAlbum = () => {
        setAlbum((prev) => {
            return [
                ...prev,
                { img: data?.images[0].url, title: data?.name!, name: data?.artists[0].name!, id: albumId! },
            ];
        });
        clickAlbumState(true);
        clickPlaylistState(false);
    };
    const deleteAlbum = () => {
        setAlbum((prev) => {
            const newArr = prev.filter((saveAlbum) => {
                return saveAlbum.title !== data?.name;
            });
            return newArr;
        });
    };
    const saveAlbumState = [...albums].find((album) => {
        return album.title === data?.name;
    });

    return (
        <Container>
            {isLoading ? (
                <h1>로딩중 입니다</h1>
            ) : (
                <AlbumWrap>
                    <CloseBtn className="material-symbols-outlined" onClick={onClose}>
                        close
                    </CloseBtn>
                    <AlbumTop>
                        <AlbumImg src={data?.images[0].url} />
                        <AlbumInfo>
                            <AlbumType>
                                {data?.album_type === 'single' ? typeTransform.single : typeTransform.album}
                            </AlbumType>
                            <AlbumTitle>{data?.name}</AlbumTitle>
                            <ArtistName>
                                <Link to={`/home/artist/${data?.artists[0].id}`}>{data?.artists[0].name}</Link>
                            </ArtistName>
                            <ReleaseYear>{data?.release_date.slice(0, 4)}</ReleaseYear>
                            <TotalTracks>{data?.total_tracks}곡</TotalTracks>
                            {saveAlbumState ? (
                                <div>
                                    <Btn style={{ background: '#e2e2e2' }} onClick={deleteAlbum}>
                                        찜 해제
                                    </Btn>
                                </div>
                            ) : (
                                <div>
                                    <Btn onClick={saveAlbum}>앨범 찜하기</Btn>
                                </div>
                            )}
                        </AlbumInfo>
                    </AlbumTop>
                    <TrackListsWrap>
                        <TrackLists>
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
                            <Tbody>
                                {data?.tracks?.items.map((track, i) => (
                                    <TrackList
                                        key={track.id}
                                        album_title={data.name}
                                        cover={data.images[0].url}
                                        name={track.name}
                                        artists={track.artists}
                                        track_number={track.track_number}
                                        duration_ms={track.duration_ms}
                                        album_id={data.id}
                                        uri={track.uri}
                                    />
                                ))}
                            </Tbody>
                        </TrackLists>
                        <CopyrightWrap>{data?.copyrights[0].text}</CopyrightWrap>
                    </TrackListsWrap>
                </AlbumWrap>
            )}
        </Container>
    );
};
