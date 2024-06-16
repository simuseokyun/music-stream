import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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
	font-size: 14px;;
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
     font-style: normal;
     font-weight: 400;
	vertical-align: baseline;
    @media (max-width:425px) {
        font-size:12px;
    }
     &::-webkit-scrollbar {
        display: none;
    }
}
img {
    -webkit-tap-highlight-color: transparent; 
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
    background-color:black;
    color:white;
  
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
  text-align: center;
  vertical-align: middle; 
}
 
}
img{
    display:block;
}
a { 
    text-decoration:none;
    color:white;
}
*{
    box-sizing: border-box;
}
input[type="file" i] span{
 display:none
}
`;
