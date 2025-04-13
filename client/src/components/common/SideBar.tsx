import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { searchFormState } from '../../store/atoms';
import { loginSpotify } from '../../utils/util';
import { getLocalStorage } from '../../utils/getLocalStorage';
import { SearchInput } from '../searchForm/searchInput';
import { useLogout } from '../../hooks/useLogout';

const Container = styled.div`
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: sticky;
    top: 20px;
    @media (max-width: 768px) {
        display: none;
    }
`;
const List = styled.ul`
    background-color: #131212;
    border-radius: 8px;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
`;
const BackBtn = styled.img`
    background-color: rgba(255, 255, 255, 0.4);
    width: 22px;
    height: 22px;
    border-radius: 25px;
    padding: 4px;
    transition: all 0.2s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.7);
    }
`;
const Item = styled.li`
    margin-top: 20px;
    font-size: 16px;
    cursor: pointer;
    a {
        font-size: 16px;
    }
`;

export const SideBar = () => {
    const accessToken = getLocalStorage('sdkAccessToken');
    const searchState = useSetRecoilState(searchFormState);
    const navigate = useNavigate();
    const { logoutSpotify } = useLogout();

    const setSearch = () => {
        searchState((prev) => !prev);
    };
    const onClickBack = () => {
        navigate(-1);
    };
    const NavList = [
        { url: '/', text: 'Home' },
        { url: '/library', text: 'My Library' },
    ];

    return (
        <Container>
            <SearchInput />
            <List>
                <BackBtn src="/assets/leftArrow.png" onClick={onClickBack}></BackBtn>
                {NavList.map((nav) => {
                    return (
                        <Item key={nav.text} onClick={() => navigate(`${nav.url}`)}>
                            {nav.text}
                        </Item>
                    );
                })}

                {accessToken ? (
                    <Item onClick={logoutSpotify}>로그아웃</Item>
                ) : (
                    <Item onClick={loginSpotify}>로그인</Item>
                )}
            </List>
        </Container>
    );
};
