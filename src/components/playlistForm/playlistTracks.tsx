import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deviceInfo, playlistList, nowSongInfo } from '../../atoms';
import Cookies from 'js-cookie';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { msTransform } from '../../util';
import { playSong } from '../../util';

interface IPlaylistTracks {
    cover: string;
    title: string;
    album_id: string;
    album_title: string;
    uri: string;
    i: number;
    artists: {
        id: string;
        name: string;
    }[];
    duration: number;
    playlist_id: string;
}
const TrackList = styled.tr`
    border-radius: 8px;
    &:hover {
        background-color: #2a2929;
        td > span {
            opacity: 1;
        }
    }
    overflow: hidden;
`;
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
const TrackImg = styled.img`
    width: 45px;
    height: 45px;
`;
const ArtistNameWrap = styled.p`
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
const DeleteBtn = styled.span`
    opacity: 0;
`;
const PlayBtn = styled.span``;
export const PlaylistTracks = ({
    cover,
    title,
    album_id,
    artists,
    album_title,
    duration,
    playlist_id,
    uri,
}: IPlaylistTracks) => {
    const [playlist, setPlaylist] = useRecoilState(playlistList);
    const accessToken = Cookies.get('accessToken');
    const [deviceId, setDeviceId] = useRecoilState(deviceInfo);
    const setNowSong = useSetRecoilState(nowSongInfo);
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

    // 노래 클릭 시 재생 함수 호출 예시
    const handleSongClick = async (trackUri: string, title: string, cover: string, artist: string) => {
        try {
            if (!accessToken) {
                alert('로그인이 필요한 서비스입니다');
                return;
            }
            if (deviceId) {
                await playSong(trackUri, deviceId);
                setNowSong((prev) => {
                    return { title, cover, artist, is_playing: true };
                });
            } else {
                alert('웹 플레이어를 생성하기 위해 로그아웃 하겠습니다.');
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.href = '/';
                return;
            }
        } catch (error) {
            console.error('노래를 재생하는 중 에러 발생:', error);
            setNowSong((prev) => {
                return { title: '실행 오류', cover: '', artist: '', is_playing: false };
            });
        }
    };
    return (
        <TrackList>
            <Td>
                <PlayBtn
                    className="material-symbols-outlined"
                    onClick={() => handleSongClick(uri, title, cover, artists[0].name)}
                >
                    play_arrow
                </PlayBtn>
            </Td>
            <Td>
                <TdWrap>
                    <TrackImg src={cover} alt="album_cover" />
                    <TitleWrap>
                        <Title>{title}</Title>
                        <ArtistsWrap>
                            {artists.map((artist, i) => (
                                <ArtistNameWrap>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}</Link>
                                    {artists.length == 1 ? undefined : artists[i + 1] ? ',' : undefined}
                                </ArtistNameWrap>
                            ))}
                        </ArtistsWrap>
                    </TitleWrap>
                </TdWrap>
            </Td>
            <Td>
                <Link to={`/home/album/${album_id}`}>{album_title}</Link>
            </Td>
            <Td>{`${msTransform(duration).minutes}:${
                String(msTransform(duration).seconds).length === 1
                    ? `0${msTransform(duration).seconds}`
                    : msTransform(duration).seconds
            }`}</Td>
            <Td>
                <DeleteBtn onClick={deleteTrack} className="material-symbols-outlined">
                    do_not_disturb_on
                </DeleteBtn>
            </Td>
        </TrackList>
    );
};
