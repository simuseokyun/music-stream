import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { searchFormState } from '../../state/atoms';
import { Link } from 'react-router-dom';

const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
`;
const Wrap = styled.div`
    width: 80%;
    max-width: 500px;
    margin: auto;
`;
const NavList = styled.ul`
    display: flex;
`;
const NavItem = styled.li`
    flex: 1;
    text-align: center;
    padding: 10px;
    a {
        font-size: 12px;
    }
`;

export const BottomBar = () => {
    const navList = [
        { text: '홈', url: '/home' },
        { text: '검색', url: '/search' },
        { text: '보관함', url: '/home/library' },
    ];
    return (
        <Container>
            <Wrap>
                <NavList>
                    {navList.map((list, index) => {
                        return (
                            <NavItem key={index}>
                                <Link to={list.url}>{list.text}</Link>
                            </NavItem>
                        );
                    })}
                </NavList>
            </Wrap>
        </Container>
    );
};
