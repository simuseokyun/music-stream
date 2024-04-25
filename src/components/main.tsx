import styled from 'styled-components';
import { NewAlbum } from './newAlbum';
import { FeaturePlaylist } from './featurePlaylist';

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background: linear-gradient(#293a32, rgba(0, 0, 0, 1));
    border-radius: 8px;
`;

export const Main = () => {
    return (
        <Container>
            <NewAlbum></NewAlbum>
            <FeaturePlaylist></FeaturePlaylist>
        </Container>
    );
};
