import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { deviceInfo, openSearch } from '../../state/atoms';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginSpotify, logout } from '../../utils/util';

const SideBarWrap = styled.div`
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: sticky;
    top: 0px;
    @media (max-width: 768px) {
        display: none;
    }
`;
const SideBarTop = styled.ul`
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
const TopList = styled.li`
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
    const accessToken = Cookies.get('accessToken');
    const searchState = useSetRecoilState(openSearch);
    const setDevice = useSetRecoilState(deviceInfo);
    const navigate = useNavigate();
    const logoutSpotify = () => {
        logout();
        setDevice(null);
    };
    const setSearch = () => {
        searchState((prev) => {
            return !prev;
        });
    };
    const onBackBtn = () => {
        navigate(-1);
    };

    return (
        <SideBarWrap>
            <SideBarTop>
                <BackBtn src="/images/leftArrow.png" onClick={onBackBtn}></BackBtn>
                <TopList>
                    <Link to="/home">홈</Link>
                </TopList>
                <TopList onClick={setSearch}>검색하기</TopList>
                <TopList>
                    <Link to="/home/library">내 라이브러리</Link>
                </TopList>
                {accessToken ? (
                    <TopList onClick={logoutSpotify}>로그아웃</TopList>
                ) : (
                    <TopList onClick={loginSpotify}>로그인</TopList>
                )}
            </SideBarTop>
        </SideBarWrap>
    );
};
