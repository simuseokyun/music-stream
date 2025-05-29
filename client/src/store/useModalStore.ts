import { create } from 'zustand';

type ModalType = 'addPlaylist' | 'selectPlaylist' | null;

interface ModalState {
    type: ModalType;
    open: (type: ModalType) => void;
    close: () => void;
}

const useModalStore = create<ModalState>((set) => ({
    type: null,
    open: (type) => set({ type }),
    close: () => set({ type: null }),
}));

export default useModalStore;
