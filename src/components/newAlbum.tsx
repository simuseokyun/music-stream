import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getNewAlbum } from '../api';
import { NewAlbumList } from './newAlbumList';

const Container = styled.div`
    padding: 20px;
    background: linear-gradient(#293a32, rgba(0, 0, 0, 1));
`;

const FirstAlbumWrap = styled.div`
    display: flex;
    padding: 20px;
    background: linear-gradient(-90deg, #293a32, #181818);
`;

const FirstAlbumImg = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 8px;
`;
const FirstAlbumInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: end;
`;
const FirstAlbumType = styled.p``;
const FirstAlbumTitle = styled.h1`
    font-weight: 700;
    font-size: 50px;
    margin: 10px 0;
`;
const FirstAlbumArtist = styled.span`
    font-size: 20px;
`;

interface INewAlbum {
    newAlbums: IAlbums;
}
interface IAlbums {
    items: IItems[];
    href: string;
}
interface IItems {
    album_type: string;
    artists: { name: string; id: string }[];
    id: string;
    images: { url: string; height: number; width: number }[];
    name: string;
}

const NewAlbumWrap = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
`;

export const NewAlbum = ({ newAlbums }: INewAlbum) => {
    console.log(newAlbums);
    return (
        <>
            <Container>
                <FirstAlbumWrap>
                    <FirstAlbumImg src={newAlbums.items[0].images[0].url} />
                    <FirstAlbumInfo>
                        <FirstAlbumType>{newAlbums.items[0].album_type}</FirstAlbumType>
                        <FirstAlbumTitle>{newAlbums.items[0].name}</FirstAlbumTitle>
                        <FirstAlbumArtist>{newAlbums.items[0].artists[0].name}</FirstAlbumArtist>
                    </FirstAlbumInfo>
                </FirstAlbumWrap>
                <h1>최신 앨범</h1>
                <NewAlbumWrap>
                    {newAlbums.items.slice(1).map((item) => (
                        <NewAlbumList
                            key={item.id}
                            title={item.name}
                            artist={item.artists[0].name}
                            img={item.images[0].url}
                        ></NewAlbumList>
                    ))}
                </NewAlbumWrap>
            </Container>
        </>
    );
};
