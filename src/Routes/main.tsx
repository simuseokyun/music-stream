import styled from 'styled-components';
import { NewAlbum } from '../components/newAlbumForm/newAlbum';
import { FeaturePlaylist } from '../components/featurePlaylistForm/featurePlaylist';

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
    margin-bottom: 100px;

    @media (max-width: 768px) {
        padding: 10px;
        background-color: black;
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
