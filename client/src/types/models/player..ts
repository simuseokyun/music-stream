export interface Player {
    url: string;
    isPlaying: boolean;
    onPause: () => void;
    onNext: () => void;
}

export interface TrackToPlay {
    id: string;
    title: string;
    artist: string;
    image: string;
}
export type PlayState = {
    id: string;
    title: string;
    artist: string;
    image: string;
};
