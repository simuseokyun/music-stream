import styled from 'styled-components';

const Button = styled.svg`
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 30px;
    transition: all 0.2s;
    &:hover {
        transform: scale(1.2);
    }
`;

export const MoreBtn = ({ toggle }: { toggle: () => void }) => {
    return (
        <Button
            onClick={toggle}
            fill="#e2e2e2"
            height="800px"
            width="800px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 210 210"
        >
            <g id="XMLID_27_">
                <path
                    id="XMLID_28_"
                    d="M25,80C11.215,80,0,91.215,0,105s11.215,25,25,25c13.785,0,25-11.215,25-25S38.785,80,25,80z"
                />
                <path
                    id="XMLID_30_"
                    d="M105,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S118.785,80,105,80z"
                />
                <path
                    id="XMLID_71_"
                    d="M185,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S198.785,80,185,80z"
                />
            </g>
        </Button>
    );
};
