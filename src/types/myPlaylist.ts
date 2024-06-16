export interface IMyPlaylistTracks {
    cover: string;
    title: string;
    album_id: string;
    album_title: string;
    uri: string;
    artists: {
        id: string;
        name: string;
    }[];
    duration: number;
    playlist_id: string;
}

export interface IMyPlaylist {
    id: string;
    cover: string;
    name: string;
    top: number | undefined;
}

export interface IAddTrack {
    id: string;
    name: string;
    duration_ms: number;
    cover: string;
    album_title: string;
    artists: { name: string; id: string }[];
    album_id: string;
    uri: string;
}

export interface IPlaylist {
    id: string;
    title: string;
    cover: string;
    tracks: {
        id: string;
        title: string;
        duration_ms: number;
        cover: string;
        album_title: string;
        album_id: string;
        artists: { name: string; id: string }[];
        uri: string;
    }[];
    top?: number;
}
