import { create } from 'zustand';

interface ITrack {
    trackId: string;
    trackName: string;
    trackArtist: string;
    trackImage: string;
}

interface IState extends ITrack {
    open: boolean;
    setOpen: (state: boolean) => void;
    setTrack: (track: ITrack) => void;
}

const useCategoryState = create<IState>((set) => ({
    trackId: '',
    trackName: '',
    trackArtist: '',
    trackImage: '/assets/playlist.svg',
    open: false,
    setOpen: (state) => set({ open: state }),
    setTrack: (track) => set({ ...track }),
}));

export default useCategoryState;
