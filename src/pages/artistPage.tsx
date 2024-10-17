import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArtistCover } from '../components/artistForm/artistCover';
import { TopFiveTracksTable } from '../components/artistForm/topFiveTrackList';
import { AlbumList } from '../components/artistForm/artistAlbumList';
import { RequiredLoginAlert } from '../components/alertForm/requiredLoginAlert';
import { RequiredPlaylist } from '../components/alertForm/requiredPlaylistAlert';
import { useRecoilValue } from 'recoil';
import { alertState } from '../state/atoms';
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

const AllShow = styled.p`
    margin-bottom: 10px;
    text-align: right;
`;

export const ArtistPage = () => {
    const { artistId } = useParams();
    const alertFormState = useRecoilValue(alertState);

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
