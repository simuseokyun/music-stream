import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/buttonForm/button';

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

export const InitPage = () => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/home');
    };

    return (
        <Container>
            <Logo src="/images/spotifyLogo.png" alt="Logo" />
            <Button margin="10px 0 0 0 " text="입장하기" bgColor="#65d46e" onClick={navigateHome} />
        </Container>
    );
};
