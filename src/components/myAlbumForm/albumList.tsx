import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { myAlbumList } from '../../state/atoms';
import { useNavigate } from 'react-router-dom';
import { AlbumItem } from './albumItem';
import { Message } from '../../styles/common.style';

const Container = styled.ul`
    width: 100%;
`;

export const MyAlbumList = () => {
    const navigate = useNavigate();
    const myAlbumlist = useRecoilValue(myAlbumList);
    return (
        <Container>
            {myAlbumlist.length ? (
                myAlbumlist.map((album) => (
                    <AlbumItem
                        key={album.id}
                        name={album.name}
                        artist={album.artist}
                        cover={album.cover ? album.cover : '/images/basicPlaylist.png'}
                        onClick={() => navigate(`/home/album/${album.id}`)}
                    />
                ))
            ) : (
                <Message>찜한 앨범이 없습니다</Message>
            )}
        </Container>
    );
};
