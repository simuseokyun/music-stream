import { create } from 'zustand';
import { UseLibraryTab, UseSortTab } from '../types/store/store';

const useLibraryTabStore = create<UseLibraryTab>((set) => ({
    active: 'playlist',
    setActive: (active) => set({ active }),
}));

const useSortTabStore = create<UseSortTab>((set) => ({
    active: 'grid',
    setActive: (active) => set({ active }),
}));

export { useLibraryTabStore, useSortTabStore };
