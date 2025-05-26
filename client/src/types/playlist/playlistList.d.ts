export interface PlaylistList {
    items: {
        id: string;
        name: string;
        description: string;
        images: { url: string }[];
        owner: { display_name: string };
    }[];
    next: string;
}
