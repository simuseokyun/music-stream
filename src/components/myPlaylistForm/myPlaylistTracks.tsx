import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { playlistList } from '../../state/atoms';
import { useRecoilState } from 'recoil';
import { durationTransform } from '../../utils/util';
import { IMyPlaylistTracks } from '../../types/myPlaylist';
import { usePlayMusic } from '../../utils/util';
import { Tr, Td, Dot } from '../../styles/common.style';

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

const DeleteBtn = styled.img`
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 25px;
    display: inline-block;
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
    playlist_id,
    uri,
}: IMyPlaylistTracks) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const playMusic = usePlayMusic();
    const deleteTrack = () => {
        setPlaylist((prev) => {
            const index = playlists.findIndex((list) => {
                return list.id === playlist_id;
            });
            const newTracks = [...prev[index].tracks].filter((track) => {
                return track.title !== title;
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
                            {artists.map((artist, index) => (
                                <Artist key={index}>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                    {artists.length == 1 ? null : artists[index + 1] ? <Dot>,</Dot> : null}
                                </Artist>
                            ))}
                        </ArtistsWrap>
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>

            <Td>
                <DeleteBtn src="/images/deleteSong.png" onClick={deleteTrack} />
            </Td>
        </Tr>
    );
};
