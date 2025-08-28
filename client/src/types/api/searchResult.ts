import { ArtistResponse } from './artist';
import { TrackResponse } from './track';
export interface SearchResultsResponse {
    artists: { items: ArtistResponse[] };
    tracks: { items: TrackResponse[]; next: string };
}
