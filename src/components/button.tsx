import { click } from '@testing-library/user-event/dist/click';
import styled from 'styled-components';

interface IButton {
    text: string;
    state: boolean;
    onClick: () => void;
}

const Container = styled.button<{ state: boolean }>`
    /* display: inline-block; */
    background-color: ${(props) => (props.state ? 'white' : 'black')};
    color: ${(props) => (props.state ? 'black' : 'white')};
    padding: 4px 8px;
    border-radius: 20px;
    border: none;
    font-size: 10px;
`;

export const Button = ({ text, state, onClick }: IButton) => {
    return (
        <Container onClick={onClick} state={state}>
            {text}
        </Container>
    );
    // 컴포넌트를 활용하여 styled 로 전달할 수 있음
};
