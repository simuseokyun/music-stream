import { Album } from '../models/album';
import { Track } from '../models/track';
export interface AlbumListResponse {
    items: Album[];
    next: string;
}
export interface MyAlbumListResponse {
    items: { album: Album }[];
    next: string;
}
export interface NewAlbumListResponse {
    albums: {
        items: Album[];
    };
}
export interface AlbumInfoResponse {
    id: string;
    name: string;
    album_type: string;
    images: { url: string }[];
    artists: { id: string; name: string }[];
    release_date: string;
    total_tracks: number;
    tracks: { items: Track[] };
    copyrights: { text: string }[];
}
