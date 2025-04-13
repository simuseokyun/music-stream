export interface IMyPlaylistTracks {
    cover: string;
    title: string;
    albumId: string;
    albumTitle: string;
    uri: string;
    artists: {
        id: string;
        name: string;
    }[];
    // duration: number;
    playlistId: string;
}

export interface IMyPlaylist {
    id: string;
    cover: string;
    name: string;
    top: number | undefined;
}

export interface ITrackData {
    track_id: string;
    track_title: string;
    cover: string;
    album_title: string;
    artists: { name: string; id: string }[];
    album_id: string;
    trackUri: string;
}

export interface IPlaylist {
    id: string;
    title: string;
    cover: string;
    tracks: {
        id: string;
        title: string;
        cover: string;
        albumTitle: string;
        albumId: string;
        artists: { name: string; id: string }[];
        uri: string;
    }[];
    top?: number;
}
export interface IMyPlaylistTracksProp {
    tracks: {
        id: string;
        cover: string;
        title: string;
        albumTitle: string;
        artists: { id: string; name: string }[];
        uri: string;
        // duration_ms: number;
        albumId: string;
    }[];
    playlistId: string;
}
