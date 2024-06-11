import styled from 'styled-components';
const Item = styled.li`
    display: flex;
    align-items: center;
    border-radius: 8px;

    padding: 5px;
    width: 100%;

    &:first-child {
        margin-top: 10px;
    }
    a {
        text-decoration: none;
        display: flex;
        align-items: center;
    }
`;
const Cover = styled.img`
    width: 50px;
    height: 50px;
`;
const Info = styled.div`
    width: calc(100% - 50px);
    margin-left: 8px;
`;
const Title = styled.h1`
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const Artist = styled.p`
    color: rgb(160, 160, 160);
`;

interface Test {
    cover: string;
    name: string;
    artist: string;
    onClick: () => void;
}
export const AlbumItem = ({ name, artist, cover, onClick }: Test) => {
    return (
        <Item onClick={onClick}>
            <Cover src={cover} />
            <Info>
                <Title>{name}</Title>
                <Artist>{artist}</Artist>
            </Info>
        </Item>
    );
};
