export interface TrackProps {
    id: string;
    image: string;
    title: string;
    artists: { name: string; id: string }[];
    album_id: string;
    album_title: string;
    duration_ms: number;
    onPlay: ({ id, title, artist, image }: PlayState) => void;
}

type FiveTrackItem = Omit<TrackProps, 'album_id' | 'album_title' | 'duration_ms'>;
