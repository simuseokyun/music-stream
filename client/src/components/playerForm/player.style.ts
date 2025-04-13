import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div<{ $song: string | null }>`
    width: 100%;
    position: fixed;
    left: 0;
    bottom: ${({ $song }) => ($song ? '0' : '-100px')};
    transition: all 0.5s;
    z-index: 10;
    background: rgba(0, 0, 0, 0.9);

    @media (max-width: 768px) {
        bottom: ${({ $song }) => ($song ? '52px' : '-100px')};
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
`;
export const SetPlayer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        justify-content: right;
    }
`;
export const PlayerTimer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const StartTime = styled.span`
    margin-right: 5px;
`;
export const EndTime = styled.span`
    margin-left: 5px;
`;
export const Playbar = styled.span`
    position: relative;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background-color: #e2e2e2;
`;
export const PlaybarOverlay = styled.span<{ width: number }>`
    position: absolute;
    background-color: rgb(101, 212, 110);
    border-radius: 5px;

    top: 0;
    left: 0;
    width: ${(props) => props.width + '%'};
    height: 100%;
`;
export const Artists = styled.p`
    font-size: 12px;
    color: rgb(160, 160, 160);
    margin-top: 5px;
`;
export const StopBtn = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
    @media (max-width: 768px) {
        &:hover {
            transform: none;
        }
    }
`;
export const PlayBtn = styled(StopBtn)``;
export const PrevBtn = styled.img`
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    &:hover {
        transform: scale(1.1);
    }
    @media (max-width: 768px) {
        &:hover {
            transform: none;
        }
    }
`;
export const NextBtn = styled(PrevBtn)`
    margin-left: 10px;
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

export const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;
