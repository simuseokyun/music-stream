import React from 'react';
import { useQuery } from 'react-query';
import { Header } from './components/header';
import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { SideBar } from './components/sideBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AddPlaylistForm } from './components/addplaylistForm';
import { addPlaylistState, playlistList } from './atoms';

const GlobalStyle = createGlobalStyle`

    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
    background-color: rgba(0,0,0,0.95);
    color:white
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
    th, td {
  text-align: center; /* 텍스트를 가운데 정렬 */
  vertical-align: middle; /* 셀 내의 요소를 수직으로 가운데 정렬 */
}
 
}
img{
    display:block;
}
a { 
    text-decoration:none;
    color:White;
    &:hover{
        text-decoration: underline;
    }
}
*{
    box-sizing: border-box;
}


`;
const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
`;

function Root() {
    const openPlaylist = useRecoilValue(addPlaylistState);
    return (
        <>
            <GlobalStyle />
            <div style={{ maxWidth: 1180, margin: 'auto' }}>
                {openPlaylist && <AddPlaylistForm />}
                <Header />
                <Container>
                    <SideBar></SideBar>
                    <Outlet />
                </Container>
            </div>
        </>
    );
}

export default Root;
