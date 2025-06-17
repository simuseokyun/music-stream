import { ArtistResponse } from './artist';

export interface SearchResultsResponse {
    artists: { items: ArtistResponse[] };
    tracks: {
        items: TrackResponse[];
        next: string;
    };
}

export interface TrackResponse {
    id: string;
    album: {
        images: {
            url: string;
        }[];
        id: string;
        name: string;
        artists: { name: string; id: string }[];
    };
    name: string;
}
