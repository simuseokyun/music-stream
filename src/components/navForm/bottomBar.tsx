import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { openSearch } from '../../state/atoms';
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
const NavWrap = styled.div`
    margin: auto;
    max-width: 1180px;
    width: 70%;
`;
const NavList = styled.ul`
    display: flex;
`;
const NavItem = styled.li`
    font-size: 12px;
    padding: 20px 10px;
    text-align: center;
    flex: 1;
`;

export const BottomBar = () => {
    const searchState = useSetRecoilState(openSearch);
    const setSearch = () => {
        searchState((prev) => !prev);
    };
    return (
        <Container>
            <NavWrap>
                <NavList>
                    <NavItem>
                        <Link to="/home">홈</Link>
                    </NavItem>
                    <NavItem onClick={setSearch}>검색</NavItem>
                    <NavItem>
                        <Link to="/home/library">라이브러리</Link>
                    </NavItem>
                </NavList>
            </NavWrap>
        </Container>
    );
};
