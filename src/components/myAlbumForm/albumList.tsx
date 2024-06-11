import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { saveAlbumList } from '../../state/atoms';
import { useNavigate } from 'react-router-dom';
import { AlbumItem } from './albumItem';
import { Message } from '../../styles/common.style';

const Container = styled.ul`
    width: 100%;
`;

export const AlbumList = () => {
    const navigate = useNavigate();
    const AlbumList = useRecoilValue(saveAlbumList);
    return (
        <Container>
            {AlbumList.length ? (
                AlbumList.map((album) => (
                    <AlbumItem
                        key={album.id}
                        name={album.name}
                        artist={album.artist}
                        cover={album.cover!}
                        onClick={() => navigate(`/home/album/${album.id}`)}
                    />
                ))
            ) : (
                <Message>찜한 앨범이 없습니다</Message>
            )}
        </Container>
    );
};
