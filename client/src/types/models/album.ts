import { AlbumInfoResponse } from '../api/album';

export interface AlbumTab {
    id: string;
    name: string;
    artistName: string;
    artistId: string;
    image: string;
}
export type Album = Omit<AlbumInfoResponse, 'tracks' | 'copyrights'>;
export enum AlbumType {
    single = '싱글',
    album = '앨범',
}
