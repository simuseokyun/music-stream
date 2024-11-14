import styled from 'styled-components';

const Cover = styled.img`
    width: 200px;
    border-radius: 8px;
    @media (max-width: 768px) {
        width: 150px;
    }
    @media (max-width: 425px) {
        margin: auto;
    }
`;

export const AlbumCover = ({ cover }: { cover: string }) => {
    return <Cover src={cover} />;
};
