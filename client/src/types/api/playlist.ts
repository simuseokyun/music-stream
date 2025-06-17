export interface PlaylistListResponse {
    items: Playlist[];
    next: string;
}

export type PlaylistInfoResponse = Playlist;

export type Playlist = {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    owner: { display_name: string };
};
