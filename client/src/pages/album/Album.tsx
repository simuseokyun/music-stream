import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { getAlbum } from '../../api/getInfo';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { IGetAlbumData } from '../../types/albumInfo';
import { Message, LoadingWrap, Loading } from '../../styles/common.style';
import { TrackList } from '../../components/album/AlbumTrackList';
import { playerTracksStorage } from '../../store/atoms';
import { RequiredLoginAlert } from '../../components/common/RequiredLoginAlert';
import { RequiredPlaylist } from '../../components/common/RequiredPlaylistAlert';
import { AlbumCover } from '../../components/album/AlbumCover';
import { AlbumTab } from '../../components/album/AlbumTab';
import { AlbumInfo } from '../../components/album/AlbumInfo';
import { AlbumCopyright } from '../../components/album/AlbumCopyright';

const Container = styled.div`
    background-color: #131212;
    border-radius: 8px;
    @media (max-width: 768px) {
        margin-top: 60px;
        overflow-y: scroll;
        background-color: black;
    }
`;

const Wrap = styled.div`
    position: relative;
    background: linear-gradient(180deg, #666633, #111111);
    display: flex;
    align-items: end;
    padding: 20px;
    border-radius: 8px 8px 0 0;
    @media (max-width: 768px) {
        background: black;
        width: 100%;
    }
    @media (max-width: 425px) {
        display: block;
    }
`;
const Description = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 10px 0 0;
    }
`;

const TableWrap = styled.div`
    background: #131212;
    padding: 0 20px 100px 20px;
    @media (max-width: 768px) {
        background: black;
        padding: 0 20px 150px 20px;
    }
`;

export const Album = () => {
    const { albumId } = useParams();
    const token = getLocalStorage('webAccessToken');
    const setStorageTracks = useSetRecoilState(playerTracksStorage);

    const {
        isLoading,
        data: albumData,
        isError,
    } = useQuery<IGetAlbumData | null>({
        queryKey: ['albumInfo', albumId],
        queryFn: async () => {
            if (token && albumId) {
                return await getAlbum(token, albumId);
            }
            return null;
        },
        enabled: !!token && !!albumId, // 필요할 경우에만 실행
        // onSuccess: (data) => {
        //     if (data?.tracks?.items) {
        //         const tracks = data.tracks.items.map((track) => ({
        //             trackUri: track.uri,
        //             title: track.name,
        //             name: track.artists[0].name,
        //             cover: data.images[0].url,
        //         }));
        //         setStorageTracks(tracks);
        //     }
        // },
    });

    if (isLoading) {
        return (
            <LoadingWrap>
                <Loading src="/assets/loading.png" />
            </LoadingWrap>
        );
    }
    if (isError) {
        return <Message>에러 발생</Message>;
    }
    if (!albumData) {
        return <Message>앨범 데이터가 없습니다</Message>;
    }

    console.log(albumData);
    const { id, name, artists, images, total_tracks, album_type, release_date, copyrights } = albumData;
    return (
        <Container>
            {/* <RequiredLoginAlert />
            <RequiredPlaylist /> */}
            <Wrap>
                <AlbumCover cover={images[0].url} />
                <Description>
                    <AlbumInfo
                        title={name}
                        artist={artists[0]}
                        type={album_type}
                        year={release_date}
                        trackLength={total_tracks}
                    />
                    <AlbumTab title={name} artist={artists[0].name} cover={images[0].url} id={id} />
                </Description>
            </Wrap>
            <TableWrap>
                <TrackList data={albumData} />
                <AlbumCopyright copyright={copyrights[0].text} />
            </TableWrap>
        </Container>
    );
};
