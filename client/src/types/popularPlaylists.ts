export interface IPopularPlaylists {
    playlists: { items: { id: string; description: string; name: string; images: { url: string }[] }[] };
}
export interface IPopularPlaylist {
    id: string;
    description: string;
    name: string;
    cover: string;
}
export interface IPopularPlaylistInfo {
    description: string;
    followers: { total: number };
    id: string;
    images: { url: string }[];
    name: string;
    tracks: IPopularPlaylistInfoTracks;
}
interface IPopularPlaylistInfoTracks {
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
}

export interface IPopularPlaylistInfoProp {
    id: string;
    cover: string;
    title: string;
    duration: number;
    artists: { id: string; name: string }[];
    album_id: string;
    album_title: string;
    trackUri: string;
}

export interface IPopularPlaylistListInfo {
    cover: string;
    name: string;
    description: string;
    followers: string;
}

export interface IPopularPlaylistTracks {
    data: {
        track: {
            id: string;
            name: string;
            artists: { id: string; name: string }[];
            album: { name: string; id: string; images: { url: string }[] };
            duration_ms: number;
            uri: string;
        };
    }[];
}
export interface IPopularListCoverProps {
    $loaded?: string;
}
