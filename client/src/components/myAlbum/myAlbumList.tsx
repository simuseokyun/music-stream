import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../styles/common.style';
import { myAlbumList } from '../../store/atoms';
import { MyAlbumItem } from './myAlbumItem';
import { gridState } from '../../store/atoms';

const Container = styled.ul<{ $grid: boolean | null }>`
    display: grid;
    grid-template-columns: ${({ $grid }) => ($grid ? 'repeat(4,1fr)' : '1fr')};
    gap: 20px;
    padding: 0 20px 20px;
    @media (max-width: 768px) {
        padding: 0 20px 50px;
    }
`;

export const MyAlbumList = () => {
    const myAlbumlist = useRecoilValue(myAlbumList);
    const grid = useRecoilValue(gridState);
    if (!myAlbumlist.length) {
        return <Message>찜한 앨범이 없습니다</Message>;
    }

    return (
        <Container $grid={myAlbumlist.length ? grid : null}>
            {myAlbumlist.length &&
                myAlbumlist.map(({ id, name, artist, cover }) => (
                    <MyAlbumItem
                        key={id}
                        id={id}
                        name={name}
                        artist={artist}
                        cover={cover ?? '/assets/basicPlaylist.png'}
                    />
                ))}
        </Container>
    );
};
