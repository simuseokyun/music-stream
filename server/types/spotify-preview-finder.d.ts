declare module 'spotify-preview-finder' {
    interface TrackResult {
        name: string;
        spotifyUrl: string;
        previewUrls: string[];
    }

    interface SearchResult {
        success: boolean;
        error?: string;
        results: TrackResult[];
    }

    const searchAndGetLinks: (trackName: string, limit?: number) => Promise<SearchResult>;

    export default searchAndGetLinks;
}
