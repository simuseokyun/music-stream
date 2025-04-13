import styled from 'styled-components';
import { NewAlbum } from '../components/home/newAlbumList';
import { FeaturePlaylist } from '../components/home/FeaturePlaylist';

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #131212;
    border-radius: 8px;
    @media (max-width: 768px) {
        margin-top: 60px;
        padding-bottom: 120px;
        background-color: black;
    }
`;

export const Main = () => {
    return (
        <Container>
            <NewAlbum />
            {/* <FeaturePlaylist></FeaturePlaylist> */}
        </Container>
    );
};
