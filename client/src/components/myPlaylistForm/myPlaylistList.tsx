import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { gridState, playlistList } from '../../store/atoms';
import {} from '../../styles/common.style';
import { MyPlaylistItem } from './myPlaylistItem';

export const MyPlaylistList = () => {
    const playlists = useRecoilValue(playlistList);
    const grid = useRecoilValue(gridState);

    return (
        <ul className="">
            {playlists.length ? (
                playlists?.map(({ id, cover, top, title }) => {
                    return (
                        <MyPlaylistItem
                            key={id}
                            id={id}
                            cover={cover ? cover : '/assets/playlist.svg'}
                            top={top && top}
                            name={title}
                        />
                    );
                })
            ) : (
                <h1 className="my-[50px] text-center">플레이리스트 목록이 없습니다</h1>
            )}
        </ul>
    );
};
