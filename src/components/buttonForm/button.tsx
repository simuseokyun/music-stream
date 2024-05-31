import styled from 'styled-components';

interface IButton {
    text: string;
    bgColor: string;
    onClick?: () => void;
    margin?: string;
}

const Container = styled.button<{ bgColor: string; margin: string }>`
    background-color: ${(props) => props.bgColor};
    margin: ${(props) => props.margin};
    padding: 4px 8px;
    border: none;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    vertical-align: middle;
`;

export const Button = ({ text, bgColor, onClick, margin }: IButton) => {
    return (
        <Container margin={margin ? margin : '0'} bgColor={bgColor} onClick={onClick}>
            {text}
        </Container>
    );
};
