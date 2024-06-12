import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { playlistList } from '../../state/atoms';
import { useRecoilState } from 'recoil';
import { durationTransform } from '../../utils/util';
import { IMyPlaylistTracks } from '../../types/myPlaylist';
import { usePlayMusic } from '../../utils/util';
import { Tr, Dot } from '../../styles/common.style';

const TdWrap = styled.div`
    display: flex;
    align-items: center;
`;
const Title = styled.p`
    @media (max-width: 425px) {
        font-size: 14px;
    }
`;
const TitleWrap = styled.div`
    text-align: left;
    margin-left: 10px;
`;
const ArtistsWrap = styled.div`
    display: flex;
`;
const Cover = styled.img`
    width: 45px;
    height: 45px;
`;
const Artist = styled.p`
    margin-top: 4px;
    a {
        color: rgb(160, 160, 160);
        @media (max-width: 425px) {
            font-size: 12px;
        }
    }
`;
const Td = styled.td`
    padding: 5px;
    &:first-child {
        width: 2%;
    }
    &:nth-child(2) {
        width: 60%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 0;
    }
    &:nth-child(3) {
        width: 30%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 0;
        @media (max-width: 425px) {
            display: none;
        }
    }
    &:nth-child(4) {
        width: 10%;
        @media (max-width: 768px) {
            display: none;
        }
    }
    &:last-child() {
        width: 10%;
    }
`;
const DeleteBtn = styled.img`
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 25px;
`;
const PlayBtn = styled.img`
    width: 25px;
    height: 25px;
`;
export const PlaylistTracks = ({
    cover,
    title,
    album_id,
    artists,
    album_title,
    duration,
    playlist_id,
    uri,
}: IMyPlaylistTracks) => {
    const [playlist, setPlaylist] = useRecoilState(playlistList);
    const playMusic = usePlayMusic();
    const deleteTrack = () => {
        setPlaylist((prev) => {
            const index = playlist.findIndex((ele) => {
                return ele.id === playlist_id;
            });
            const newTracks = [...prev[index].tracks].filter((ele) => {
                return ele.title !== title;
            });
            return [...prev.slice(0, index), { ...prev[index], tracks: newTracks }, ...prev.slice(index + 1)];
        });
    };

    return (
        <Tr>
            <Td>
                <PlayBtn src="/images/playButton.png" onClick={() => playMusic(uri, title, cover, artists[0].name)} />
            </Td>
            <Td>
                <TdWrap>
                    <Cover src={cover} alt="album_cover" />
                    <TitleWrap>
                        <Title>{title}</Title>
                        <ArtistsWrap>
                            {artists.map((artist, i) => (
                                <Artist>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                    {artists.length == 1 ? null : artists[i + 1] ? <Dot>,</Dot> : null}
                                </Artist>
                            ))}
                        </ArtistsWrap>
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>
            <Td>{`${durationTransform(duration).minutes}:${
                String(durationTransform(duration).seconds).length === 1
                    ? `0${durationTransform(duration).seconds}`
                    : durationTransform(duration).seconds
            }`}</Td>
            <Td>
                <DeleteBtn src="/images/deleteSong.png" onClick={deleteTrack} />
            </Td>
        </Tr>
    );
};
