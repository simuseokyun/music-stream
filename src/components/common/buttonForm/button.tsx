import { IButton } from '../../../types/button';
import styled from 'styled-components';

type IButtonCss = {
    $margin?: string;
    $padding?: string;
    $fontSize?: string;
};

const Btn = styled.button<IButtonCss>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    padding: ${(props) => (props.$padding ? props.$padding : '4px 6px')};
    border: none;
    border-radius: 4px;
    font-size: ${(props) => (props.$fontSize ? props.$fontSize : '14px')};
    font-weight: 600;
    vertical-align: middle;
    transition: all 0.2s;
`;

export const Button = ({ text, bgColor, onClick, margin, padding, fontSize }: IButton) => {
    return (
        <Btn
            $fontSize={fontSize}
            $margin={margin}
            $padding={padding}
            style={{ backgroundColor: bgColor }}
            onClick={onClick}
        >
            {text}
        </Btn>
    );
};
