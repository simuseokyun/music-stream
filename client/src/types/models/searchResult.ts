import { PlayState } from './player.';
import { TrackResponse } from '../api/searchResult';
import { ArtistResponse } from '../api/artist';
export interface SearchResultTrack {
    track: TrackResponse;
    onPlay: ({ id, title, artist, image }: PlayState) => void;
}

export interface SearchArtist {
    artist?: ArtistResponse;
    isLoading: boolean;
    isError: boolean;
}
