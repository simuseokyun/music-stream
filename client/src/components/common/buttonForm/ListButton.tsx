import styled from 'styled-components';

const Button = styled.svg`
    width: 30px;
    height: 30px;
`;
type Props = {
    onList: () => void;
};
export const ListBtn = ({ onList }: Props) => {
    return (
        <Button onClick={onList} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title />
            <path d="M19,8H5A1,1,0,0,1,5,6H19a1,1,0,0,1,0,2Z" fill="#464646" />
            <path d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="#464646" />
            <path d="M19,18H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="#464646" />
        </Button>
    );
};
