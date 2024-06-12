import styled from 'styled-components';
import { NewAlbum } from '../components/newAlbumForm/newAlbumList';
import { FeaturePlaylist } from '../components/featurePlaylistForm/featurePlaylistList';

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

export const MainPage = () => {
    return (
        <Container>
            <NewAlbum></NewAlbum>
            <FeaturePlaylist></FeaturePlaylist>
        </Container>
    );
};
