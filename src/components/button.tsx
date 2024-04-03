import styled from 'styled-components';
interface IButton {
    text: string;
}

const Container = styled.button`
    /* display: inline-block; */
    background-color: #ffffff;
    color: black;
    padding: 8px;
    border-radius: 20px;
    border: none;
`;

export const Button = ({ text }: IButton) => {
    return <Container>{text}</Container>;
};
