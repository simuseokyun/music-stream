import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArtistCover } from '../components/artistForm/artistCover';
import { TopFiveTracksTable } from '../components/artistForm/topFiveTrackList';
import { AlbumList } from '../components/artistForm/artistAlbumList';

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background: #131212;
    border-radius: 8px;
    overflow-x: hidden;
    margin-bottom: 100px;
    @media (max-width: 768px) {
        background: black;
        padding: 10px;
    }
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: 700;
    margin: 30px 0 10px 0;
    @media (max-width: 425px) {
        font-size: 16px;
    }
`;

const AllShow = styled.p`
    margin-bottom: 10px;
    text-align: right;
`;

export const ArtistPage = () => {
    const { artistId } = useParams();
    return (
        <Container>
            <ArtistCover />
            <Title>인기 곡</Title>
            <TopFiveTracksTable />
            <Title>디스코그래피</Title>
            <AllShow>
                <Link to={`/home/allAlbum/${artistId}`}>모두 표시</Link>
            </AllShow>
            <AlbumList />
        </Container>
    );
};
