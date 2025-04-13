export interface ISearchTracks {
    tracks: {
        items: ISearchTrack[];
        next: string;
    };
}
interface ISearchTrack {
    id: string;
    album: ISearchTrackAlbums;
    duration_ms: number;
    uri: string;
    name: string;
}
interface ISearchTrackAlbums {
    images: {
        url: string;
    }[];
    id: string;
    name: string;
    artists: { name: string; id: string }[];
}
export interface ISearchTrackProp {
    id: string;
    cover: string;
    title: string;
    artists: { name: string; id: string }[];
    album_id: string;
    album_title: string;
    duration_ms: number;
    trackUri: string;
}
