export interface PlaylistTracksResponse {
    items: { track: TrackResponse }[];
    next: string;
}

export interface FiveTracksResponse {
    tracks: TrackResponse[];
}
export interface TrackResponse {
    id: string;
    name: string;
    album: { id: string; name: string; images: { url: string }[]; artists: { id: string; name: string }[] };
    is_local: boolean;
    duration_ms: number;
}
