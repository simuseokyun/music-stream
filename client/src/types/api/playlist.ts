import { Playlist } from '../models/playlist';

export interface PlaylistListResponse {
    items: Playlist[];
    next: string;
}
