import { create } from 'zustand';

interface State {
    name: string;
    previewUrls: string[];
}
interface PlayerState {
    isPlaying: boolean;
    songUrl: string;
    songName: string;
    image: string;
    singer: string;
    setState: (state: State[], image: string) => void;
    setIsPlaying: (state: boolean) => void;
}
const usePlayerState = create<PlayerState>((set) => ({
    isPlaying: false,
    songUrl: '',
    songName: '',
    image: '',
    singer: '',
    setState: (state, image) => {
        const [songName, singer] = state[0].name.split('-');
        set(() => ({
            isPlaying: true,
            songUrl: state[0].previewUrls[0],
            image: image,
            songName: songName.trimEnd(),
            singer: singer.trimStart(),
        }));
    },

    setIsPlaying: (state) => set(() => ({ isPlaying: state })),
}));

export default usePlayerState;
