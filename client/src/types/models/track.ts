import { Track } from '../api/track';
import { PlayState } from './player.';

export type AlbumTrack = {
    track: { id: string; name: string; artists: { name: string; id: string }[] };
    image: string;
    onPlay: ({ id, title, artist, image }: PlayState) => void;
};

export type MyPlaylistTrack = {
    track: Track;
    playlistId: string;
    onPlay: ({ id, title, artist, image }: PlayState) => void;
};
