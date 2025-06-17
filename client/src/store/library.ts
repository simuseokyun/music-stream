import { create } from 'zustand';
import { UseLibraryTab, UseGridTab } from '../types/store/store';

const useLibraryTabStore = create<UseLibraryTab>((set) => ({
    active: 'playlist',
    setActive: (state) => set({ active: state }),
}));

const useGridTabStore = create<UseGridTab>((set) => ({
    active: 'grid',
    setActive: (state) => set({ active: state }),
}));

export { useLibraryTabStore, useGridTabStore };
