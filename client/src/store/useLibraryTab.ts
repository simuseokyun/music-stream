import { create } from 'zustand';

interface IUseLibraryTab {
    active: 'playlist' | 'album';
    setActive: (state: 'playlist' | 'album') => void;
}
interface IUseGridTab {
    active: 'grid' | 'flex';
    setActive: (state: 'grid' | 'flex') => void;
}

const useLibraryTab = create<IUseLibraryTab>((set) => ({
    active: 'playlist',
    setActive: (state) => set({ active: state }),
}));

const useGridTab = create<IUseGridTab>((set) => ({
    active: 'grid',
    setActive: (state) => set({ active: state }),
}));

export { useLibraryTab, useGridTab };
