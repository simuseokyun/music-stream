import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArtistCover } from '../../components/artist/ArtistCover';
import { FiveTrackList } from '../../components/artist/FiveTrackList';
import { AlbumList } from '../../components/artist/ArtistAlbumList';

const Container = styled.div`
    background: #131212;
    padding: 20px 20px 100px;
    border-radius: 8px;
    @media (max-width: 768px) {
        background: black;
        margin-top: 60px;
        padding-bottom: 120px;
    }
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin: 30px 5px 0 5px;
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 425px) {
        font-size: 16px;
    }
`;

const LinkWrap = styled.p`
    margin-bottom: 10px;
    text-align: right;
`;

export const Artist = () => {
    const { artistId } = useParams();

    return (
        <Container>
            <ArtistCover />
            <Title>인기 곡</Title>
            <FiveTrackList />
            <Title>디스코그래피</Title>
            <LinkWrap>
                <Link to={`/allAlbum/${artistId}`}>모두 표시</Link>
            </LinkWrap>
            <AlbumList />
        </Container>
    );
};
