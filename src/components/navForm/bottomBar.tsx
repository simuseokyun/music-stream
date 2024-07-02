import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { searchFormState } from '../../state/atoms';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
const Container = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
`;
const Wrap = styled.div`
    margin: auto;
    max-width: 1180px;
    width: 80%;
`;
const List = styled.ul`
    display: flex;
`;
const Item = styled.li`
    font-size: 12px;
    padding: 20px 10px;
    text-align: center;
    flex: 1;
`;

export const BottomBar = () => {
    const searchState = useSetRecoilState(searchFormState);
    const setSearch = () => {
        searchState((prev) => !prev);
    };
    return (
        <Container>
            <Wrap>
                <List>
                    <Item>
                        <Link to="/home">홈</Link>
                    </Item>
                    <Item onClick={setSearch}>검색</Item>
                    <Item>
                        <Link to="/home/library">라이브러리</Link>
                    </Item>
                </List>
            </Wrap>
        </Container>
    );
};
