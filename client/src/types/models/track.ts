import { TrackResponse } from '../api/track';
import { PlayState } from './player.';

export interface TrackItem {
    track: TrackResponse;
    onPlay: ({ id }: { id: PlayState['id'] }) => void;
}
export interface AlbumTrackItem {
    track: { id: string; name: string; artists: { name: string; id: string }[]; track_number?: number };
    image: string;
    onPlay: ({ id }: { id: PlayState['id'] }) => void;
}

export interface PlaylistTrackItem extends TrackItem {
    playlistId: string;
}
export interface Track {
    id: string;
    name: string;
    uri: string;
    artists: { name: string; id: string }[];
}
