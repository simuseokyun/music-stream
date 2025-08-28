export interface Player {
    url: string;
    isPlaying: boolean;
    onNext: () => void;
}

export interface PlayState {
    id: string;
    title: string;
    artist: string;
    image: string;
}
export interface ActionButton {
    isPlaying: boolean;
    onToggle: () => void;
    onNext: () => void;
    onPrev: () => void;
}
