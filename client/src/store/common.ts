import { create } from 'zustand';
import { UseViewport, UseCategory, UseModal } from '../types/store/store';

const useViewportStore = create<UseViewport>((set) => ({
    isMobile: false,
    setIsMobile: (state) => {
        set(() => ({
            isMobile: state,
        }));
    },
}));

const useCategoryStore = create<UseCategory>((set) => ({
    trackId: '',
    trackTitle: '',
    trackImage: '/assets/playlist.svg',
    artistId: '',
    artistName: '',
    setTrack: (track) => set({ ...track }),
}));

const useModalStore = create<UseModal>((set) => ({
    type: null,
    open: (type) => set({ type }),
    close: () => set({ type: null }),
}));

export { useCategoryStore, useViewportStore, useModalStore };
