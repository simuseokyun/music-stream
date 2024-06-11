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
