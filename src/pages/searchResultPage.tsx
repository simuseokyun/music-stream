import { useQuery } from 'react-query';
import styled from 'styled-components';
import { searchTrack } from '../api/api';
import { SearchTrackItem } from '../components/searchResultForm/searchResultItem';
import { getLocalStorage } from '../utils/util';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ISearchTracks } from '../types/searchTracksInfo';
import { alertState, playerTracksStorage } from '../state/atoms';
import { Message, Th, Tr, Table, Thead, Tbody, LoadingWrap, Loading } from '../styles/common.style';
import { useParams } from 'react-router-dom';
import { playerTracks } from '../state/atoms';
import { RequiredLoginAlert } from '../components/alertForm/requiredLoginAlert';
import { RequiredPlaylist } from '../components/alertForm/requiredPlaylistAlert';

const Container = styled.div`
    background-color: #131212;
    padding: 20px 20px 100px;
    border-radius: 8px;
    @media (max-width: 768px) {
        margin-top: 60px;
        background-color: black;
        padding-bottom: 120px;
    }
`;
const ResultMessage = styled.h1`
    font-size: 20px;
    font-weight: 700;
    margin: 10px;
`;

export const SearchResultPage = () => {
    const { title } = useParams();
    const token = getLocalStorage('webAccessToken');
    const alertFormState = useRecoilValue(alertState);
    // const setPlayerTracks = useSetRecoilState(playerTracks);
    const setStorageTracks = useSetRecoilState(playerTracksStorage);
    const {
        isLoading: trackLoading,
        data: trackData,
        isError,
    } = useQuery<ISearchTracks>(
        ['searchResult', title],
        async () => {
            if (token && title) {
                const searchTracks = await searchTrack(token, title);
                return searchTracks;
            } else {
                return Promise.resolve(null);
            }
        },
        {
            onSuccess: (data) => {
                if (data && data.tracks && data.tracks.items) {
                    const addTracks = data.tracks.items.map((track) => ({
                        uri: track.uri,
                        title: track.name,
                        name: track.album.artists[0].name,
                        cover: track.album.images[0]?.url,
                        playTime: track.duration_ms,
                    }));
                    setStorageTracks(addTracks);
                }
            },
        }
    );
    if (trackLoading) {
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
            {/* {alertFormState.requiredLogin && <RequiredLoginAlert />}
            {alertFormState.requiredPlaylist && <RequiredPlaylist />} */}
            <ResultMessage>{title ? `"${title}"에 대한 검색결과` : '검색 결과가 없습니다'}</ResultMessage>
            <Table>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {trackData?.tracks?.items?.map((item) => {
                        return (
                            <SearchTrackItem
                                key={item.id}
                                id={item.id}
                                cover={item.album.images[0].url}
                                title={item.name}
                                artists={item.album.artists}
                                album_id={item.album.id}
                                album_title={item.album.name}
                                duration_ms={item.duration_ms}
                                uri={item.uri}
                            />
                        );
                    })}
                </Tbody>
            </Table>
        </Container>
    );
};
