import styled from 'styled-components';
import { NewAlbum } from '../components/newAlbumForm/newAlbum';
import { FeaturePlaylist } from '../components/featurePlaylistForm/featurePlaylist';

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
    @media (max-width: 768px) {
        padding: 20px 20px 80px 20px;
        height: calc(100vh - 50px);
    }
`;

export const Main = () => {
    return (
        <Container>
            <NewAlbum></NewAlbum>
            <FeaturePlaylist></FeaturePlaylist>
        </Container>
    );
};
