import { useQuery } from 'react-query';
import styled from 'styled-components';
import { searchTrack } from '../api/api';
import { SearchTrackItem } from '../components/searchResultForm/searchResultItem';
import { getLocalStorage } from '../utils/util';
import { ISearchTracks } from '../types/searchTracksInfo';
import { Message } from '../styles/common.style';
import { useParams } from 'react-router-dom';

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
const Table = styled.table`
    width: 100%;
    vertical-align: middle;
`;
const Thead = styled.thead`
    width: 100%;
`;
const Tbody = styled.tbody`
    width: 100%;
`;
const Tr = styled.tr`
    width: 100%;
`;
const Th = styled.th`
    padding: 5px 0;
    &:first-child {
        width: 6%;
        text-align: left;
        @media (max-width: 768px) {
            width: 100px;
        }
    }

    &:nth-child(2) {
        width: 50%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            width: 80%;
        }
    }
    &:nth-child(3) {
        width: 30%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 10%;
    }
`;

export const SearchPage = () => {
    const { title } = useParams();
    const token = getLocalStorage('webAccessToken');
    const { isLoading: trackLoading, data: trackData } = useQuery<ISearchTracks>(['searchResult', title], async () => {
        if (token && title) {
            const trackData = await searchTrack(token, title);
            return trackData;
        }
    });
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
