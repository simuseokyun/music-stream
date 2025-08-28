export interface PlaylistItem {
    playlist: Playlist;
    sortState: 'flex' | 'grid';
}
export interface Playlist {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    owner: { display_name: string };
    tracks: { total: number };
}

export interface AddPlaylistForm {
    name: string;
    description: string;
    user: string;
}
