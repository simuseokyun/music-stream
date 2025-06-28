export interface AlbumListResponse {
    items: Album[];
    next: string;
}
export interface MyAlbumListResponse {
    items: { album: Album; added_at: string }[];
    next: string;
}
export interface AlbumDataResponse {
    id: string;
    name: string;
    album_type: string;
    images: { url: string }[];
    artists: { id: string; name: string }[];
    release_date: string;
    total_tracks: number;
    tracks: Tracks;
    copyrights: { text: string }[];
}

export interface NewAlbumListResponse {
    albums: {
        items: AlbumItem[];
        href: string;
    };
}
export interface MyAlbumItem {
    album: Album;
}
export type AlbumItem = Pick<AlbumDataResponse, 'id' | 'name' | 'album_type' | 'images' | 'artists'>;

type Tracks = {
    items: Track[];
};
type Track = {
    id: string;
    name: string;
    track_number: number;
    duration_ms: number;
    uri: string;
    artists: { name: string; id: string }[];
};
export type Album = {
    id: string;
    name: string;
    album_type: string;
    images: { url: string }[];
    release_date: string;
    artists: { id: string; name: string }[];
};
