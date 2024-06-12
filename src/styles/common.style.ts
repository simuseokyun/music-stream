import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
`;
export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Message = styled.p`
    text-align: center;
`;
export const PrevBtn = styled.img`
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.4);
    width: 25px;
    height: 25px;
    padding: 4px;
    border-radius: 24px;
    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;
export const NextBtn = styled(PrevBtn)`
    margin-left: 10px;
`;
export const PlayBtn = styled.img`
    width: 25px;
    height: 25px;
`;
export const AddBtn = styled.img`
    width: 20px;
    height: 20px;
    background-color: white;
    padding: 4px;
    border-radius: 20px;
    display: inline-block;
`;
export const CloseBtn = styled.img`
    width: 30px;
    height: 30px;
    padding: 4px;
    border-radius: 20px;
    display: inline-block;
    cursor: pointer;
`;
export const Category = styled.ul`
    position: absolute;
    right: 0;
    width: 200px;
    padding: 10px;
    background-color: #282828;
    border-radius: 8px;
    z-index: 1;
`;
export const CategoryList = styled.li`
    text-align: left;
    color: white;
    padding: 5px;
    &:hover {
        background-color: #3e3d3d;
    }
`;
