export interface INewAlbums {
    albums: INewAlbumList;
}
interface INewAlbumList {
    items: INewAlbumItem[];
    href: string;
}
interface INewAlbumItem {
    album_type: string;
    artists: { name: string; id: string }[];
    id: string;
    images: { url: string }[];
    name: string;
}

export interface INewAlbumItemProp {
    id: string;
    name: string;
    artist: string;
    cover: string;
}
