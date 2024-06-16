export interface IAlbumInfo {
    id: string;
    name: string;
    album_type: string;
    images: { url: string }[];
    artists: { id: string; name: string }[];
    release_date: string;
    total_tracks: number;
    tracks: IAlbumInfoTracks;
    copyrights: { text: string }[];
}
interface IAlbumInfoTracks {
    items: {
        id: string;
        name: string;
        track_number: number;
        duration_ms: number;
        uri: string;
        artists: { name: string; id: string }[];
    }[];
}

export interface ITrackInfo {
    name: string;
    artists: { id: string; name: string }[];
    track_number: number;
    duration_ms: number;
    cover: string;
    album_title: string;
    album_id: string;
    uri: string;
}
export interface IAlbumFirst {
    cover: string;
    artist: string;
    type: string;
    name: string;
}

export interface IArtistAlbumInfo {
    items: { id: string; name: string; album_type: string; images: { url: string }[]; release_date: string }[];
    next: string;
}
export interface IAllAlbum {
    id: string;
    name: string;
    album_type: string;
    images: { url: string }[];
    release_date: string;
}
export interface ISelectAlbumInfo {
    id: string;
    name: string;
    artist: { id: string; name: string };
    cover: string;
    type: string;
    year: string;
    trackLength: number;
}
