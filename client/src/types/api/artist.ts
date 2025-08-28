import { Artist } from '../models/artist';

export interface ArtistResponse {
    id: string;
    name: string;
    images: { url: string }[];
    popularity: number;
    followers: { total: number };
}
export interface MyArtistResponse {
    artists: { items: Artist[] };
}
