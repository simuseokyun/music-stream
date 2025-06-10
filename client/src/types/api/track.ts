export interface PlaylistTracksResponse {
    items: {
        track: {
            id: string;
            name: string;
            album: { images: { url: string }[]; artists: { id: string; name: string }[] };
        };
    }[];
    next: string;
}

export interface ArtistFiveTracksResponse {
    tracks: {
        id: string;
        name: string;
        duration_ms: number;
        album: { id: string; images: { url: string }[]; name: string };
        artists: { id: string; name: string }[];
        uri: string;
    }[];
}
