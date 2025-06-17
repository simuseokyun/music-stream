import { create } from 'zustand';
import { UsePlayer } from '../types/store/store';

const usePlayerStore = create<UsePlayer>((set) => ({
    isPlaying: false,
    title: '',
    artist: '',
    url: '',
    image: '',
    setState: (state) => {
        set(() => ({
            isPlaying: true,
            title: state.title,
            artist: state.artist,
            url: state.url,
            image: state.image,
        }));
    },
    setIsPlaying: (state) => set(() => ({ isPlaying: state })),
}));
export default usePlayerStore;
