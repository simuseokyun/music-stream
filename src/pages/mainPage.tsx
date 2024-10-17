import styled from 'styled-components';
import { NewAlbum } from '../components/newAlbumForm/newAlbumList';
import { FeaturePlaylist } from '../components/featurePlaylistForm/featurePlaylistList';

const Container = styled.div`
    width: 100%;
    padding: 20px 20px 100px;
    background-color: #131212;
    border-radius: 8px;
    @media (max-width: 768px) {
        margin-top: 60px;
        padding-bottom: 120px;
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
