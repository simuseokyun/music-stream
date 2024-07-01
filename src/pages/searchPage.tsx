import { useQuery } from 'react-query';
import styled from 'styled-components';
import { searchTrack } from '../api/api';
import { SearchTrackItem } from '../components/searchResultForm/searchResultItem';
import { getLocalStorage } from '../utils/util';
import { useSetRecoilState } from 'recoil';
import { ISearchTracks } from '../types/searchTracksInfo';
import { Message, Th, Tr, Table, Thead, Tbody } from '../styles/common.style';
import { useParams } from 'react-router-dom';
import { playerTracks } from '../state/atoms';

const Container = styled.div`
    padding: 20px;
    margin-bottom: 140px;
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #131212;
    border-radius: 8px;
    @media (max-width: 768px) {
        background-color: black;
        padding: 10px;
        height: 100vh;
    }
`;
const ResultMessage = styled.h1`
    font-size: 20px;
    margin: 20px 0;
`;

export const SearchPage = () => {
    const { title } = useParams();
    const token = getLocalStorage('webAccessToken');
    const setPlayerTracks = useSetRecoilState(playerTracks);
    const { isLoading: trackLoading, data: trackData } = useQuery<ISearchTracks>(
        ['searchResult', title],
        async () => {
            if (token && title) {
                const searchTracks = await searchTrack(token, title);
                return searchTracks;
            }
        },
        {
            onSuccess: (data) => {
                if (data && data.tracks && data.tracks.items) {
                    const trackSummaries = data.tracks.items.map((track) => ({
                        uri: track.uri,
                        title: track.name,
                        name: track.album.artists[0].name || '',
                        cover: track.album.images[0]?.url || '',
                    }));
                    setPlayerTracks(trackSummaries);
                }
            },
        }
    );
    if (trackLoading) {
        return <Message>로딩 중</Message>;
    }
    return (
        <Container>
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
