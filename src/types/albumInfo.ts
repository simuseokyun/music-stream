export interface IAlbumInfo {
    id: string;
    name: string;
    album_type: string;
    images: { url: string }[];
    artists: { id: string; name: string }[];
    release_date: string;
    total_tracks: number;
    tracks: {
        items: {
            id: string;
            name: string;
            track_number: number;
            duration_ms: number;
            uri: string;
            artists: { name: string; id: string }[];
        }[];
    };
    copyrights: { text: string }[];
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
