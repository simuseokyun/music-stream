import { PlayState } from '../models/player.';

export interface PlaylistTracksResponse {
    items: {
        track: Track;
    }[];
    next: string;
}

export interface ArtistFiveTracksResponse {
    tracks: FiveTrack[];
}
export type Track = {
    id: string;
    name: string;
    album: { images: { url: string }[]; artists: { id: string; name: string }[] };
};
type FiveTrack = {
    id: string;
    name: string;
    duration_ms: number;
    album: { id: string; images: { url: string }[]; name: string };
    artists: { id: string; name: string }[];
    uri: string;
};
export type ArtistTrackItem = {
    track: Pick<FiveTrack, 'id' | 'name' | 'album' | 'artists'>;
    onPlay: ({ id, title, artist, image }: PlayState) => void;
};
