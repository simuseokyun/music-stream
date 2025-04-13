export interface IArtistInfo {
    images: { url: string }[];
    id: string;
    name: string;
    popularity: number;
    followers: { total: number };
}
export interface IArtistAlbums {
    items: { id: string; name: string; album_type: string; images: { url: string }[]; release_date: string }[];
    next: string;
    offset: number;
}
export interface IArtistTopTracks {
    tracks: {
        id: string;
        name: string;
        duration_ms: number;
        album: { id: string; images: { url: string }[]; name: string };
        artists: { id: string; name: string }[];
        uri: string;
    }[];
}
export interface IArtistsTopTrack {
    id: string;
    cover: string;
    title: string;
    artists: { id: string; name: string }[];
    albumId: string;
    albumTitle: string;

    trackUri: string;
}

export interface IArtistAlbum {
    id: string;
    name: string;
    cover: string;
    type: string;
    year: string;
}
