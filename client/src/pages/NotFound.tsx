import styled from 'styled-components';
import { GlobalStyle } from '../styles/global.style';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20px;
    background-color: #131212;
`;
const ErrorMessage = styled.h1`
    font-size: 36px;
    color: white;
`;

export const NotFound = () => {
    return (
        <>
            <GlobalStyle />
            <Container>
                <ErrorMessage>Not found</ErrorMessage>
            </Container>
        </>
    );
};
