import { create } from 'zustand';
import { UseCurrentPlaylist, UsePlayer } from '../types/store/store';

const usePlayerStore = create<UsePlayer>((set) => ({
    isPlaying: false,
    title: '',
    artist: '',
    url: '',
    image: '',
    setState: ({ title, artist, url, image }) => {
        set(() => ({
            isPlaying: true,
            title,
            artist,
            url,
            image,
        }));
    },
    setIsPlaying: (state) => set(() => ({ isPlaying: state })),
}));
const useCurrentPlaylistStore = create<UseCurrentPlaylist>((set) => ({
    playlist: [],
    currentIndex: 0,
    source: '',
    setIndex: (num) => set(() => ({ currentIndex: num })),
    setPlaylist: (state) => {
        set(() => ({ playlist: state }));
    },
}));

export { usePlayerStore, useCurrentPlaylistStore };
