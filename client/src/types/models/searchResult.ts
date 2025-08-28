import { ArtistResponse } from '../api/artist';

export interface SearchArtist {
    artist?: ArtistResponse;
    isLoading: boolean;
    isError: boolean;
}
