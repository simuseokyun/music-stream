import styled from 'styled-components';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import { deviceInfo, nowSongInfo, setMobile, addPlaylistState, playlistList } from '../../state/atoms';
import { playSong, msTransform } from '../../utils/util';
import Cookies from 'js-cookie';
import { IArtistsTopTrack } from '../../types/artistInfo';
import { Tr } from '../../styles/albumPage.style';
import { useHandleSongClick, useAddPlaylist, useAddTrack } from '../../utils/util';
import { Category, CategoryList, PlayBtn } from '../../styles/common.style';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;
const TrackImg = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 8px;
`;
const TrackTitle = styled.p`
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

const AddBtn = styled.span<{ state: string }>``;

export const TopFiveTracks = ({ cover, title, artists, album_id, album_title, duration_ms, uri }: IArtistsTopTrack) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const isMobile = useRecoilValue(setMobile);
    const handleSongClick = useHandleSongClick();
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
                        handleSongClick(uri, title, cover, artists[0].name);
                    }}
                />
            </Td>
            <Td>
                <TdWrap>
                    <TrackImg src={cover} alt="album_cover" />
                    <TrackTitle>{title}</TrackTitle>
                </TdWrap>
            </Td>
            <Td>{`${msTransform(duration_ms).minutes}:${
                String(msTransform(duration_ms).seconds).length === 1
                    ? `0${msTransform(duration_ms).seconds}`
                    : msTransform(duration_ms).seconds
            }`}</Td>
            <Td>
                <AddBtn
                    onClick={toggleAddBtn}
                    style={{ position: 'relative' }}
                    state={isMobile.toString()}
                    className="material-symbols-outlined"
                >
                    add_circle
                </AddBtn>
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
