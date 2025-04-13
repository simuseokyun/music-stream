import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { libraryState } from '../../store/atoms';
import { MyPlaylistList } from '../../components/myPlaylistForm/myPlaylistList';
import { MyAlbumList } from '../../components/myAlbum/myAlbumList';

import { LibraryTab } from '../../components/library/LibraryTab';

const Container = styled.div`
    background-color: #131212;
    position: relative;
    border-radius: 8px;
    overflow-y: scroll;
    height: 550px;
    @media (max-width: 768px) {
        margin-top: 60px;
        background-color: black;
    }
`;

const Wrap = styled.div`
    position: sticky;
    background-color: #131212;
    top: 0;
    left: 0;
    padding: 20px;

    @media (max-width: 768px) {
        background-color: black;
    }
`;

const Title = styled.h1`
    font-size: 20px;
    padding: 0 0 10px 0;
    @media (max-width: 768px) {
    }
`;

export const Library = () => {
    const libraryState_ = useRecoilValue(libraryState);

    return (
        <Container>
            <Wrap>
                <Title>나의 라이브러리</Title>
                <LibraryTab />
            </Wrap>
            {libraryState_.playlist ? <MyPlaylistList /> : <MyAlbumList />}
        </Container>
    );
};
