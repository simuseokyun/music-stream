import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
`;
export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Message = styled.p`
    text-align: center;
    font-size: 16px;
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
export const CategoryItem = styled.li`
    text-align: left;
    color: white;
    padding: 5px;
    &:hover {
        background-color: #3e3d3d;
    }
`;

export const Dot = styled.span`
    color: rgb(160, 160, 160);
    margin: 0 2px;
`;
export const Th = styled.th`
    padding: 5px 0;
    &:first-child {
        width: 6%;
        text-align: left;
        @media (max-width: 768px) {
            width: 100px;
        }
    }

    &:nth-child(2) {
        width: 60%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            width: 80%;
        }
    }
    &:nth-child(3) {
        width: 25%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 10%;
    }
`;
export const Td = styled.td`
    cursor: pointer;
    padding: 5px 0;
    max-width: 0;
    &:first-child {
        width: 6%;
        text-align: left;
        @media (max-width: 425px) {
            width: 100px;
        }
    }

    &:nth-child(2) {
        width: 60%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            width: 80%;
        }
    }
    &:nth-child(3) {
        width: 25%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 5%;
        text-align: right;
    }
`;
