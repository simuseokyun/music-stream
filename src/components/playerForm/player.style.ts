import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.9);
    @media (max-width: 768px) {
        bottom: 52px;
    }
`;

export const Wrap = styled.div`
    max-width: 1180px;
    height: 100%;
    padding: 15px;
    margin: auto;
    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const PlayerForm = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;
export const PlayerLeft = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
`;
export const PlayerRight = styled.div`
    flex: 1;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const PlayerCenter = styled.div`
    flex: 1;
    text-align: center;
    @media (max-width: 768px) {
        text-align: right;
    }
`;
export const Cover = styled.img`
    width: 50px;
    height: 50px;
    @media (max-width: 768px) {
        width: 35px;
        height: 35px;
    }
`;
export const Info = styled.div`
    width: 100%;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
`;
export const Title = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'shouldAnimate',
})<{ shouldAnimate: boolean }>`
    font-size: 14px;
    display: inline-block;
    ${({ shouldAnimate }) =>
        shouldAnimate &&
        css`
            animation: ${marquee} 10s linear infinite;
        `}
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const Artists = styled.p`
    font-size: 12px;
    color: rgb(160, 160, 160);
    margin-top: 5px;
`;
export const SongBtn = styled.span`
    color: white;
    font-size: 30px;
    cursor: pointer;
`;
export const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;
