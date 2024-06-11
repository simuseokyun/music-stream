import styled from 'styled-components';
import { Button } from '../buttonForm/button';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { clickMenuAlbum, clickMenuPlaylist } from '../../state/atoms';
import { saveAlbumList } from '../../state/atoms';

const Container = styled.div`
    display: flex;
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, #392f31);
    align-items: end;
    padding: 20px;
    @media (max-width: 425px) {
        display: block;
    }
`;
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
const Info = styled.div`
    margin-left: 20px;
    @media (max-width: 425px) {
        margin: 10px 0 0 0;
    }
`;
export const Type = styled.p``;
export const Title = styled.h2`
    font-size: 40px;
    font-weight: 700;
    margin: 10px 0;
    @media (max-width: 768px) {
        font-size: 20px;
        margin: 5px 0;
    }
`;
export const Artist = styled.span`
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
export const Year = styled.span`
    margin-left: 10px;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
export const TotalTracks = styled(Year)`
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
const SpanWrap = styled.div`
    margin-bottom: 10px;
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
interface Test {
    id: string;
    name: string;
    artist: string;
    cover: string;
    type: string;
    year: string;
    trackLength: number;
}

export const AlbumInfo = ({ id, name, cover, type, year, trackLength, artist }: Test) => {
    const [albums, setAlbum] = useRecoilState(saveAlbumList);
    const clickPlaylistState = useSetRecoilState(clickMenuPlaylist);
    const clickAlbumState = useSetRecoilState(clickMenuAlbum);
    const saveAlbumState = [...albums].find((album) => {
        return album.name === name;
    });
    const saveAlbum = () => {
        setAlbum((prev) => {
            return [...prev, { cover, name, artist, id }];
        });
        clickAlbumState(true);
        clickPlaylistState(false);
    };
    const deleteAlbum = () => {
        setAlbum((prev) => {
            const newArr = prev.filter((saveAlbum) => {
                return saveAlbum.name !== name;
            });
            return newArr;
        });
    };
    return (
        <Container>
            <Cover src={cover} />
            <Info>
                <Type>{type}</Type>
                <Title>{name}</Title>
                <SpanWrap>
                    <Artist>
                        <Link to={`/home/artist/${id}`}>{name}</Link>
                    </Artist>
                    <Year>{year}</Year>
                    <TotalTracks>{trackLength}곡</TotalTracks>
                </SpanWrap>
                {saveAlbumState ? (
                    <Button bgColor="#e2e2e2" text="찜 해제" onClick={deleteAlbum} />
                ) : (
                    <Button bgColor="#65d46e" text="앨범 찜하기" onClick={saveAlbum} />
                )}
            </Info>
        </Container>
    );
};
