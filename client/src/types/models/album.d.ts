export enum typeTransform {
    single = '싱글',
    album = '앨범',
}

export interface ArtistAlbumList {
    id: string;
    name: string;
    cover: string;
    type: string;
    year: string;
}
