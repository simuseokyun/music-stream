import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { gridState, playlistList } from '../../store/atoms';
import { Message } from '../../styles/common.style';
import { MyPlaylistItem } from './myPlaylistItem';

const Container = styled.ul<{ $grid: boolean | null }>`
    display: grid;
    grid-template-columns: ${({ $grid }) => (Boolean($grid) ? 'repeat(4,1fr)' : '1fr')};
    gap: 20px;
    padding: 0 20px 20px;
    @media (max-width: 768px) {
        padding: 0 20px 50px;
    }
`;

export const MyPlaylistList = () => {
    const playlists = useRecoilValue(playlistList);
    const grid = useRecoilValue(gridState);

    return (
        <Container $grid={playlists.length ? grid : null}>
            {playlists.length ? (
                playlists.map(({ id, cover, top, title }) => {
                    return (
                        <MyPlaylistItem
                            key={id}
                            id={id}
                            cover={cover ? cover : '/assets/basicPlaylist.png'}
                            top={top && top}
                            name={title}
                        />
                    );
                })
            ) : (
                <Message>플레이리스트 목록이 없습니다</Message>
            )}
        </Container>
    );
};
