import styled from 'styled-components';

const Copyright = styled.p`
    font-size: 12px;
    margin-top: 20px;
    color: #e2e2e2;
`;

export const AlbumCopyright = ({ copyright }: { copyright: string }) => {
    return <Copyright>{copyright}</Copyright>;
};
