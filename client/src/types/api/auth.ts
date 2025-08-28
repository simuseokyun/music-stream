import { AlbumInfoResponse, AlbumListResponse, NewAlbumListResponse } from './album';
import { FiveTracksResponse } from './track';
import { ArtistResponse } from './artist';
import { SearchResultsResponse } from './searchResult';
import {} from './album';
export interface WebToken {
    access_token: string;
    expires_in: string;
}
export interface SdkToken extends WebToken {
    refresh_token: string;
}

export type ApiResponse =
    | AlbumInfoResponse
    | FiveTracksResponse
    | AlbumListResponse
    | ArtistResponse
    | NewAlbumListResponse
    | SearchResultsResponse;
