export interface PlaylistItem {
    playlist: Playlist;
    sortState: 'flex' | 'grid';
}

export interface AddPlaylistForm {
    name: string;
    description: string;
    // user: string;
}

type Playlist = {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
};
