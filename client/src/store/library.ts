import { create } from 'zustand';
import { UseLibraryTab, UseSortTab } from '../types/store/store';

const useLibraryTabStore = create<UseLibraryTab>((set) => ({
    active: 'playlist',
    setActive: (state) => set({ active: state }),
}));

const useSortTabStore = create<UseSortTab>((set) => ({
    active: 'grid',
    setActive: (state) => set({ active: state }),
}));

export { useLibraryTabStore, useSortTabStore };
