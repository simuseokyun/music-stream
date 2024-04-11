import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { clickMenuAlbum, clickMenuPlaylist, saveAlbumList, tokenValue, typeTransform } from '../atoms';
import { useQuery } from 'react-query';
import { getAlbum } from '../api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { TrackList } from './trackList';
interface IAlbum {
    album_type: string;
    images: { height: number; url: string; width: number }[];
    artists: { id: string; name: string }[];
    name: string;
    release_date: string;
    total_tracks: number;
    tracks: {
        items: { name: string; track_number: number; duration_ms: number; artists: { name: string; id: string }[] }[];
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

const TrackListsWrap = styled.div`
    padding: 20px;
    background: linear-gradient(90deg, black 0%, #392f31);
`;
const TrackLists = styled.table`
    width: 100%;
    height: 100%;
    border-collapse: collapse;
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

export const AlbumForm = () => {
    const navigate = useNavigate();
    const onClose = () => {
        navigate(-1);
    };

    const { albumId } = useParams();
    const token = useRecoilValue(tokenValue);
    const [albums, setAlbum] = useRecoilState(saveAlbumList);
    const clickPlaylistState = useSetRecoilState(clickMenuPlaylist);
    const clickAlbumState = useSetRecoilState(clickMenuAlbum);

    const { isLoading, data } = useQuery<IAlbum>(['albumId', albumId], () => getAlbum(token, albumId!));

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
                'Loading...'
            ) : (
                <AlbumWrap>
                    <CloseBtn className="material-symbols-outlined" onClick={onClose}>
                        close
                    </CloseBtn>
                    <AlbumTop>
                        <AlbumImg src={data?.images[0].url} />
                        <AlbumInfo>
                            <p>
                                {data?.album_type === 'single'
                                    ? typeTransform.single
                                    : data?.album_type === 'ep'
                                    ? typeTransform.ep
                                    : typeTransform.album}
                            </p>
                            <AlbumTitle>{data?.name}</AlbumTitle>
                            <ArtistName>
                                <Link to={`/artist/${data?.artists[0].id}`}>{data?.artists[0].name}</Link>
                                {/* {data?.artists[0].name} */}
                            </ArtistName>
                            <ReleaseYear>{data?.release_date.slice(0, 4)}</ReleaseYear>
                            <TotalTracks>{data?.total_tracks}곡</TotalTracks>
                            {saveAlbumState ? (
                                <button onClick={deleteAlbum}>찜 해제</button>
                            ) : (
                                <button onClick={saveAlbum}>앨범 찜하기</button>
                            )}
                        </AlbumInfo>
                    </AlbumTop>
                    <TrackListsWrap>
                        <TrackLists>
                            <thead>
                                <tr style={{ padding: '5px 0', borderBottom: '1px solid #808080' }}>
                                    <th style={{ width: '10%', padding: '10px 0' }}>#</th>
                                    <th style={{ textAlign: 'left', padding: '10px 0' }}>제목</th>
                                    <th style={{ padding: '10px 0 ' }}>
                                        <span className="material-symbols-outlined">schedule</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.tracks.items.map((track, i) => (
                                    <TrackList
                                        key={track.name}
                                        album_title={data.name}
                                        cover={data.images[0].url}
                                        name={track.name}
                                        artists={track.artists}
                                        track_number={track.track_number}
                                        duration_ms={track.duration_ms}
                                        album_id={data.id}
                                    />
                                ))}
                            </tbody>
                        </TrackLists>
                        <CopyrightWrap>
                            {data?.copyrights.map((copyright) => (
                                <Copyright>{copyright.text}</Copyright>
                            ))}
                        </CopyrightWrap>
                    </TrackListsWrap>
                </AlbumWrap>
            )}
        </Container>
    );
};
