import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { deviceInfo, nowSongInfo, setMobile, playlistList, addPlaylistState } from '../../state/atoms';
import { playSong, useAddPlaylist, useAddTrack } from '../../utils/util';
import { ISearchTrackProp } from '../../types/searchTracksInfo';
import Cookies from 'js-cookie';
import { useHandleSongClick } from '../../utils/util';

const scaleBig = keyframes`
    from {
        transform: scale(1) 
    }
    to {
        transform: scale(1.2)
    }
`;

const Tr = styled.tr`
    width: 100%;
    &:first-child {
        margin: 0;
    }
`;

const TrackImg = styled.img`
    width: 45px;
    height: 45px;
    background-position: center;
    background-size: cover;
`;

const AddBtn = styled.img<{ state: string }>`
    background-color: white;
    border-radius: 10px;
    padding: 4px;
    width: 20px;
    height: 20px;
    &:hover {
        animation: ${scaleBig} 0.2s forwards;
    }
`;
const Category = styled.ul`
    position: absolute;
    right: 0;
    width: 200px;
    padding: 10px;
    background-color: #282828;
    border-radius: 8px;
`;
const CategoryList = styled.li`
    text-align: left;
    color: white;
    font-size: 14px;
    padding: 5px;
    &:hover {
        background-color: #3e3d3d;
    }
`;
const TdWrap = styled.div`
    display: flex;
`;
const Td = styled.td`
    cursor: pointer;
    padding: 5px 0;
    max-width: 0;
    overflow: hidden;
    &:first-child {
        width: 6%;
        text-align: left;
        @media (max-width: 425px) {
            width: 100px;
        }
    }

    &:nth-child(2) {
        width: 50%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            width: 80%;
        }
    }
    &:nth-child(3) {
        width: 30%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 5%;
    }
`;
const TitleWrap = styled.div`
    width: 100%;
    text-align: left;
    margin-left: 10px;
`;
const TrackTitle = styled.p``;

const ArtistsWrap = styled.div`
    display: flex;
`;
const ArtistNameWrap = styled.p`
    margin-top: 6px;
    a {
        color: rgb(160, 160, 160);
    }
`;

const PlayBtn = styled.img`
    width: 25px;
    height: 25px;
`;

const Dot = styled.span`
    color: rgb(160, 160, 160);
    margin: 0 2px;
`;
export const SearchTrackList = ({
    cover,
    title,
    album_id,
    album_title,
    artists,
    duration_ms,
    id,
    uri,
}: ISearchTrackProp) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const isMobile = useRecoilValue(setMobile);
    const handleSongClick = useHandleSongClick();
    const usePlaylist = useAddPlaylist();
    const { open, toggleAddBtn, mouseLeave } = usePlaylist;
    const useTrack = useAddTrack(title, duration_ms, cover, album_title, artists, album_id, uri);
    const { addTrack } = useTrack;

    return (
        <Tr onMouseLeave={mouseLeave} key={id}>
            <Td>
                <PlayBtn
                    src="/images/playButton.png"
                    onClick={() => handleSongClick(uri, title, cover, artists[0].name)}
                />
            </Td>
            <Td>
                <TdWrap>
                    <TrackImg src={cover} alt="album_cover" />
                    <TitleWrap>
                        <TrackTitle>{title}</TrackTitle>
                        <ArtistsWrap>
                            {artists.map((artist, i) => (
                                <ArtistNameWrap>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                    {artists.length == 1 ? undefined : artists[i + 1] ? <Dot>,</Dot> : undefined}
                                </ArtistNameWrap>
                            ))}
                        </ArtistsWrap>
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>
            <Td>
                <AddBtn
                    src="/images/addButton.png"
                    state={isMobile.toString()}
                    onClick={toggleAddBtn}
                    className="material-symbols-outlined"
                />

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
