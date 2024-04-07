import styled from 'styled-components';

interface IButton {
    text: string;
}

const Container = styled.button`
    /* display: inline-block; */
    background-color: white;
    color: black;
    padding: 4px 8px;
    border-radius: 20px;
    border: none;
    font-size: 10px;
`;

export const Button = ({ text }: IButton) => {
    return <Container>{text}</Container>;
    // 컴포넌트를 활용하여 styled 로 전달할 수 있음
};
