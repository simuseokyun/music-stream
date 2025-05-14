import { create } from 'zustand';

interface IUseAddPlaylistModal {
    open: boolean;
    setState: (state: boolean) => void;
}

const useAddPlaylistModal = create<IUseAddPlaylistModal>((set) => ({
    open: false,
    setState: (state) => set(() => ({ open: state })),
}));

export default useAddPlaylistModal;
