import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { setMobile, playlistList } from '../../state/atoms';
import { durationTransform } from '../../utils/util';
import { IArtistsTopTrack } from '../../types/artistInfo';
import { usePlayMusic, useAddPlaylist, useAddTrack } from '../../utils/util';
import { Category, CategoryList, PlayBtn, Tr, AddBtn } from '../../styles/common.style';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;
const Cover = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 8px;
`;
const Title = styled.p`
    margin-left: 10px;
`;

const Td = styled.td`
    padding: 5px;
    &:first-child {
        width: 5%;
    }
    &:nth-child(2) {
        width: 80%;
        text-align: left;
        max-width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &:nth-child(3) {
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        text-align: right;
    }
`;

export const TopFiveTracks = ({ cover, title, artists, album_id, album_title, duration_ms, uri }: IArtistsTopTrack) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const playMusic = usePlayMusic();
    const usePlaylist = useAddPlaylist();
    const { open, toggleAddBtn, mouseLeave } = usePlaylist;
    const useTrack = useAddTrack(title, duration_ms, cover, album_title, artists, album_id, uri);
    const { addTrack } = useTrack;

    return (
        <Tr onMouseLeave={mouseLeave}>
            <Td>
                <PlayBtn
                    src="/images/playButton.png"
                    onClick={() => {
                        playMusic(uri, title, cover, artists[0].name);
                    }}
                />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="album_cover" />
                    <Title>{title}</Title>
                </TdWrap>
            </Td>
            <Td>{`${durationTransform(duration_ms).minutes}:${
                String(durationTransform(duration_ms).seconds).length === 1
                    ? `0${durationTransform(duration_ms).seconds}`
                    : durationTransform(duration_ms).seconds
            }`}</Td>
            <Td style={{ position: 'relative' }}>
                <AddBtn src="/images/addButton.png" onClick={toggleAddBtn} />

                {open ? (
                    <Category>
                        {playlists.map((playlist) => {
                            return (
                                <CategoryList key={playlist.id} id={playlist.title} onClick={addTrack}>
                                    {playlist.title}
                                </CategoryList>
                            );
                        })}
                    </Category>
                ) : null}
            </Td>
        </Tr>
    );
};
