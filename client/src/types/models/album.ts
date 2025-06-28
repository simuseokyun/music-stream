import { Album } from '../api/album';
export interface NewAlbumItem {
    id: string;
    name: string;
    artist: string;
    cover: string;
}

export interface ArtistAlbumItem {
    album: Album;
}

export interface AlbumTab {
    id: string;
    name: string;
    artist_name: string;
    artist_id: string;
    image: string;
}
export enum AlbumType {
    single = '싱글',
    album = '앨범',
}
