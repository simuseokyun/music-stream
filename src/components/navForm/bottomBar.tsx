import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { searchFormState } from '../../state/atoms';
import { Link } from 'react-router-dom';

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
    flex: 1;
    text-align: center;
    font-size: 12px;
    padding: 20px 10px;
    a {
        font-size: 12px;
    }
`;

export const BottomBar = () => {
    const searchState = useSetRecoilState(searchFormState);
    const navList = [
        { text: '홈', url: '/home' },
        { text: '검색', url: '/search' },
        { text: '보관함', url: '/home/library' },
    ];
    return (
        <Container>
            <Wrap>
                <List>
                    {navList.map((list, index) => {
                        return (
                            <Item key={index}>
                                <Link to={list.url}>{list.text}</Link>
                            </Item>
                        );
                    })}
                </List>
            </Wrap>
        </Container>
    );
};
