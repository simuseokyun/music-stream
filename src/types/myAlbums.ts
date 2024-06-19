export interface IMyAlbum {
    id: string;
    name: string;
    cover: string;
    artist: string;
}

export interface IMyAlbumList {
    cover: string;
    name: string;
    artist: string;
    onClick: () => void;
}
