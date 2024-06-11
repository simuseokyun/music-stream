export interface IPopularPlaylists {
    playlists: { items: { id: string; description: string; name: string; images: { url: string }[] }[] };
}
export interface IPopularPlaylist {
    id: string;
    description: string;
    name: string;
    img: string;
}
export interface IPopularPlaylistInfo {
    description: string;
    followers: { total: number };
    id: string;
    images: { url: string }[];
    name: string;
    tracks: {
        total: string;
        items: {
            track: {
                id: string;
                name: string;
                duration_ms: number;
                artists: { name: string; id: string }[];
                uri: string;
                album: { id: string; name: string; images: { url: string }[] };
            };
        }[];
    };
}

export interface IPopularPlaylistInfoProp {
    cover: string;
    title: string;
    duration: number;
    artists: { id: string; name: string }[];
    album_id: string;
    album_title: string;
    uri: string;
}
