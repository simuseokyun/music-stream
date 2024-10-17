import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/common/buttonForm/button';

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
            <Button
                fontSize="16px"
                margin="10px 0 0 0 "
                padding="4px 8px"
                text="입장하기"
                bgColor="#65d46e"
                onClick={navigateHome}
            />
        </Container>
    );
};
