import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
    box-sizing: border-box;
    z-index: 3;
`;
export const AlbumWrap = styled.div`
    width: 90%;
    max-width: 860px;
    height: 700px;
    position: relative;
    border-radius: 8px;
    overflow-y: scroll;
`;
export const AlbumTop = styled.div`
    display: flex;
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, #392f31);
    align-items: end;
    padding: 20px;
    @media (max-width: 425px) {
        display: block;
    }
`;
export const AlbumImg = styled.img`
    width: 200px;
    border-radius: 8px;
    @media (max-width: 768px) {
        width: 150px;
    }
    @media (max-width: 425px) {
        margin: auto;
    }
`;
export const AlbumInfo = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 10px 0 0 0;
    }
`;
export const AlbumType = styled.p``;
export const AlbumTitle = styled.h2`
    font-size: 40px;
    font-weight: 700;
    margin: 10px 0;
    @media (max-width: 768px) {
        font-size: 20px;
        margin: 5px 0;
    }
`;
export const ArtistName = styled.span`
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
export const ReleaseYear = styled.span`
    margin-left: 10px;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
export const TotalTracks = styled(ReleaseYear)`
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const TrackListsWrap = styled.div`
    padding: 20px;
    background: linear-gradient(90deg, black 0%, #392f31);
`;
export const TrackLists = styled.table`
    width: 100%;
    height: 100%;
    border-collapse: collapse;
`;

export const Table = styled.table``;
export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th`
    border-bottom: 1px solid #808080;
    padding: 10px 5px;
    &:first-child {
        width: 30px;
    }
    &:nth-child(2) {
        width: 80%;
        text-align: left;
        max-width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &:nth-child(3) {
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        text-align: right;
    }
`;
export const SpanWrap = styled.div`
    margin-bottom: 10px;
`;
export const CloseBtn = styled.span`
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 25px;
    border-radius: 25px;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

export const Copyright = styled.p`
    font-size: 12px;
    padding-top: 20px;
    color: #e2e2e2;
`;
