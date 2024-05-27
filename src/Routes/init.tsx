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
const LoginBtn = styled.button`
    width: 80px;
    height: 30px;
    background-color: #00ff00;
    border-radius: 20px;
    border: none;
    font-weight: 700;
`;
const Logo = styled.img`
    width: 40%;
    max-width: 150px;
    margin-bottom: 20px;
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
