export interface ArtistResponse {
    images: { url: string }[];
    id: string;
    name: string;
    popularity: number;
    followers: { total: number };
}
