import { create } from 'zustand';
import { UseCurrentPlaylist, UsePlayer } from '../types/store/store';

const usePlayerStore = create<UsePlayer>((set) => ({
    isPlaying: false,
    title: '',
    artist: '',
    url: '',
    image: '',
    setPlayerState: ({ title, artist, url, image }) => {
        set(() => ({
            isPlaying: true,
            title,
            artist,
            url,
            image,
        }));
    },
    setIsPlaying: (isPlaying) => set({ isPlaying }),
}));
const useCurrentPlaylistStore = create<UseCurrentPlaylist>((set) => ({
    playlist: [],
    currentIndex: 0,
    source: '',
    setIndex: (currentIndex) => set(() => ({ currentIndex })),
    setPlaylist: (playlist) => set({ playlist }),
}));

export { usePlayerStore, useCurrentPlaylistStore };
