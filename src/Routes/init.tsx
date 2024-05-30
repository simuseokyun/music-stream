import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Logo = styled.img`
    width: 30%;
    max-width: 150px;
    margin-bottom: 20px;
`;
const LoginBtn = styled.button`
    padding: 5px 10px;
    background-color: #00ff00;
    border-radius: 15px;
    border: none;
    font-weight: 700;
`;

export const InitForm = () => {
    const navigate = useNavigate();
    const home = () => {
        navigate('/home');
    };

    return (
        <Container>
            <Logo src="/images/spotifyLogo.png" alt="Logo" />
            <LoginBtn onClick={home}>입장하기</LoginBtn>
        </Container>
    );
};
