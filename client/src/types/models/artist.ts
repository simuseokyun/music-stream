import { ArtistResponse } from '../api/artist';
export type Artist = Pick<ArtistResponse, 'id' | 'name' | 'images'>;
