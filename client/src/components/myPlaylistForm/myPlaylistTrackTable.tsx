import { Thead, Tbody, Tr, Th } from '../../styles/common.style';
import { PlaylistTracks } from './myPlaylistTracks';
import { IMyPlaylistTracksProp } from '../../types/myPlaylist';

export const MyPlaylistTrackTable = ({ tracks, playlistId }: IMyPlaylistTracksProp) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>앨범</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tracks?.map((track) => (
                    <PlaylistTracks
                        playlistId={playlistId}
                        key={track.id}
                        cover={track.cover}
                        title={track.title}
                        artists={track.artists}
                        albumId={track.albumId}
                        albumTitle={track.albumTitle}
                        // duration={track.duration_ms}
                        uri={track.uri}
                    />
                ))}
            </tbody>
        </table>
    );
};
