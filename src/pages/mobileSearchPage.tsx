import styled from 'styled-components';
import { SearchInput } from '../components/searchForm/searchInput';

const Container = styled.div`
    background-color: black;
    width: 100%;
`;
const Wrap = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: auto;
`;
const Title = styled.h1`
    font-size: 20px;
    margin-bottom: 20px;
`;

export const SearchPage = () => {
    return (
        <Container>
            <Wrap>
                <Title>검색하기</Title>
                <SearchInput />
            </Wrap>
        </Container>
    );
};
