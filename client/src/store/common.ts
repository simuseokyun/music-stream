import { create } from 'zustand';
import { UseViewport, UseCategory, UseModal, UsePlayerKey } from '../types/store/store';

const useViewportStore = create<UseViewport>((set) => ({
    isMobile: false,
    setIsMobile: (isMobile) => set({ isMobile }),
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

const usePlayerKey = create<UsePlayerKey>((set) => ({
    key: 0,
    setKey: (value) => set({ key: value }),
}));

export { useCategoryStore, useViewportStore, useModalStore, usePlayerKey };
