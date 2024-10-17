import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../styles/common.style';
import { myAlbumList } from '../../state/atoms';
import { AlbumItem } from './myAlbumItem';
import { gridState } from '../../state/atoms';

const List = styled.ul<{ $grid: boolean | null }>`
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

    return (
        <List $grid={myAlbumlist.length ? grid : null}>
            {myAlbumlist.length ? (
                myAlbumlist.map((album) => (
                    <AlbumItem
                        key={album.id}
                        id={album.id}
                        name={album.name}
                        artist={album.artist}
                        cover={album.cover ?? '/images/basicPlaylist.png'}
                    />
                ))
            ) : (
                <>
                    <Message>찜한 앨범이 없습니다</Message>
                </>
            )}
        </List>
    );
};
