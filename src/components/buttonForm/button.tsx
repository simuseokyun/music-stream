import { IButton } from '../../types/button';
import styled from 'styled-components';

const Container = styled.button<{ bgColor: string; margin: string | undefined }>`
    background-color: ${(props) => props.bgColor};
    margin: ${(props) => (props.margin ? props.margin : '0')};
    padding: 4px 8px;
    border: none;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    vertical-align: middle;
`;

export const Button = ({ text, bgColor, onClick, margin }: IButton) => {
    return (
        <Container margin={margin} bgColor={bgColor} onClick={onClick}>
            {text}
        </Container>
    );
};
