import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { searchFormState } from '../../state/atoms';
import { loginSpotify, useLogoutSpotify, getLocalStorage } from '../../utils/util';

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
    background-color: white;
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 24px;
`;
const Item = styled.li`
    margin-top: 20px;
    font-size: 18px;
    cursor: pointer;
    &:first-child {
        margin-bottom: 20px;
    }
    a {
        font-size: 18px;
    }
`;

export const SideBar = () => {
    const accessToken = getLocalStorage('sdkAccessToken');
    const searchState = useSetRecoilState(searchFormState);
    const navigate = useNavigate();
    const { logoutSpotify } = useLogoutSpotify();

    const setSearch = () => {
        searchState((prev) => !prev);
    };
    const onBackBtn = () => {
        navigate(-1);
    };

    return (
        <Container>
            <List>
                <BackBtn src="/images/leftArrow.png" onClick={onBackBtn}></BackBtn>
                <Item>
                    <Link to="/home">홈</Link>
                </Item>
                <Item onClick={setSearch}>검색하기</Item>
                <Item>
                    <Link to="/home/library">내 라이브러리</Link>
                </Item>
                {accessToken ? (
                    <Item onClick={logoutSpotify}>로그아웃</Item>
                ) : (
                    <Item onClick={loginSpotify}>로그인</Item>
                )}
            </List>
        </Container>
    );
};
