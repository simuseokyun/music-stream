import styled from 'styled-components';
import { Button } from '../common/buttonForm/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { myAlbumList, libraryState } from '../../state/atoms';
import { IGetAlbumInfo } from '../../types/albumInfo';

const Container = styled.div`
    position: relative;
    background: linear-gradient(180deg, #666633, #111111);
    display: flex;
    align-items: end;
    padding: 20px;
    border-radius: 8px 8px 0 0;
    @media (max-width: 768px) {
        background: black;
    }
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
        margin: 10px 0 0;
    }
`;
const Type = styled.p``;
const Title = styled.h1`
    font-size: 40px;
    font-weight: 700;
    margin: 5px 0;
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;
const Artist = styled.span``;
const ReleaseYear = styled.span`
    margin-left: 10px;
`;
const TrackLength = styled(ReleaseYear)``;
const SubInfo = styled.div`
    margin-bottom: 10px;
`;

export const AlbumInfo = ({ id, name, cover, type, year, trackLength, artist }: IGetAlbumInfo) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [myAlbums, setMyAlbums] = useRecoilState(myAlbumList);
    const setLibraryState = useSetRecoilState(libraryState);
    const saveAlbumState = [...myAlbums].find((album) => {
        return album.name === name;
    });

    const addAlbum = () => {
        setMyAlbums((prev) => {
            return [...prev, { cover, name, artist: artist.name, id }];
        });
        setLibraryState({ playlist: false, album: true });
    };
    const deleteAlbum = () => {
        setMyAlbums((prev) => {
            const newAlbums = prev.filter((saveAlbum) => {
                return saveAlbum.name !== name;
            });
            return newAlbums;
        });
    };

    return (
        <Container>
            <Cover src={cover} alt="앨범커버" />
            <Info>
                <Type>{type}</Type>
                <Title>{name}</Title>
                <SubInfo>
                    <Artist>
                        <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                    </Artist>
                    <ReleaseYear>{year}</ReleaseYear>
                    <TrackLength>{trackLength}곡</TrackLength>
                </SubInfo>

                {saveAlbumState ? (
                    <Button fontSize="12px" padding="4px" bgColor="#e2e2e2" text="앨범 삭제" onClick={deleteAlbum} />
                ) : (
                    <Button fontSize="12px" padding="4px" bgColor="#65d46e" text="앨범 추가" onClick={addAlbum} />
                )}
            </Info>
        </Container>
    );
};
