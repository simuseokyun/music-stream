import styled, { keyframes } from 'styled-components';
import { IPopularListCoverProps } from '../types/popularPlaylists';
export const Table = styled.table`
    width: 100%;
`;
export const Thead = styled.thead``;
export const Tbody = styled.tbody``;

export const Tr = styled.tr`
    a {
        color: #a0a0a0;
        &:hover {
            color: white;
        }
        @media (max-width: 768px) {
            &:hover {
                color: #a0a0a0;
            }
        }
    }
`;

export const Message = styled.h1`
    text-align: center;
`;
export const LoadingWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const Loading = styled.img`
    width: 30px;
    height: 30px;

    animation: ${rotate} 1s linear infinite;
`;
export const PrevBtn = styled.img`
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.4);
    width: 25px;
    height: 25px;
    padding: 4px;
    border-radius: 25px;
    transition: all 0.2s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.7);
    }
    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;
export const NextBtn = styled(PrevBtn)`
    margin-left: 10px;
`;
export const PlayBtn = styled.img`
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    transition: all 0.2s;
    &:hover {
        background-color: white;
    }
    @media (max-width: 768px) {
        &:hover {
            background-color: initial; /* 원래 상태로 복구 */
        }
    }
`;
export const AddBtn = styled.img`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: white;
    padding: 4px;
    border-radius: 20px;
    &:hover {
        transform: scale(1.1);
    }
    @media (max-width: 768px) {
        &:hover {
            transform: none;
        }
    }
`;
export const CloseBtn = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 25px;
    padding: 2px;
    border-radius: 20px;
    display: inline-block;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        background-color: white;
    }
    @media (max-width: 768px) {
        &:hover {
            background-color: initial;
        }
    }
`;
export const Category = styled.ul`
    position: absolute;
    right: 0px;
    width: 200px;
    height: 300px;
    padding: 10px;
    background-color: #333333;
    border-radius: 8px;
    text-align: left;
    overflow-y: scroll;
    z-index: 10;
    @media (max-width: 425px) {
        width: 100dvw;
        height: 100dvh;
        top: 0;
    }
`;
export const CategoryItem = styled.li`
    display: flex;
    align-items: center;
    text-align: left;
    color: white;
    padding: 2px;
    transition: all 0.2s;
    border-radius: 5px;
    /* text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; */
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
    padding: 8px 0;
    max-width: 0;
    &:first-child {
        width: 6%;
        text-align: left;
        @media (max-width: 768px) {
            display: none;
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
        a {
            font-size: 14px;
        }
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 5%;
        text-align: right;
    }
`;
export const Cover = styled.img<IPopularListCoverProps>`
    width: 45px;
    height: 45px;
    border-radius: 4px;
`;
export const TitleWrap = styled.div`
    width: calc(100% - 60px);
    text-align: left;
    margin-left: 10px;
`;
export const Title = styled.h1`
    font-size: 16px;
    margin-bottom: 2px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
`;
export const ModalTitle = styled.h3`
    font-size: 16px;
    text-align: left;
    font-weight: 700;
    @media (max-width: 768px) {
        text-align: center;
    }
`;
export const SubTitle = styled(Title)`
    font-size: 14px;
    padding: 5px;
    margin: 0;
`;
export const ArtistWrap = styled.span`
    a {
        font-size: 14px;
        color: rgb(160, 160, 160);

        @media (max-width: 425px) {
            font-size: 12px;
        }
    }
`;

export const Modal = styled.form`
    background-color: #232322;
    max-width: 500px;
    padding: 15px;
    width: 80%;
    border-radius: 8px;
`;
export const Form = styled(Modal)``;

export const AlertTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const AlertTitle = styled.h1`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;
export const AlertMessage = styled.p`
    font-size: 16px;
    margin-top: 15px;
`;

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 31;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
