import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { deviceInfo, openSearch } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginSpotify } from '../../util';

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
    /* height: 100px; */
    background-color: #131212;
    border-radius: 8px;
    width: 100%;
    /* display: flex; */
    flex-direction: column;
    justify-content: center;
    padding: 20px;
`;
const BackBtn = styled.span`
    background-color: rgb(40, 40, 40);
    padding: 5px;
    font-size: 20px;
    border-radius: 20px;
`;
const TopList = styled.li`
    margin-top: 20px;
    font-size: 18px;
    &:first-child {
        margin-bottom: 20px;
    }
`;

export const SideBar = () => {
    const accessToken = Cookies.get('accessToken');
    const searchState = useSetRecoilState(openSearch);
    const setDevice = useSetRecoilState(deviceInfo);
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setDevice(null);
        navigate('/');
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
                <BackBtn className="material-symbols-outlined" onClick={onBackBtn}>
                    arrow_back_ios_new
                </BackBtn>
                <TopList>
                    <Link to="/home">홈</Link>
                </TopList>
                <TopList onClick={setSearch}>검색하기</TopList>
                <TopList>
                    <Link to="/home/library">내 라이브러리</Link>
                </TopList>
                {accessToken ? (
                    <TopList onClick={logout}>로그아웃</TopList>
                ) : (
                    <TopList onClick={loginSpotify}>로그인</TopList>
                )}
            </SideBarTop>
        </SideBarWrap>
    );
};
